// src/features/products/productSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import {
  Product,
  ProductFormData,
  ProductState,
} from "../../type/product.type";

// Assuming your API endpoints
const API_URL = "https://api-crud.elcho.dev/api/v1/2e2d5-dfee1-a13e2/prac";

// Async thunks for API operations
export const fetchProducts = createAsyncThunk<
  Product[],
  void,
  { rejectValue: any }
>("products/fetchProducts", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get<Product[]>(API_URL);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

export const addProduct = createAsyncThunk<
  Product,
  ProductFormData,
  { rejectValue: any }
>("products/addProduct", async (product, { rejectWithValue }) => {
  try {
    const response = await axios.post<Product>(API_URL, product);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

export const updateProduct = createAsyncThunk<
  Product,
  { id: string; updatedProduct: ProductFormData },
  { rejectValue: any }
>(
  "products/updateProduct",
  async ({ id, updatedProduct }, { rejectWithValue }) => {
    try {
      const response = await axios.put<Product>(
        `${API_URL}/${id}`,
        updatedProduct
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteProduct = createAsyncThunk<
  string,
  string,
  { rejectValue: any }
>("products/deleteProduct", async (id, { rejectWithValue }) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    return id;
  } catch (error: any) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

const initialState: ProductState = {
  products: [],
  status: "idle",
  error: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch products
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.status = "succeeded";
          state.products = action.payload;
        }
      )
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })

      // Add product
      .addCase(addProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        addProduct.fulfilled,
        (state, action: PayloadAction<Product>) => {
          state.status = "succeeded";
          state.products.push(action.payload);
        }
      )
      .addCase(addProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })

      // Update product
      .addCase(updateProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        updateProduct.fulfilled,
        (state, action: PayloadAction<Product>) => {
          state.status = "succeeded";
          const index = state.products.findIndex(
            (product) => product.id === action.payload.id
          );
          if (index !== -1) {
            state.products[index] = action.payload;
          }
        }
      )
      .addCase(updateProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })

      // Delete product
      .addCase(deleteProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        deleteProduct.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.status = "succeeded";
          state.products = state.products.filter(
            (product) => product.id !== action.payload
          );
        }
      )
      .addCase(deleteProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      });
  },
});

export const { resetStatus } = productSlice.actions;
export default productSlice.reducer;
