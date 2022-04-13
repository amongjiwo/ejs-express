const express = require("express");

const app = express();
const port = 8080

// Anggap saja sebuah database
const unit = [];

app.set("view engine", "ejs")

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/salam", (req, res) => {
    const namaDariQuery = req.query.nama || "Tidak ada nama";
   
    res.render("salam", {
        nama: namaDariQuery,
    });
});

app.get("/update-stock", (req, res) => {
    res.render("update");
});

app.post("/update-stock", (req, res) => {
    const product = req.body.product;
    const sku = req.body.sku;
    const stock = req.body.stock;

    unit.push({
        product,
        sku,
        stock,
    });

    console.log(unit);

    res.redirect("/tampilkan-data");
});

app.get("/jumlah-unit", (req, res) => {
    res.send(`Jumlah unit ${unit.length}`);
});

app.get("/tampilkan-data-json", (req, res) => {
    res.json(unit);
});

app.get("/tampilkan-data", (req, res) => {
    res.render("unit", {
        unit,
    });
});

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});
