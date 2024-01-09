const express = require('express')
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = express()
port = 3000;

dotenv.config();

mongoose.connect(process.env.MONGO_URL).then(() => console.log("db is connected")).catch((err) => console.log(err));


app.get('/', (req, res) => res.send('Hello Sneakers!'))
app.listen(process.env.PORT || port, () => console.log(`Example app listening on port ${process.env.PORT}!`))