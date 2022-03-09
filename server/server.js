const express = require("express");

const app = express();
const hero = require("./Router/HeroData");
const defense = require("./Router/DefenseMeta");
const offense = require("./Router/OffenseMeta");

// post type req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/hero", hero);
app.use("/api/defense", defense);
app.use("/api/offense", offense);

const port = 5000;

app.listen(port, ()=> console.log(`Listening on port ${port}`));