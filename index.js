// Required Modules
var http = require('http');
var url = require('url');
var fs = require('fs');

// Create server
http.createServer(function (req, res) {
    var q = url.parse(req.url, true);
    var filename = "." + q.pathname + ".html";

    console.log(filename);

    if (filename == "./.html") {
        fs.readFile("index.html", function (err, data) {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data);
            return res.end();
        });
    } else {
        fs.readFile(filename, function (err, data) {
            if (err) {
                fs.readFile('./404.html', function (err, data) {
                    res.writeHead(404, { 'Content-Type': 'text/html' })
                    res.write(data);
                    return res.end();
                });
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(data);
                return res.end();
            } 
        });
    }
    
}).listen(8080);