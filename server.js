var express = require("express");
var path = require("path");
var db = require("./db/db.json")
var fs = require("fs");

var app = express();
var PORT = process.env.PORT || 8000;

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(express.static("public"))

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/api/notes", function (req, res) {
    console.log(db)
    return res.send(db);
});

app.get("/api/notes/:notes", function (req, res) {
    var chosen = req.params.notes;

    console.log(chosen);

    for (var i = 0; i < notes.length; i++) {
        if (chosen === notes[i].routeName) {
            return res.json(notes[i]);
        }
    }

    return res.json(false);
});

app.delete("/api/notes/:id", function (req, res) {

    var chosen = req.params.id;

    console.log("ID is " + chosen);

    for (var i = 0; i < db.length; i++) {
        if (chosen === db[i].id) {
            db.splice(i, 1)
        }
    }
    return res.json(false);
});

app.post("/api/notes", function (req, res) {

    var newNotes = req.body;

    console.log(newNotes);

    db.push(newNotes);
    console.log(db)
    fs.writeFileSync("./db/db.json", JSON.stringify(db))
    res.json(newNotes);
});

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});