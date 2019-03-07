const DB = require('../db');
const myPos = { lat: 50.083967, long: 19.899659 };


require("dotenv").config();

let db = new DB();

db.resolveUser("x123", 111, myPos, Date.now());