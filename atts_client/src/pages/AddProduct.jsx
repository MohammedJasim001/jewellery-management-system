import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { addProductschema } from '../validation/productValidation';
import { useDispatch, useSelector } from 'react-redux';
import { resetProductState } from '../features/product/productSlice';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { addProduct } from '../features/product/productThunk';

const AddProduct = () => {
    const navigate = useNavigate()
  const [imagePreview, setImagePreview] = useState(null);
  const dispatch = useDispatch()
  const {success, successMessage, error} = useSelector((state)=>state.product)

  const formik = useFormik({
    initialValues: {
      name: '',
      image: null,
      description: '',
      price: '',
      stock: '',
      manufacturingDate: '',
      category: '',
    },
    validationSchema: addProductschema,
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append('name',values.name)
      formData.append('image',values.image)
      formData.append('description',values.description)
      formData.append('category',values.category)
      formData.append('price',values.price)
      formData.append('stock',values.stock)
      formData.append('manufacturingDate',values.manufacturingDate)
      console.log('FormData prepared:', values);

      dispatch(addProduct(formData))
    },
  });

  useEffect(()=>{
     if(success){
        toast.success(successMessage)
        navigate('/')
        dispatch(resetProductState())
    }
     if (error) {
      toast.error(error);
      console.log(error, "errror");
      dispatch(resetProductState())
    }
  },[dispatch, error, navigate, success, successMessage])

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      formik.setFieldValue('image', file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const categoryOptions = ['Necklace', 'Ring', 'Earrings', 'Bracelet', 'Pendant'];

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-lg shadow">
      <h2 className="text-3xl font-semibold mb-6 text-center">Add New Product</h2>
      <form onSubmit={formik.handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <div className="col-span-1">
          <label className="block font-medium mb-1">Product Name</label>
          <input
            type="text"
            name="name"
            className="w-full p-2 border rounded"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name && (
            <div className="text-red-500 text-sm">{formik.errors.name}</div>
          )}
        </div>

        <div className="col-span-1">
          <label className="block font-medium mb-1">Category</label>
          <select
            name="category"
            className="w-full p-2 border rounded"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.category}
          >
            <option value="">Select category</option>
            {categoryOptions.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          {formik.touched.category && formik.errors.category && (
            <div className="text-red-500 text-sm">{formik.errors.category}</div>
          )}
        </div>

        <div className="col-span-1">
          <label className="block font-medium mb-1">Price (₹)</label>
          <input
            type="number"
            name="price"
            className="w-full p-2 border rounded"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.price}
          />
          {formik.touched.price && formik.errors.price && (
            <div className="text-red-500 text-sm">{formik.errors.price}</div>
          )}
        </div>

        <div className="col-span-1">
          <label className="block font-medium mb-1">Stock</label>
          <input
            type="number"
            name="stock"
            className="w-full p-2 border rounded"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.stock}
          />
          {formik.touched.stock && formik.errors.stock && (
            <div className="text-red-500 text-sm">{formik.errors.stock}</div>
          )}
        </div>

        <div className="col-span-1">
          <label className="block font-medium mb-1">Manufacturing Date</label>
          <input
            type="date"
            name="manufacturingDate"
            className="w-full p-2 border rounded"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.manufacturingDate}
          />
          {formik.touched.manufacturingDate && formik.errors.manufacturingDate && (
            <div className="text-red-500 text-sm">{formik.errors.manufacturingDate}</div>
          )}
        </div>

        <div className="col-span-1 md:col-span-2">
          <label className="block font-medium mb-1">Description</label>
          <textarea
            name="description"
            rows="3"
            className="w-full p-2 border rounded"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
          />
          {formik.touched.description && formik.errors.description && (
            <div className="text-red-500 text-sm">{formik.errors.description}</div>
          )}
        </div>

        <div className="col-span-1">
          <label className="block font-medium mb-1">Product Image</label>
          <input
            name='image'
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-2 border rounded"
          />
          {formik.touched.image && formik.errors.image && (
            <div className="text-red-500 text-sm">{formik.errors.image}</div>
          )}
        </div>

        {imagePreview && (
          <div className="col-span-1 flex justify-center items-center">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-32 h-32 object-cover border rounded"
            />
          </div>
        )}

        <div className="col-span-1 md:col-span-2">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
