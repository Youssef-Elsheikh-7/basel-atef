/* eslint-disable react/prop-types */
import  { useLayoutEffect, useState } from "react";
import { Paginator } from 'primereact/paginator';
import { useDispatch, useSelector } from "react-redux";
import { Filter, getProducts } from "../Redux/Reducers/Products";
import Pagination from '@mui/material/Pagination';

export default function Paginate({info}) {
        const [page, setPage] = useState(1);
    const [rows, setRows] = useState(1);
    const dispatch = useDispatch()
    // useLayoutEffect(() => {
    //     dispatch(getProducts())
    // }, [])
    const handleClick = (e, value) => {
        JSON.stringify(localStorage.setItem("page", value))
        dispatch(Filter())
        setPage(value);
    }
    const {paginate} = useSelector((state) => state.products)


    return (
        <div className="card">
            <Pagination page={page} count={paginate !== null && paginate?.per_page} onChange={ handleClick} shape="rounded" />
        </div>
    );
}