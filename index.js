const express = require('express')
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = express()
port = 3000;
const productRoute = require("./routes/products")
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");

dotenv.config();

mongoose.connect(process.env.MONGO_URL).then(() => console.log("db is connected")).catch((err) => console.log(err));




app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use('/api/products', productRoute);

app.use('/api/', authRoute);

app.use('/api/users', userRoute);

app.get('/', (req, res) => res.send('Hello Sneakers!'))
app.listen(process.env.PORT || port, () => console.log(`Example app listening on port ${process.env.PORT}!`))