import Products from "../model/productModel.js";

export const createProduct = async (productData, image) => {
  const { name, price, stock, description, category, manufacturingDate } =
    productData;

  const product = await Products.create({
    name,
    price,
    stock,
    description,
    category,
    manufacturingDate,
    image: image.path,
  });

  return product;
};

export const getProducts = async (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;

  const [products, total] = await Promise.all([
    Products.find().skip(skip).limit(limit),
    Products.countDocuments(),
  ]);

  return {
    products,
    totalProducts: total,
    currentPage: page,
    totalPages: Math.ceil(total / limit),
  };
};


export const getSingleProduct = async (productId) => {
  const product = await Products.findById(productId)
  if(!product){
    const error = new Error('Product not found')
    error.statusCode = 400
    throw error
  }
  return product
}

export const updateProduct = async (productData, productId, image) => {
  const { name, price, description, stock, category, manufacturingDate } =
    productData;
  console.log(productId, "id");
  const product = await Products.findById(productId);

  if (!product) {
    const error = new Error("Product does not exist");
    error.statusCode = 400;
    throw error;
  }
  if (name) product.name = name;
  if (price) product.price = price;
  if (description) product.description = description;
  if (stock) product.stock = stock;
  if (category) product.category = category;
  if (manufacturingDate) product.manufacturingDate = manufacturingDate;
  if (image) {
    product.image = image?.path;
  }

  await product.save();
  return product;
};

export const deleteProduct = async (productId) => {
  const product = await Products.findByIdAndDelete(productId);
  if (!product) {
    const error = new Error("Product not found");
    error.statusCode = 404;
    throw error;
  }
  return product;
};
