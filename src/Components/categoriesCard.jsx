// import { useLayoutEffect } from "react"
import { useDispatch } from "react-redux"
import { Filter } from "../Redux/Reducers/Products"

/* eslint-disable react/prop-types */
export default function CategoriesCard({el}) {
        const dispatch = useDispatch();
    return (
        <li className="category_title" onClick={() => dispatch(Filter())}>{el?.title}</li>
    )
}