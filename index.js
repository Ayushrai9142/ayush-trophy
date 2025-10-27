import fs from "fs";
import { getGitHubData } from "./src/fetchData.js";
import { generateSVG } from "./src/generateTrophy.js";

async function main() {
  try {
    const data = await getGitHubData("ayushrai9142");
    const svg = generateSVG(data);
    fs.writeFileSync("trophy.svg", svg);
    console.log("✅ Trophy generated: trophy.svg");
  } catch (err) {
    console.error("❌ Error:", err.message);
  }
}

main();
