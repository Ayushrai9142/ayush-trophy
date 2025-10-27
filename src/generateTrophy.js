export function generateSVG({ username, followers, public_repos, public_gists }) {
  const level =
    followers >= 1000 || public_repos >= 500 ? "Legend" :
    followers >= 200 || public_repos >= 150 ? "Pro" :
    followers >= 50 || public_repos >= 30 ? "Expert" :
    followers >= 10 || public_repos >= 5 ? "Contributor" :
    "Rising";

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="420" height="120">
  <rect rx="8" width="100%" height="100%" fill="#272822"/>
  <g transform="translate(12,12)">
    <rect x="0" y="0" width="396" height="96" rx="6" fill="#1e1e1e" opacity="0.9"/>
    <text x="20" y="26" font-family="Verdana" font-size="18" fill="#f92672" font-weight="700">${username}'s Trophy</text>
    <text x="20" y="48" font-family="Verdana" font-size="12" fill="#cfcfcf">Level: ${level}</text>
    <text x="20" y="64" font-family="Verdana" font-size="12" fill="#cfcfcf">
      Followers: ${followers}   Public Repos: ${public_repos}   Public Gists: ${public_gists}
    </text>
  </g>
</svg>`;
}
