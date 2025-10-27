// src/fetchData.js
import fetch from "node-fetch";

const GH_API = "https://api.github.com";

function delay(ms){ return new Promise(r=>setTimeout(r, ms)); }

export async function getGitHubData(username) {
  if (username.toLowerCase() !== "ayushrai9142") {
    throw new Error("Unauthorized: only ayushrai9142 allowed");
  }

  const token = process.env.PERSONAL_TOKEN || ""; // optional to reduce rate-limit
  const headers = { "User-Agent": "github-trophy", Accept: "application/vnd.github.v3+json" };
  if (token) headers.Authorization = `token ${token}`;

  // 1) basic user
  const userRes = await fetch(`${GH_API}/users/${username}`, { headers });
  if (!userRes.ok) throw new Error("GitHub API error (user): " + userRes.status);
  const user = await userRes.json();

  // 2) repos (paginated) — fetch up to 300 repos (3 pages of 100)
  let page = 1;
  let repos = [];
  while (page <= 3) {
    const r = await fetch(`${GH_API}/users/${username}/repos?per_page=100&page=${page}`, { headers });
    if (!r.ok) break;
    const chunk = await r.json();
    if (!chunk || chunk.length === 0) break;
    repos = repos.concat(chunk);
    if (chunk.length < 100) break;
    page++;
    // small delay to be nice
    await delay(200);
  }

  // aggregate stars and repo counts and issues
  const public_repos = user.public_repos || repos.length;
  const followers = user.followers || 0;
  const public_gists = user.public_gists || 0;

  let stars = 0;
  let open_issues_total = 0;
  for (const rp of repos) {
    stars += rp.stargazers_count || 0;
    open_issues_total += rp.open_issues_count || 0;
  }

  // 3) recent public events (to estimate commits and PR activity)
  // We'll scan up to first 100 events and count PushEvent commits & PullRequestEvent
  const eventsRes = await fetch(`${GH_API}/users/${username}/events/public?per_page=100`, { headers });
  let recentEvents = [];
  if (eventsRes.ok) recentEvents = await eventsRes.json();

  let commitCountRecent = 0;
  let prEvents = 0;
  for (const ev of recentEvents) {
    if (ev.type === "PushEvent" && Array.isArray(ev.payload.commits)) {
      commitCountRecent += ev.payload.commits.length;
    }
    if (ev.type === "PullRequestEvent") prEvents += 1;
  }

  // Provide the returned object (these fields used by generator)
  return {
    username,
    followers,
    public_repos,
    public_gists,
    total_stars: stars,
    total_open_issues: open_issues_total,
    recent_commits: commitCountRecent,
    recent_prs: prEvents,
    fetched_at: new Date().toISOString()
  };
}
