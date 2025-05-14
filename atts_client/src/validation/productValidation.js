import * as Yup from "yup";

export const addProductschema = Yup.object({
      name: Yup.string().required('Product name is required'),
      image: Yup.mixed().required('Image is required'),
      description: Yup.string().required('Description is required'),
      price: Yup.number().positive('Must be positive').required('Price is required'),
      stock: Yup.number().integer().min(0, 'Cannot be negative').required('Stock is required'),
      manufacturingDate: Yup.date().required('Manufacturing date is required'),
      category: Yup.string().required('Category is required'),
    })