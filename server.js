require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

const { peopleRouter } = require("./routes/peopleRoutes");
const { productRouter } = require("./routes/productRoutes");

const app = express();

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/people", peopleRouter);
app.use("/products", productRouter);

mongoose
    .connect(process.env.MONGODB_CONNECTION_STRING)
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(process.env.PORT, () => {
            console.log(
                `Server is listening on http://localhost:${process.env.PORT}`
            );
        });
    })
    .catch(() => {
        console.log("Connection failed");
    });
