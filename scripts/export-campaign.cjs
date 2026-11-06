// Re-export the approved AI photographs; never enlarge source pixels.
const sharp = require("sharp");
const fs = require("node:fs/promises");
const path = require("node:path");
const source = process.env.CAMPAIGN_SOURCE_DIR || "/workspace/generated_images";
const output = path.join(__dirname, "../public/images/campaign");
const sheets = [
  [
    "exec-b91551ed-70ea-4d2c-8a31-5e664efa5740.png",
    ["problem-camera", "problem-battery", "problem-screen", "problem-charging"],
  ],
  [
    "exec-bbcae70b-d10e-433a-bb5a-29e59008afff.png",
    [
      "problem-speaker",
      "problem-microphone",
      "problem-buttons",
      "problem-system",
    ],
  ],
  [
    "exec-adecfbbc-aa05-40b2-a53f-7ca3eb6f7a0d.png",
    [
      "component-board",
      "component-processor",
      "component-battery",
      "component-cameras",
    ],
  ],
  [
    "exec-53e56f59-740a-432c-b052-175131b3461c.png",
    [
      "component-display",
      "component-charging",
      "component-speakers",
      "component-sensors",
    ],
  ],
  [
    "exec-0e017d83-8669-45c5-8476-644222bd6304.png",
    ["service-screen", "service-battery", "service-charging", "service-camera"],
  ],
  [
    "exec-f80d6a4f-507a-4de3-9438-fee7d3c6ce4b.png",
    ["service-audio", "service-system", "problem-other", "contact"],
  ],
  [
    "exec-47919cff-0b7f-40f7-9e5f-f6e72efd4596.png",
    ["editorial", null, "comparison-before", "comparison-after"],
  ],
];
(async () => {
  await fs.mkdir(output, { recursive: true });
  for (const [file, names] of sheets) {
    const input = path.join(source, file),
      meta = await sharp(input).metadata();
    for (let i = 0; i < names.length; i++) {
      if (!names[i]) continue;
      const left = Math.round(((i % 2) * meta.width) / 2) + 4,
        top = Math.round((Math.floor(i / 2) * meta.height) / 2) + 4;
      const width = Math.floor(meta.width / 2) - 8,
        height = Math.floor(meta.height / 2) - 8;
      for (const size of [300, 600])
        await sharp(input)
          .extract({ left, top, width, height })
          .resize(size, size, {
            fit: "contain",
            background: "#11151c",
            withoutEnlargement: true,
          })
          .webp({ quality: 93, effort: 6 })
          .toFile(
            path.join(output, `${names[i]}${size === 300 ? "-300" : ""}.webp`),
          );
    }
  }
  for (const [name, file, sizes] of [
    [
      "hero-desktop",
      "exec-bbb49682-d884-4f49-8f45-bf499730765e.png",
      [960, 1536],
    ],
    [
      "hero-mobile",
      "exec-2ec0b008-eaf2-486d-851f-481e6605a03d.png",
      [640, 1024],
    ],
  ])
    for (const width of sizes)
      await sharp(path.join(source, file))
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: 93, effort: 6 })
        .toFile(path.join(output, `${name}-${width}.webp`));
  console.log("Exported 29 approved scenes to 58 responsive WebP files.");
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
