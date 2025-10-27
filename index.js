// index.js
import fs from "fs";
import { getGitHubData } from "./src/fetchData.js";
import { generateSVG } from "./src/generateTrophy.js";

async function main() {
  try {
    const data = await getGitHubData("ayushrai9142");
    const svg = generateSVG(data);
    fs.writeFileSync("trophy.svg", svg);
    console.log("✅ trophy.svg written");
  } catch (err) {
    console.error("❌ Error:", err.message);
    // write minimal error svg so README shows something
    const errSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="80"><rect width="100%" height="100%" fill="#222"/><text x="10" y="40" fill="#fff">Error: ${String(err.message).slice(0,120)}</text></svg>`;
    fs.writeFileSync("trophy.svg", errSvg);
  }
}

main();
