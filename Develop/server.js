// Required Modules
const express = require("express");
const fs = require("fs");
const path = require("path");
const uuid = require("uuid");

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware functions
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Get method to recieve the homepage(index.html)
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

// Get method to recieve the notes page
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// Get method to recieve the the notes database
app.get("/api/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/db/db.json"))
});

// Post method to post new notes to the database
app.post("/api/notes", (req, res) => {
    const notesData = JSON.parse(fs.readFileSync("./db/db.json"));
    const newNote = req.body;
    newNote.id = uuid.v4();

    notesData.push(newNote);

    fs.writeFileSync("./db/db.json", JSON.stringify(notesData));

    res.json(notesData);
});

// Delete method to delete notes from the database
app.delete("/api/notes/:id", (req, res) => {
    const notesData = JSON.parse(fs.readFileSync("./db/db.json"));
    const deleteNote = notesData.filter((deleteNote) => deleteNote.id !== req.params.id);

    fs.writeFileSync("./db/db.json", JSON.stringify(deleteNote));

    res.json(deleteNote);
})

// Listen method to host server
app.listen(PORT, function () {
    console.log(`App listening on port ${PORT}`);
});