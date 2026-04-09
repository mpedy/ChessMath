import { app } from "./app.js";
import fs from "fs";
import path from "path";

async function run() {
    const outDir = process.env.EXPORT_PATH_OUTDIR || "static/dist/pages";
    if (fs.existsSync(outDir)) {
        fs.rmSync(outDir, { recursive: true });
    }
    fs.mkdirSync(outDir, { recursive: true });

    const pagesByPath = app.listAllPages();

    fs.writeFileSync(path.join(outDir, "pages_1_elementari.json"), JSON.stringify(pagesByPath.elem, null, 2));
    fs.writeFileSync(path.join(outDir, "pages_2_medie.json"), JSON.stringify(pagesByPath.med, null, 2));
    fs.writeFileSync(path.join(outDir, "pages_3_liceo.json"), JSON.stringify(pagesByPath.lic, null, 2));
    fs.writeFileSync(path.join(outDir, "pages_4_natale.json"), JSON.stringify(pagesByPath.natale, null, 2));
    fs.writeFileSync(path.join(outDir, "pages_5_alien.json"), JSON.stringify(pagesByPath.alien, null, 2));
    fs.writeFileSync(path.join(outDir, "pages_manifest.json"), JSON.stringify(pagesByPath, null, 2));

    console.log("Page JSON generated in:", outDir);
}

run();