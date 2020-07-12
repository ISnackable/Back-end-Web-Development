const express = require('express');
const serveStatic = require('serve-static');

var hostname = "localhost";
var port = 3001;

var app = express();

app.use(function (req, res, next) {
    console.log('URL:     ' + req.url);
    console.log('Method:  ' + req.method);
    console.log('Path:    ' + req.path);
    console.log('QueryId: ' + req.query.id);
    console.log("\n");

    if (req.method != "GET") {
        res.type('.html');
        var msg = "<html><body>This server only serves web pages with GET!</body></html>";
        res.end(msg);
    } else {
        next();
    }
});

// serve files from the "public" folder, so that they can
// be accessed via http://localhost:3001/login.html
// Note that we already have login.html inside the public folder

app.get("/", (req, res) => {
    res.sendFile("/public/index.html", { root: __dirname });
});

app.get("/about", (req, res) => {
    res.sendFile("/public/about.html", { root: __dirname });
});

app.get("/blog", (req, res) => {
    res.sendFile("/public/blog.html", { root: __dirname });
});

app.get("/contact", (req, res) => {
    res.sendFile("/public/contact.html", { root: __dirname });
});

app.get("/login", (req, res) => {
    res.sendFile("/public/login.html", { root: __dirname });
});

app.use(serveStatic(__dirname + "/public"));

// GET, POST, PUT, DELETE, or any other HTTP request method for any other routes
app.use((req, res) => {
    res.status(404);
    res.contentType('html');
    res.sendFile(__dirname + '/public/error.html');
});

app.listen(port, hostname, function () {

    console.log(`Server hosted at http://${hostname}:${port}`);
});