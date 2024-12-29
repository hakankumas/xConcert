const express = require("express");
const ejs = require("ejs");

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const Admin = require("./models/Admin");
const Singer = require("./models/Singer");
const Genre = require("./models/Genre");
const Concert = require("./models/Concert");
const Count = require("./models/Count");
const City = require("./models/City");

app.get("/", async (req, res) => {
    const revenue = await Count.revenue();
    const tickets = await Count.tickets();
    const singers = await Count.singers();
    const concerts = await Count.concerts();

    const list_singer = await Singer.singers();
    const list_city = await City.getall();
    const concert_notices = await Concert.notices();

    res.render("index", {
        title: "Ana Sayfa | Konser KDS",

        revenue: revenue[0],
        tickets: tickets[0],
        singers: singers[0],
        concerts: concerts[0],

        list_singer: list_singer[0],
        list_city: list_city[0],
        concert_notices: concert_notices[0],
    });
});

app.get("/login", async (req, res) => {
    res.render("login", {
        title: "Yönetici Giriş | Konser KDS",
    });
});

app.post("/api/login", async (req, res) => {
    const admin = await Admin.login(req.body);
    if (admin[0][0]) res.redirect("/");
    else res.redirect("/login");
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

app.post("/concert/create", async (req, res) => {
    const concert = await Concert.create(req.body);
    if (concert) res.redirect("/");
});

const PORT = 3001;
app.locals.baseURL = `http://localhost:${PORT}`;
app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
});
