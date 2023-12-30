import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import { PATH_API } from "../../Helper";

export const searchProduct = createAsyncThunk(
    'search/searchProduct',
    async (slug, {rejetedWithValue}) => {
        try {
            const res = await fetch(`${PATH_API}search-product?search=${slug}&locale=${localStorage.getItem("lng")}`)
            const data = await res.json()
            return data
        } catch(err) {
            return rejetedWithValue(err.message)
        }
    }
)


const search = createSlice({
    name: 'search',
    initialState: {isLoading: false, data: null, isError: null},
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(searchProduct.pending, (state) => {
            state.isLoading = true;
            state.data = null;
            state.isError = null;
        }
        )
        builder.addCase(searchProduct.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
            state.isError = null;
        })
        builder.addCase(searchProduct.rejected, (state, action) => {
            state.isLoading = false;
            state.data = null;
            state.isError = action.error.message;
        })
    }
})

export default search.reducer