const express = require("express");
const db = require("./database");
const app = express();
app.use(express.json());

app.post("/api/start", (req, res) => {
    const { name } = req.body;
    db.run(
        "INSERT INTO pet_rock (name, hunger, energy, happiness) VALUES (?, 50, 50, 50)",
        [name],
        () => res.sendStatus(200)
    );
});

app.get("/api/stats", (req, res) => {
    db.get("SELECT * FROM pet_rock", [], (err, row) => {
        if (!row) return res.status(404).send("Pet rock not found!");
        res.json(row);
    });
});

app.post("/api/:action", (req, res) => {
    const action = req.params.action;
    db.get("SELECT * FROM pet_rock", [], (err, row) => {
        if (!row) return res.status(404).send("Pet rock not found!");

        let { hunger, energy, happiness } = row;
        if (action === "feed") hunger = Math.max(0, hunger - 10);
        else if (action === "play") happiness = Math.min(100, happiness + 10);
        else if (action === "sleep") energy = Math.min(100, energy + 10);

        db.run(
            "UPDATE pet_rock SET hunger = ?, energy = ?, happiness = ?",
            [hunger, energy, happiness],
            () => res.sendStatus(200)
        );
    });
});

module.exports = app;

