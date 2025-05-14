import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addProductApi,
  deleteProductApi,
  getProductApi,
  getSingleProductApi,
  updateProductApi,
} from "./prodcutApi";

export const getProducts = createAsyncThunk(
  "products/get",
  async ({page=1,limit=8}, { rejectWithValue }) => {
    try {
      const res = await getProductApi({page,limit});
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "Something went wrong"
      );
    }
  }
);

export const getSingleProduct = createAsyncThunk(
  "product/get",
  async (productId, { rejectWithValue }) => {
    try {
      const res = await getSingleProductApi(productId);
      return res.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "product/delete",
  async (productId, { rejectWithValue }) => {
    try {
      const res = await deleteProductApi(productId);
      return res.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

export const addProduct = createAsyncThunk(
  "product/add",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await addProductApi(formData);
      return res.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "product/update",
  async ({id,formData}, { rejectWithValue }) => {
    console.log(id,'productId');
    try {
      const res = await updateProductApi({id,formData});
      return res.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);