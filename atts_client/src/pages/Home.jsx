import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../features/product/productThunk";
import { GrLinkPrevious } from "react-icons/gr";
import { GrLinkNext } from "react-icons/gr";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const limit = 8;

  const {
    data: products,
    loading,
    error,
    totalPages,
  } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProducts({ page, limit }));
  }, [dispatch, page]);

  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };

  const handlePrev = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-20">
      <div className="flex justify-between mb-8">
        <h1 className="text-3xl font-bold">Product Lists</h1>
        <button
          className="bg-green-600 p-2 h-12 text-md rounded-md hover:bg-green-700 font-semibold"
          onClick={() => navigate("/addProduct")}
        >
          Add Product
        </button>
      </div>

      {loading && (
        <p className="text-center text-lg text-gray-600">Loading...</p>
      )}
      {error && <p className="text-center text-red-500">{error}</p>}
      {!loading && !error && products.length === 0 && (
        <p className="text-center text-gray-500">No products available.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            onClick={() => handleProductClick(product._id)}
            className="group relative cursor-pointer bg-white shadow-md transition-all duration-300 overflow-hidden rounded-lg"
          >
            <div className="relative overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="px-6 py-3 bg-white rounded-md">
                  <p className="text-gray-800 font-semibold text-center">
                    View Details
                  </p>
                </div>
              </div>
            </div>
            <div className="p-4">
              <h2 className="text-lg font-semibold">{product.name}</h2>
              <p className="text-gray-700">
                ₹<span className="font-bold">{product.price}</span>
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-center space-x-4">
        <button
          onClick={handlePrev}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50 flex items-center gap-2"
        >
          <GrLinkPrevious />
          Prev
        </button>
        <span className="self-center">Page {page}</span>
        <button
          onClick={handleNext}
          disabled={page === totalPages}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50 flex items-center gap-2"
        >
          Next
          <GrLinkNext />
        </button>
      </div>
    </div>
  );
};

export default Home;
