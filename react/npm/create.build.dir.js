/**
 * Created by diman on 04.07.17.
 */

const fs = require('fs'),
    path = require('path');


const BUILD_DIR_NAME = "build";

const INDEX_HTML = `<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="" type="image/x-icon" />
    <title>Бонусный клуб</title>
    <link rel="stylesheet" href="/css/bundle.css">
</head>
<body>
<div id="main"></div>
<script src="/js/bundle.js"></script>
</body>
</html>`;

function createDir() {
    var dir = path.join(__dirname, "../", BUILD_DIR_NAME);
    if(!fs.existsSync(dir)){
        fs.mkdirSync(dir);
        fs.mkdirSync(path.join(dir, "css"));
        fs.mkdirSync(path.join(dir, "js"));
        fs.mkdirSync(path.join(dir, "img"));
        fs.writeFile(path.join(dir, "index.html"), INDEX_HTML, function(err) {
            if(err) {
                return console.log(err);
            }

            console.log("build directory created!");
        });
    }
}

module.exports = createDir;


