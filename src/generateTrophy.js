// src/generateTrophy.js
function esc(s){ return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[c])); }

export function generateSVG(data) {
  // data fields used:
  // followers, public_repos, total_stars, total_open_issues, recent_commits, recent_prs
  const cards = [
    { title: "Stars", subtitle: "Stargazer", value: `${data.total_stars}pt` },
    { title: "Commit", subtitle: "Ultra Committer", value: `${data.recent_commits}pt` },
    { title: "Followers", subtitle: "Dynamic User", value: `${data.followers}pt` },
    { title: "Issues", subtitle: "High Issuer", value: `${data.total_open_issues}pt` },
    { title: "Repositories", subtitle: "Middle Repo Creator", value: `${data.public_repos}pt` },
    { title: "PullRequest", subtitle: "First PR", value: `${data.recent_prs}pt` }
  ];

  const cardW = 200;
  const gap = 12;
  const width = cards.length * (cardW + gap) + 20;
  const height = 160;

  const bg = "#2b2e31"; // dark panel bg similar to image
  const cardBg = "#2a2d30";
  const accent = "#f0c674";
  const textMain = "#f6f6f6";
  const subtitleColor = "#e07b7b";

  const cardsSVG = cards.map((c, i) => {
    const x = 10 + i * (cardW + gap);
    return `
      <g transform="translate(${x},10)">
        <rect width="${cardW}" height="140" rx="8" fill="${cardBg}" stroke="#cfcfcf22" stroke-width="2"/>
        <text x="${cardW/2}" y="30" text-anchor="middle" font-family="Verdana" font-size="18" fill="${accent}" font-weight="700">${esc(c.title)}</text>
        <!-- trophy circle/icon -->
        <g transform="translate(${cardW/2 - 36},40)">
          <rect x="0" y="0" width="72" height="72" rx="8" fill="#ffffff88" />
          <text x="36" y="46" text-anchor="middle" font-family="Verdana" font-size="28" fill="#2b2e31" font-weight="700">${esc(c.title[0]||"A")}</text>
        </g>
        <text x="${cardW/2}" y="128" text-anchor="middle" font-family="Verdana" font-size="14" fill="${subtitleColor}" font-weight="700">${esc(c.subtitle)}</text>
        <text x="${cardW/2}" y="148" text-anchor="middle" font-family="Verdana" font-size="12" fill="#bdbdbd">${esc(c.value)}</text>
        <!-- progress bar -->
        <rect x="12" y="110" width="${cardW-24}" height="6" rx="3" fill="#6b5b4a" />
        <rect x="12" y="110" width="${Math.max(8, (cardW-24) * 0.25)}" height="6" rx="3" fill="#e7b77c" />
      </g>
    `;
  }).join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <rect width="100%" height="100%" fill="${bg}" rx="10"/>
  ${cardsSVG}
  <!-- footer small text -->
  <text x="${width-12}" y="${height-6}" text-anchor="end" font-family="Verdana" font-size="10" fill="#999">${esc(data.fetched_at)}</text>
</svg>`;
}
