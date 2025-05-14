import catchAsync from "../utils/catchAsync.js";
import * as productServices from "../services/productServices.js";

export const createProduct = catchAsync(async (req, res) => {
  const product = await productServices.createProduct(req.body, req.file);
  res.status(201).json({
    message: "Product created successfully",
    product,
  });
});

export const getProducts = catchAsync(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const result = await productServices.getProducts(page, limit);

  res.status(200).json({
    message: "Products fetched successfully",
    ...result,
  });
});


export const getSingleProduct = catchAsync(async (req,res) => {
  const product = await productServices.getSingleProduct(req.params.productId)
  res.status(200).json({message:"Get the product", product})
})

export const updateProduct = catchAsync(async (req, res) => {
  const product = await productServices.updateProduct(
    req.body,
    req.params.productId,
    req.file
  );
  res.status(200).json({ message: "Product updated successfully", product });
});


export const deleteProduct = catchAsync(async (req,res) => {
     await productServices.deleteProduct(req.params.productId)
    res.status(200).json({message:"Product Successfully deleted"})
})
