const express = require("express");
const ejs = require("ejs");
const path = require("path");
const port = 4040
const app = express();
const dbConnect = require('./connection')
const urlRoute = require('./routes/route')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/url', urlRoute)

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));


app.listen(port, ()=> console.log(`Server is running port ${port}`));