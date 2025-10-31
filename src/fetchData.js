import fetch from "node-fetch";
import fs from "fs";

const username = "ayushraistudio"; // <-- apna GitHub username yahan likh

export async function fetchGitHubData() {
  const headers = { Authorization: `token ${process.env.GH_TOKEN}` };

  // 🧠 User data fetch
  const userRes = await fetch(`https://api.github.com/users/${username}`, { headers });
  const user = await userRes.json();

  // 🧠 All repos fetch
  const repoRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`, { headers });
  const repos = await repoRes.json();

  // 🔢 Total commits (lifetime)
  let totalCommits = 0;
  for (const repo of repos) {
    const commitRes = await fetch(
      `https://api.github.com/repos/${username}/${repo.name}/commits?per_page=1`,
      { headers }
    );
    if (commitRes.ok) {
      const commits = commitRes.headers.get("link");
      if (commits && commits.includes("page=")) {
        const match = commits.match(/page=(\d+)>; rel="last"/);
        if (match) totalCommits += parseInt(match[1]);
      }
    }
  }

  // 📊 Save result
  const data = {
    public_repos: user.public_repos || 0,
    total_contributions: totalCommits,
    active_days: Math.floor(totalCommits / 2), // estimated
  };

  fs.writeFileSync("data.json", JSON.stringify(data, null, 2));
  console.log("✅ GitHub data updated!");
}

fetchGitHubData();
