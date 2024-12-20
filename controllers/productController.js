const Product = require("../models/productModel.js");

const getAllProductController = async (req, res) => {
    const products = await Product.find();
    if (!products) {
        return res.status(200).json("No product for now");
    }

    const response = {
        success: true,
        message: "successfully restrived all products",
        data: products,
    };

    return res.status(200).json(response);
};
const getProductByIdController = async (req, res) => {
    const id = req.params.id;

    if (!id) {
        return res.status(400).json("Please provide id value");
    }

    const product = await Product.findById(id);

    if (!product) {
        return res.status(404).json(`No product with id ${id}`);
    }

    const response = {
        success: true,
        message: "successfully retrieved the product",
        data: product,
    };
    return res.status(200).json(response);
};
const searchProductController = async (req, res) => {
    const keyword = req.query.keyword;
    let limit = req.query.limit;

    let products = await Product.find();

    if (keyword) {
        if (!limit) {
            limit = products.length;
            console.log(limit);
        }

        products = products
            .filter((product) => product.name.includes(keyword))
            .slice(0, Number(limit));
    }
    const response = {
        success: true,
        message: "successfully retrieved the products",
        data: products,
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
        message: "Successfully added the product",
        data: product,
    };
    return res.status(201).json(response);
};
const updateProductController = async (req, res) => {
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

    const products = await Product.findByIdAndUpdate(id, {
        price,
        desc,
    });

    const response = {
        success: true,
        message: "successfully updated the product",
        data: products,
    };
    return res.status(200).json(response);
};
const deleteProductController = async (req, res) => {
    const id = req.params.id;

    if (!id) {
        res.status(400).json({ msg: "Please provide id value" });
    }

    const products = await Product.findByIdAndDelete(id);

    const response = {
        success: true,
        message: "successfully deleted the product",
        data: products,
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
