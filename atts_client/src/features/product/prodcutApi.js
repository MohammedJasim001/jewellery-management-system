import apiClient from "../../services/axiosInstance"

export const getProductApi = ({page,limit}) => {
    return apiClient.get(`/products?page=${page}&limit=${limit}`)
}

export const getSingleProductApi = (productId) => {
    return apiClient.get(`/products/${productId}`)
}

export const deleteProductApi = (productId) => {
    return apiClient.delete(`/products/delete/${productId}`)
}

export const addProductApi = (formData) =>{
    return apiClient.post('/products/create',formData,{
         headers: {
          'Content-Type': 'multipart/form-data',
        },
    })
}

export const updateProductApi = ({id,formData}) => {
    return apiClient.put(`/products/update/${id}`,formData,{
          headers: {
          'Content-Type': 'multipart/form-data',
        },
    })
}