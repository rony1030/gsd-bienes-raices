import { spawn } from "node:child_process";
const cli = process.argv[2];
if (!cli)
  throw new Error("Pass the installed Vercel CLI entrypoint as argument.");
const variables = {
  DATABASE_URL: process.env.DATABASE_URL,
  CRM_API_KEY: process.env.CRM_API_KEY,
  NEXT_PUBLIC_MAIN_SITE_URL: process.env.NEXT_PUBLIC_MAIN_SITE_URL,
  DEMO_MODE: "false",
};
for (const [name, value] of Object.entries(variables)) {
  if (!value) throw new Error(`Missing ${name}`);
  const secret = name === "DATABASE_URL" || name === "CRM_API_KEY";
  await new Promise((resolve, reject) => {
    const child = spawn(
      process.execPath,
      [
        cli,
        "env",
        "add",
        name,
        "production,preview",
        "--yes",
        "--force",
        secret ? "--sensitive" : "--no-sensitive",
      ],
      { stdio: ["pipe", "pipe", "pipe"], windowsHide: true },
    );
    let output = "";
    child.stdout.on("data", (d) => (output += d));
    child.stderr.on("data", (d) => (output += d));
    child.on("error", reject);
    child.on("close", (code) =>
      code === 0
        ? resolve()
        : reject(
            new Error(`${name}: ${output.replaceAll(value, "[REDACTED]")}`),
          ),
    );
    child.stdin.end(value);
  });
  console.log(`Configurada: ${name}`);
}
