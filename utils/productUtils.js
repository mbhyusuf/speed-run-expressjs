const { products } = require("../data");

const getAllProduct = () => {
    const newProducts = products.map((product) => {
        const { id, name, image, price } = product;
        return { id, name, image, price };
    });
    return newProducts;
};

const getProductById = (id) => {
    const product = products.find((product) => product.id === Number(id));
    return product;
};
const searchProduct = (keyword, limit) => {
    let newProducts = products.filter((product) =>
        product.name.includes(keyword)
    );
    newProducts = newProducts.slice(0, Number(limit));
    return newProducts;
};
const postProduct = (name, image, price, desc) => {
    const product = {
        name,
        image,
        price,
        desc,
    };
    const newProducts = [...products, product];
    return newProducts;
};
const updateProduct = (id, price, desc) => {
    const newProducts = products.map((product) => {
        if (product.id === Number(id)) {
            product = {
                ...product,
                price: price,
                desc: desc,
            };
        }
        return product;
    });
    return newProducts;
};
const deleteProduct = (id) => {
    const newProducts = products.filter((product) => product.id !== Number(id));
    return newProducts;
};

module.exports = {
    getAllProduct,
    getProductById,
    searchProduct,
    postProduct,
    updateProduct,
    deleteProduct,
};
