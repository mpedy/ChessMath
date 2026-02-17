const http = require("node:http");
const url = require("url");
const fs = require('fs');
const path = require('path');
const { mime_type } = require("./mime-type-helper.cjs");


module.exports = {
    /**
     * 
     * @param {http.IncomingMessage} request 
     * @param {http.ServerResponse} response 
     */
    serveStatic: function (request, response) {
        // parse URL
        const parsedUrl = url.parse(request.url);
        //console.log(`Ricevuta richiesta statica ${request.method} all'url ${parsedUrl.pathname}`);

        // extract URL path
        // Avoid https://en.wikipedia.org/wiki/Directory_traversal_attack
        // e.g curl --path-as-is http://localhost:9000/../fileInDanger.txt
        // by limiting the path to current directory only
        const sanitizePath = path.normalize(parsedUrl.pathname).replace(/^(\.\.[\/\\])+/, '');
        let pathname = path.join(process.cwd(), sanitizePath);
        fs.exists(pathname, function (exist) {
            if (!exist || fs.statSync(pathname).isDirectory()) {
                // if the file is not found, return 404
                response.statusCode = 404;
                response.end(`File ${pathname} not found!`);
                return;
            }

            // if is a directory, then look for index.html
            /*if (fs.statSync(pathname).isDirectory()) {
                pathname += '/index.html';
            }*/

            // read file from file system
            fs.readFile(pathname, function (err, data) {
                if (err) {
                    response.statusCode = 500;
                    response.end(`Error getting the file: ${err}.`);
                } else {
                    // based on the URL path, extract the file extention. e.g. .js, .doc, ...
                    const ext = path.parse(pathname).ext;
                    // if the file is found, set Content-type and send data
                    response.setHeader('Content-type', mime_type[ext] || 'text/plain');
                    response.end(data);
                }
            });
        });
    }
}