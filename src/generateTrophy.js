import fs from "fs";

const data = JSON.parse(fs.readFileSync("data.json", "utf-8"));

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="480" height="160">
  <rect rx="10" width="100%" height="100%" fill="#272822"/>
  
  <text x="50%" y="35" text-anchor="middle" font-family="Verdana" font-size="22" fill="#f92672" font-weight="700">
    🏆 AR Trophy 🏆
  </text>

  <g transform="translate(40,60)">
    <rect x="0" y="0" width="120" height="80" rx="8" fill="#1e1e1e" stroke="#f92672" stroke-width="2"/>
    <text x="60" y="30" text-anchor="middle" font-family="Verdana" font-size="14" fill="#e6db74">Active Days</text>
    <text x="60" y="55" text-anchor="middle" font-family="Verdana" font-size="16" fill="#a6e22e">${data.active_days}</text>

    <rect x="140" y="0" width="120" height="80" rx="8" fill="#1e1e1e" stroke="#66d9ef" stroke-width="2"/>
    <text x="200" y="30" text-anchor="middle" font-family="Verdana" font-size="14" fill="#e6db74">Public Repos</text>
    <text x="200" y="55" text-anchor="middle" font-family="Verdana" font-size="16" fill="#a6e22e">${data.public_repos}</text>

    <rect x="280" y="0" width="120" height="80" rx="8" fill="#1e1e1e" stroke="#fd971f" stroke-width="2"/>
    <text x="340" y="30" text-anchor="middle" font-family="Verdana" font-size="14" fill="#e6db74">Contributions</text>
    <text x="340" y="55" text-anchor="middle" font-family="Verdana" font-size="16" fill="#a6e22e">${data.total_contributions}</text>
  </g>
</svg>`;

fs.writeFileSync("trophy.svg", svg);
console.log("🏆 Trophy SVG updated successfully!");
