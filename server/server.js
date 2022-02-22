const express = require("express");

const app = express();
const hero = require("./Router/HeroData");
const test = require("./Router/test");

app.use("/api/hero", hero);
app.use("/api", test);

const port = 5000;

app.listen(port, ()=> console.log(`Listening on port ${port}`));