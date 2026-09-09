import { mkdir, writeFile } from "node:fs/promises";
const images = {
  hero: "photo-1613490493576-7fde63acd811",
  villa: "photo-1613977257363-707ba9348227",
  interior: "photo-1600210492486-724fe5c67fb0",
  apartment: "photo-1600607687920-4e2a09cf159d",
  pool: "photo-1576013551627-0cc20b96c2a7",
  home: "photo-1600596542815-ffad4c1539a9",
};
await mkdir(new URL("../public/images/", import.meta.url), { recursive: true });
for (const [name, id] of Object.entries(images)) {
  const response = await fetch(
    `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${name === "hero" ? 2200 : 1400}&q=85`,
    { signal: AbortSignal.timeout(60000) },
  );
  if (!response.ok) throw new Error(`Image ${name}: ${response.status}`);
  await writeFile(
    new URL(`../public/images/${name}.jpg`, import.meta.url),
    Buffer.from(await response.arrayBuffer()),
  );
  console.log(`Imagen preparada: ${name}`);
}
