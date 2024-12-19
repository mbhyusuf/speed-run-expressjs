require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const { peopleRouter } = require("./routes/peopleRoutes");
const { productRouter } = require("./routes/productRoutes");

const app = express();

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/people", peopleRouter);
app.use("/products", productRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server is listening on http://localhost:${process.env.PORT}`);
});
