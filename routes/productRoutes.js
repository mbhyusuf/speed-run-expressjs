const express = require("express");
const {
    getAllProductController,
    getProductByIdController,
    searchProductController,
    postProductController,
    updateProductController,
    deleteProductController,
} = require("../controllers/productController");

const productRouter = express.Router();

productRouter.get("/", getAllProductController);
productRouter.get("/search", searchProductController);
productRouter.post("/add", postProductController);
productRouter.get("/:id", getProductByIdController);
productRouter.put("/:id/update", updateProductController);
productRouter.delete("/:id/delete", deleteProductController);

module.exports = { productRouter };
