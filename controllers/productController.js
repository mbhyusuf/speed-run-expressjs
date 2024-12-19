const { products } = require("../data");
const Product = require("../models/productModel.js");
const {
    getAllProduct,
    getProductById,
    searchProduct,
    postProduct,
    updateProduct,
    deleteProduct,
} = require("../utils/productUtils");

const getAllProductController = (req, res) => {
    const products = getAllProduct();
    if (!products) {
        return res.status(200).json("No product for now");
    }

    const response = {
        success: true,
        data: products,
    };

    return res.status(200).json(response);
};
const getProductByIdController = (req, res) => {
    const id = req.params.id;

    if (!id) {
        return res.status(400).json("Please provide id value");
    }

    const product = getProductById(id);

    if (!product) {
        return res.status(404).json(`No product with id ${id}`);
    }

    const response = {
        success: true,
        data: product,
    };
    return res.status(200).json(response);
};
const searchProductController = (req, res) => {
    const keyword = req.query.keyword;
    let limit = req.query.limit;

    let newProducts = [];

    if (!keyword) {
        newProducts = getAllProduct();
    } else {
        if (!limit) {
            limit = products.length;
        }

        newProducts = searchProduct(keyword, limit);
    }
    const response = {
        success: true,
        data: newProducts,
    };
    return res.status(200).json(response);
};
const postProductController = async (req, res) => {
    const { name, image, price, desc } = req.body;
    if (!name) {
        return res.status(400).json({ msg: "please provide name value" });
    }
    if (!image) {
        return res.status(400).json({ msg: "please provide image value" });
    }
    if (!price) {
        return res.status(400).json({ msg: "please provide price value" });
    }
    if (!desc) {
        return res.status(400).json({ msg: "please provide desc value" });
    }

    const product = await Product.create(req.body);

    const response = {
        success: true,
        message: "Successfully created the product",
        data: product,
    };
    return res.status(201).json(response);
};
const updateProductController = (req, res) => {
    allowedFields = ["price", "desc"];
    const reqBodyKeys = Object.keys(req.body);

    invalidFields = reqBodyKeys.filter((key) => !allowedFields.includes(key));

    if (invalidFields.length > 0) {
        return res
            .status(400)
            .json({ msg: `Key(s) ${invalidFields} is not allowed` });
    }

    const id = req.params.id;
    const { price, desc } = req.body;

    if (!price) {
        return res.status(400).json({ msg: "please provide price value" });
    }

    if (!desc) {
        return res.status(400).json({ msg: "please provide desc value" });
    }

    const newProducts = updateProduct(id, price, desc);

    const response = {
        success: true,
        data: newProducts,
    };
    return res.status(200).json(response);
};
const deleteProductController = (req, res) => {
    const id = req.params.id;

    if (!id) {
        res.status(400).json({ msg: "Please provide id value" });
    }

    const newProducts = deleteProduct(id);

    const response = {
        success: true,
        data: newProducts,
    };

    return res.status(200).json(response);
};

module.exports = {
    getAllProductController,
    getProductByIdController,
    searchProductController,
    postProductController,
    updateProductController,
    deleteProductController,
};
