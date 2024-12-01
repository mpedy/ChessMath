const path = require("path")
const fs = require("fs")

if (fs.existsSync(path.resolve(__dirname, "static/js/dist"))) {
    fs.rmSync(path.resolve(__dirname, "static/js/dist"), { recursive: true, force: true });
}

function readdir(percorso) {
    return fs.readdirSync(path.resolve(__dirname, percorso)).filter(files => files.endsWith(".js")).map(files => `./${percorso}/${files}`)
}

function createWebPackObj(percorso) {
    var obj = {}
    for (var i of readdir(percorso)) {
        obj[i.substring("./static/js/".length, i.indexOf(".js"))] = i
    }
    return obj
}

/*const defaultFiles = fs.readdirSync(path.resolve(__dirname,"static/js"))
                .filter(files => files.endsWith(".js"))
                .map(files=>`/static/js/${files}`)*/
const defaultFiles = readdir("static/js")
//defaultFiles.splice(defaultFiles.indexOf("./static/js/drawchessboard.js"),1)
const licFiles = readdir("static/js/lic")
const medFiles = readdir("static/js/med")
const elemFiles = readdir("static/js/elem")
const nataleFiles = readdir("static/js/natale")

const jsFiles = [defaultFiles, licFiles, medFiles, elemFiles, nataleFiles].flat()

var nataleObj = createWebPackObj("static/js/natale")
var licObj = createWebPackObj("static/js/lic")
var medObj = createWebPackObj("static/js/med")
var elemObj = createWebPackObj("static/js/elem")
var commonObj = createWebPackObj("static/js/common")
module.exports = {
    //entry: "/static/js/all.js",
    entry: {
        welcome: [
            path.resolve(__dirname, "static/js/drawchessboardnewnew.js"),
            path.resolve(__dirname, "static/js/maketimernew.js"),
            path.resolve(__dirname, "static/js/movePiecesnew.js"),
            path.resolve(__dirname, "static/js/myui.js"),
            path.resolve(__dirname, "static/js/welcome.js")
        ],
        ////common: defaultFiles,
        //lic: licFiles, // ora è vuoto
        //med: medFiles, // ora è vuoto
        //elem: elemFiles, // ora è vuoto
        //natale: nataleFiles,
        ...nataleObj,
        ...licObj,
        ...medObj,
        ...elemObj,
        ...commonObj

    },
    mode: "development",
    output: {
        //filename: "[name].[contenthash].bundle.js",
        filename: "[name].js",
        path: path.resolve(__dirname, "static/js/dist")
    },
    module: {
        rules: [
            {
                test: /\.(?:js|mjs|cjs)$/,
                include: [
                    path.resolve(__dirname, "static/js")
                ],
                exclude: [
                    path.resolve(__dirname, "node_modules")
                ],
                use: {
                    loader: 'babel-loader',
                }
            }
        ]
    }
}