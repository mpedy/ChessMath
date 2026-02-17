import esbuild from "esbuild";
//import browserslist from "browserslist";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { bundle as lightningBundle, browserslistToTargets } from "lightningcss";
import browserslist from "browserslist";
//import browserslistToEsbuild from "./browserslistToEsbuild.mjs";

const OUTDIR = "static/dist";

function ensureDir(dir) {
    fs.mkdirSync(dir, { recursive: true });
}

function cleanOld(patterns, dir = OUTDIR) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    for (const f of files) {
        if (patterns.some((re) => re.test(f))) {
            fs.unlinkSync(path.join(dir, f));
        }
    }
}

function shortHash(buf) {
    return crypto.createHash("sha256").update(buf).digest("hex").slice(0, 10);
}
//esbuild static/js/app.js --bundle --minify --sourcemap --target=es2015 --format=iife --outfile=static/js/app.dist.tmp2015.js
async function buildJS() {
    //const ESBuildTargets = browserslistToEsbuild();
    const result = await esbuild.build({
        entryPoints: ["static/js/app.js"],
        bundle: true,
        minify: true,
        sourcemap: true,
        target: ["es2015"],//, ...ESBuildTargets],
        format: "iife",
        outdir: OUTDIR+"/js",
        entryNames: "app.[hash]",
        metafile: true,
        //metafile: "static/dist/meta.json",
        write: true,
    });

    // Trova il file JS generato (app.<hash>.js) dentro result.metafile.outputs
    const outputs = Object.keys(result.metafile.outputs);
    const jsOut = outputs.find((p) => p.replaceAll("\\", "/").match(/static\/dist\/js\/app\..+\.js$/));
    if (!jsOut) throw new Error("JS output app.<hash>.js non trovato");

    // Converti in path relativo a /static
    //const rel = jsOut.replaceAll("\\", "/").replace(/^static\//, "");
    const rel = jsOut;
    const hash = rel.match(/app\.(.+)\.js$/)[1];
    await buildBabel_2015(hash);
    await esbuild.build({
        entryPoints: [`static/dist/js/app.${hash}.js`],
        bundle: true,
        minify: true,
        sourcemap: true,
        target: ["es5"],
        //target: ["es2015"],//, ...ESBuildTargets],
        format: "iife",
        outdir: OUTDIR+"/js",
        metafile: true,
        //metafile: "static/dist/meta.json",
        write: true,
        allowOverwrite: true,
    });
    return { js: rel };
}

//babel static/js/app.dist.tmp2015.js --out-file static/js/app.dist.js --presets=@babel/preset-env --plugins=./myplugin__define_var.cjs --minified --source-maps
async function buildBabel_2015(hash) {
    const { exec } = await import("child_process");
    return new Promise((resolve, reject) => {
        exec(`npx babel static/dist/js/app.${hash}.js --out-file static/dist/js/app.${hash}.js --plugins=./myplugin__define_var.cjs --minified --source-maps`, (error, stdout, stderr) => {
            if (error) {
                reject(error);
            } else {
                resolve();
            }
        });
    });
}

//esbuild static/styles.css --bundle --minify --sourcemap --target=chrome58,firefox57,safari11 --outdir=static/dist --entry-names=style.[hash] --metafile=static/dist/meta_css.json
async function buildCSS() {
    const LightningCSStargets = browserslistToTargets(browserslist());
    //const targets = browserslistToTargets(browserslist("> 2%, not dead")); // :contentReference[oaicite:3]{index=3}
    /*const targets = {
        chrome: 58,
        firefox: 57,
        safari: 11,
        edge: 79,
        ios_saf: 11
    };*/

    // bundle CSS (risolve @import), minify, sourcemap
    const res = await lightningBundle({
        filename: path.resolve("static/css/styles.css"),
        bundle: true,
        minify: true,
        sourceMap: true,
        LightningCSStargets,
        outdir: OUTDIR+"/css",
        entryNames: "style.[hash]",
        metafile: true,
    });

    // res.code è Uint8Array; res.map è Uint8Array (sourcemap)
    const cssCode = Buffer.from(res.code);
    const cssMap = Buffer.from(res.map);

    const h = shortHash(cssCode);
    const cssName = `style.${h}.css`;
    const mapName = `${cssName}.map`;

    fs.writeFileSync(path.join(OUTDIR+"/css", cssName), cssCode);
    fs.writeFileSync(path.join(OUTDIR+"/css", mapName), cssMap);

    return { css: `static/dist/css/${cssName}` };
}

async function main() {
    ensureDir(OUTDIR);
    ensureDir(OUTDIR+"/js");
    ensureDir(OUTDIR+"/css");

    // pulisci vecchi app.* e style.* (solo dentro static/dist)
    cleanOld([
        /^app\..+\.js$/,
        /^app\..+\.js\.map$/,
    ], OUTDIR+"/js");

    cleanOld([
        /^style\..+\.css$/,
        /^style\..+\.css\.map$/,
    ], OUTDIR+"/css");

    cleanOld([
        /^manifest\.json$/
    ], OUTDIR);

    console.log("Building JS...");
    const js = await buildJS();
    console.log("Building CSS...");
    const css = await buildCSS();

    const manifest = { ...js, ...css };
    fs.writeFileSync(path.join(OUTDIR, "manifest.json"), JSON.stringify(manifest, null, 2));

    console.log("Build OK:", manifest);
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
});
