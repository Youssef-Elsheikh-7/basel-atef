import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { PATH_API } from "../../Helper";
const user =  localStorage?.getItem("user")

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (page = "", { rejectedWithValue }) => {
    try {
      const response = await fetch(`${PATH_API}products?page=${page}`, {
        method: "GET",
        headers: {
          "Content-type": "json/application",
        },
      });
      const data = await response.json();

      return data;
    } catch (err) {
      return rejectedWithValue(err.message);
    }
  }
);
export const Filter = createAsyncThunk(
  "products/Filter",
  async ( _, { rejectedWithValue }) => {
    try {
      const response = await fetch(
        `https://moneyservices.store/back/public/api/product-grids?page=${JSON.parse(localStorage?.getItem("page"))}& category=${JSON.parse(localStorage?.getItem("cate")) || ""}&locale=${localStorage?.getItem("lng")}&price=0-${JSON.parse(localStorage.getItem("price")) || ""}brand=${JSON.parse(localStorage?.getItem("brand")) || ""}&color=${JSON.parse(localStorage?.getItem("color")) || ""}`
      );
      const data = await response.json();

      return data;
    } catch (err) {
      return rejectedWithValue(err.message);
    }
  }
);
export const productFromAllCate = createAsyncThunk(
  "products/productFromAllCate",
  async (cate, page,  { rejectedWithValue }) => {
    try {
      const response = await fetch(
        `https://moneyservices.store/back/public/api/product-grids?page=${JSON.parse(localStorage.getItem("page")) || ""}&category=${JSON.parse(localStorage.getItem("cate")) || ""}&locale=${localStorage.getItem("lng")}`
      );
      const data = await response.json();

      return data;
    } catch (err) {
      return rejectedWithValue(err.message);
    }
  }
);
export const filterProductByPrice = createAsyncThunk(
  "products/filterProductByPrice",
  async (price ,  { rejectedWithValue }) => {
    try {
      const response = await fetch(
        `https://moneyservices.store/back/public/api/product-grids?price=0-${price}&locale=${localStorage.getItem("lng")}`
      );
      const data = await response.json();

      return data;
    } catch (err) {
      return rejectedWithValue(err.message);
    }
  }
);

export const getCopons = createAsyncThunk(
  "products/getCopons",
  async (_, {rejectedWithValue}) => {
    try {
      const response = await fetch(`${PATH_API}copons?user_id=${user?.user?.id ? user?.user?.id : user?.id}&status=active`);
      const data = await response.json();
      return data;
    } catch (err) {
      return rejectedWithValue(err.message);
    }
  }
)


const products = createSlice({
  name: "products",
  initialState: { isLoading: false, isError: null, data: null, paginate: {}},
  reducers: {},
  extraReducers: (bulider) => {
    // get Products 
    bulider.addCase(getProducts.pending, (state) => {
      state.isLoading = true;
      state.isError = null;
      state.data = null;
    }),
      bulider.addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.products;
        state.paginate = null
        state.isError = null;
      }),
      bulider.addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
        state.data = null;
      });
    // Filter Products
    bulider.addCase(Filter.pending, (state) => {
      state.isLoading = true;
      state.isError = null;
      state.data = null;
    }),
      bulider.addCase(Filter.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.products.data;

        state.paginate = action.payload.products
        state.isError = null;
      }),
      bulider.addCase(Filter.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
        state.data = null;
      });
      // Filter By Price 
          bulider.addCase(filterProductByPrice.pending, (state) => {
      state.isLoading = true;
      state.isError = null;
      state.data = null;
    }),
      bulider.addCase(filterProductByPrice.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.products.data;
        state.paginate = action.payload.products
        state.isError = null;
      }),
      bulider.addCase(filterProductByPrice.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
        state.data = null;
      });
      bulider.addCase(getCopons.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
        state.copones = [];
      })
      bulider.addCase(getCopons.fulfilled, (state, action) => {
        state.isLoading = false;
        state.copones = action.payload.copons;
        state.isError = null;
      })
      bulider.addCase(getCopons.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
        state.copones = [];
      })
  },
});

export default products.reducer;
