import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const {user} = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")): ""

export const setWishList = createAsyncThunk(
    "wishlist/setWishlist",
    async(title, {rejectedWithValue}) => {
        try {
            const res = await fetch(`https://moneyservices.store/back/public/api/wishlist/${title}?user_id=${user?.user?.id ? user?.user?.id : user?.id}`)
            const data = await res.json();

            if (res.ok) {
                toast.success(data?.message)
            }
            return data
        } catch (err) {
            return rejectedWithValue(err.message)
        }
    }
)

export const deleteItem = createAsyncThunk(
    'wishlist/deleteItem', 
    async(id, {rejectedWithValue}) => {
                try {
            const res = await fetch(`https://moneyservices.store/back/public/api/wishlist-delete?user_id=${user?.user?.id ? user?.user?.id : user?.id}&product_id=${id}`)
            const data = await res.json();
            if (res.ok) {
                toast.success(data?.message)
            }
            return data
        } catch (err) {
            return rejectedWithValue(err.message)
        }
    }
)


const wishlist = createSlice({
    name: "wishlist",
    initialState: {data: null, isError: null},
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(setWishList.pending, (state) => {
            state.data = null
        }),
        builder.addCase(setWishList.fulfilled, (state, action) => {
            state.data = action.payload
        }),
        builder.addCase(setWishList.rejected, (state, action) => {
            state.data = null;
            state.isError = action.payload
        })
    }
})

export default wishlist.reducer