const express = require("express");
const ejs = require("ejs");

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const Singer = require("./models/Singer");
const Genre = require("./models/Genre");

app.get("/", async (req, res) => {
    res.render("index", {
        title: "Ana Sayfa | Konser KDS",
    });
});

app.get("/api/singers", async (req, res) => {
    const singers = await Singer.singers();

    res.status(200).json({
        singers: singers[0],
    });
});

app.get("/api/genres", async (req, res) => {
    const genres = await Genre.genres();

    res.status(200).json({
        genres: genres[0],
    });
});

const PORT = 3001;
app.locals.baseURL = `http://localhost:${PORT}`;
app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
});
