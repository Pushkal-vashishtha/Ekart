import express from "express";
import { getProductByCategoryId } from "../controllers/product.js";

const router = express.Router();

router.get('/:categoryId',getProductByCategoryId);

export default router;