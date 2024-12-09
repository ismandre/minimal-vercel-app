const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(":memory:");

db.serialize(() => {
    db.run(
        "CREATE TABLE pet_rock (name TEXT, hunger INTEGER, energy INTEGER, happiness INTEGER)"
    );
});

module.exports = db;

