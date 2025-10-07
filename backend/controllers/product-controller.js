import { deleteProduct, fetchProducts, insertProduct, isValidId, updateProduct } from "../models/Product.js";

export const createProduct = async (req, res) =>{
    const { name, price, image } =  req.body; //data comming from the frontend

    if (!name || !price || !image){
        return res.status(400).json({success: false, message: 'Please fill in all fields'});
    }

    try {
        await insertProduct(name, price, image);
        const newProduct = await fetchProducts();
        return res.status(201).json({success: true, data: newProduct, message: 'Product created successfully'});
    } catch (error) {
        console.error('Error:', error.message);
        return res.status(500).json({success: false, message: 'Server Error'});
    }
}

export const getProducts = async (req, res) => {
    try {
        const products = await fetchProducts();
        //console.log("product that where fetched:", products)
        return res.status(200).json({success: true, data: products, message: 'Products fetched'});
    } catch (error) {
        res.status(500).json({success: false, message: 'Internal server error'});
        console.log(`Error ${error}`);
    }
}

export const editProduct = async (req, res) => {
    const {id} = req.params;
    const { name, price, image } = req.body;
    const validId = await isValidId(id)
    console.log("validId = ", validId)
    if(validId.length === 0){
        return res.status(400).json({success: false, message: 'Product not found'});
    }

    try {
        const updatedProduct = await updateProduct(id, name, price, image);
        console.log(updatedProduct);
        return res.status(200).json({success: true, data: updatedProduct, message: 'Product updated'});
    } catch (error) {
        res.status(500).json({success: false, message: 'Product not found'});
        console.log(`Error ${error}`);
    }
}

export const removeProduct = async (req, res) => {
    const {id} = req.params;
    const validId = await isValidId(id)
    console.log("validId = ", validId)
    if(validId.length === 0){
        return res.status(400).json({success: false, message: 'Product not found'});
    }

    try {
        await deleteProduct(id);
        return res.status(200).json({success: true, message: 'product deleted'});
    } catch (error) {
        res.status(500).json({success: false, message: 'Product not found'});
        console.log(`Error ${error}`);
    }
}