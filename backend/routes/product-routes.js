import express from "express";
import { createProduct, removeProduct, getProducts, editProduct } from "../controllers/product-controller.js";

const router = express.Router()

router.post('/', createProduct);
router.get('/', getProducts)
router.put('/:id', editProduct);
router.delete('/:id', removeProduct);

export default router