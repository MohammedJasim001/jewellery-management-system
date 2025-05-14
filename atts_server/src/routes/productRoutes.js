import express from "express";
import upload from "../middleware/imageUploadMiddleware.js";
import {
  createProduct,
  deleteProduct,
  getProducts,
  getSingleProduct,
  updateProduct,
} from "../controller/productController.js";
import userAuth from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/products/create",
  userAuth,
  upload.single("image"),
  createProduct
);
router.get("/products", userAuth, getProducts);
router.get('/products/:productId',userAuth,getSingleProduct)
router.put(
  "/products/update/:productId",
  userAuth,
  upload.single("image"),
  updateProduct
);
router.delete('/products/delete/:productId',userAuth,deleteProduct)

export default router;
