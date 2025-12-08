/**
 * Auto-convert Strapi config/*.ts to config/*.js for programmatic boot (seed.js)
 * Works for Strapi v5 — converts TS export default → module.exports = {}
 */

import fs from "fs";
import path from "path";

const configDir = path.join(process.cwd(), "config");

console.log("🔄 Strapi Config Auto-Converter Started…");

const files = fs.readdirSync(configDir);

files.forEach((file) => {
  if (!file.endsWith(".ts")) return;

  const tsPath = path.join(configDir, file);
  const jsPath = tsPath.replace(".ts", ".js");

  console.log(`⚙️  Converting ${file} → ${path.basename(jsPath)}`);

  let content = fs.readFileSync(tsPath, "utf-8");

  // ---- Transformations ----

  // Replace default export
  content = content.replace(/export default/g, "module.exports =");

  // Remove TypeScript type annotations like : string, : number
  content = content.replace(/:\s*[A-Za-z0-9_\[\]\|<>]+/g, "");

  // Remove interface definitions completely
  content = content.replace(/interface\s+[A-Za-z0-9_]+\s*{[^}]+}/g, "");

  // Remove TS generics <> blocks
  content = content.replace(/<[^>]+>/g, "");

  // Replace env type calls env.int → env("INT")
  content = content.replace(/env\.int\(/g, "env(");

  // Replace env.bool → env(
  content = content.replace(/env\.bool\(/g, "env(");

  // Remove trailing commas after transformation errors
  content = content.replace(/,\s*}/g, "}");

  // ---- Write JS file ----
  fs.writeFileSync(jsPath, content, "utf-8");

  console.log(`✅ Created ${path.basename(jsPath)}`);
});

console.log("🎉 Conversion completed!");
