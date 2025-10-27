import fetch from "node-fetch";

export async function getGitHubData(username) {
  if (username !== "ayushrai9142") throw new Error("Unauthorized");

  const url = `https://api.github.com/users/${username}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("GitHub API error: " + res.status);
  const data = await res.json();

  return {
    username: data.login,
    followers: data.followers,
    public_repos: data.public_repos,
    public_gists: data.public_gists,
  };
}
