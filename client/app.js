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

    next();
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

app.get("/reviews", (req, res) => {
    res.sendFile("/public/blog.html", { root: __dirname });
});

app.get("/contact", (req, res) => {
    res.sendFile("/public/contact.html", { root: __dirname });
});

app.get("/login", (req, res) => {
    res.sendFile("/public/login.html", { root: __dirname });
});

app.get("/register", (req, res) => {
    res.sendFile("/public/register.html", { root: __dirname });
});

app.get("/search", (req, res) => {
    res.sendFile("/public/result.html", { root: __dirname });
});

app.get("/review-single", (req, res) => {
    res.sendFile("/public/review-single.html", { root: __dirname });
});

app.get("/admin", (req, res) => {
    res.sendFile("/public/admin.html", { root: __dirname });
});

app.get("/manage-travel", (req, res) => {
    res.sendFile("/public/manage-travel.html", { root: __dirname });
});

app.get("/manage-itinerary", (req, res) => {
    res.sendFile("/public/manage-itinerary.html", { root: __dirname });
});

app.get("/error", (req, res) => {
    res.status(404);
    res.contentType('html');
    res.sendFile('/public/error.html', { root: __dirname });
});

app.use(serveStatic(__dirname + "/public"));

// For any other routes
app.use((req, res) => {
    res.redirect("/error");
});


app.listen(port, hostname, function () {
    console.log(`Server hosted at http://${hostname}:${port}`);
});