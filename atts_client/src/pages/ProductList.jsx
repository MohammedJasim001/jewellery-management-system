import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { resetProductState } from "../features/product/productSlice";
import DeleteModal from "../modal/DeleteModal";
import toast from "react-hot-toast";
import {
  deleteProduct,
  getSingleProduct,
} from "../features/product/productThunk";

const ProductDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { singleProduct, error, loading, successMessage, success } =
    useSelector((state) => state.product);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    if (id) dispatch(getSingleProduct(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (success) {
      toast.success(successMessage);
      navigate("/");
      dispatch(resetProductState());
    }
    if (error) {
      toast.error(error);
      console.log(error, "errror");
      dispatch(resetProductState());
    }
  }, [dispatch, successMessage, success, navigate, error]);

  if (loading) {
    return <div className="text-center text-gray-800">Loading...</div>;
  }

  if (error) {
    return (
      <div>
        <h2 className="text-xl font-semibold mb-2">Error Loading Product</h2>
        <p className="text-gray-600">{error}</p>
      </div>
    );
  }

  if (!singleProduct) return null;

  const {
    name,
    price,
    description,
    category,
    stock,
    manufacturingDate,
    image,
  } = singleProduct;

  const handleEdit = () => {
    navigate(`/updateProduct/${id}`);
  };

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    console.log("Deleting product...");
    dispatch(deleteProduct(id));
    setShowDeleteModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6 pt-20 ">
      <div className="max-w-4xl mx-auto flex flex-col">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="flex flex-row">
            <div className="w-1/2">
              <div className="relative pt-[100%] bg-gray-200">
                <img
                  src={image}
                  alt={name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="w-1/2 p-6 md:p-8 flex flex-col">
              <div className="flex-grow">
                <div className="mb-2">
                  <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-md">
                    {category}
                  </span>
                </div>
                <h1 className="text-2xl  font-bold text-gray-800 mb-2">
                  {name}
                </h1>
                <div className="text-lg font-semibold  mb-4">₹{price}</div>

                <div className="mb-6">
                  <p className="text-gray-600 leading-relaxed">{description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">Availability</p>
                    <p className="font-medium">
                      {stock > 0 ? (
                        <span className="text-green-600">
                          In Stock ({stock})
                        </span>
                      ) : (
                        <span className="text-red-600">Out of Stock</span>
                      )}
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">Manufacturing Date</p>
                    <p className="font-medium">
                      {new Date(manufacturingDate).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  className="flex-1 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 flex items-center justify-center"
                  onClick={handleEdit}
                >
                  Edit
                </button>
                <button
                  className="flex-1 px-6 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 flex items-center justify-center"
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};

export default ProductDetail;
