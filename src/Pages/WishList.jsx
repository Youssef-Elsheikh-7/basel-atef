import { useLayoutEffect, useState } from "react"
import { useTranslation } from "react-i18next";
import { PATH_API_FOR_IMG } from "../Helper";
import "../Style/wish_list.css"
import {Line} from "rc-progress"
import { deleteItem } from "../Redux/Reducers/wishList";
import { useDispatch } from "react-redux";
import axios from "axios";
import { Helmet } from "react-helmet";
import {
    FaShoppingCart,
} from "react-icons/fa";
import {useNavigate} from "react-router-dom"

export default function WishList() {
    const {t, i18n} = useTranslation()
    const user = JSON.parse(localStorage.getItem("user"))
    const [list, setList] = useState();
    useLayoutEffect(() => {
        fetch(`https://moneyservices.store/back/public/api/wishlist?user_id=${user?.user?.id ? user?.user?.id : user?.id}`).then((res) => {
            return res.json()
        }).then((data) => {
            setList(data?.wishlist)
        })
    }, [])
    const navigate = useNavigate()
    const removeItem = async (id) => {

        const res = await axios.get(`https://moneyservices.store/back/public/api/wishlist-delete?user_id=${user?.user?.id ? user?.user?.id : user?.id}&product_id=${id}`)

        location.reload()
    }

    // const deleteItems = async (product_id) => {
    //     const {user} = JSON.parse(localStorage.getItem("user"))
    //     const res = await fetch(`https://moneyservices.store/back/public/api/wishlist-delete?user_id=${user?.id}&product_id=${product_id}`)
    //     console.log(res.status);
    // }
    return (
        <div className="wish_list pt-4">
            <Helmet>
                <title>Wish List</title>
            </Helmet>
            <div className="container">
                <h4 className="list_title">{t("wish_list_title")}</h4>
                <ul>
                    {list?.length === 0 ? (<h4>{t("wish_list_emty")}</h4>): (
                                            list?.map((el) => {
                        return (
                            <li className="list" key={el?.id}>
                                <div className="product_img">
                                    <img className="main_img" src={ el?.product?.photo} alt={el?.product?.title_arabic} />
                                </div>
                                    <div className="product_info pt-4">
                                        <h6 className="product_title">{i18n.language === "en" ? el?.product?.title_english : el?.product?.title_arabic}</h6>
                                        <p className="product_price">{el?.product?.price?.split('.')[0]}LE</p>
                                        <button onClick={() => navigate(`/store/product/${el?.product?.id}/`)} className="add_to_cart">
                                            <h6>{t("add_to_cart")} </h6>
                                            <FaShoppingCart />
                                            </button>
                                    </div>
                                    <div className="product_btn" onClick={() => removeItem(el?.product?.id)}>x</div>
                            </li>
                        )
                    })
                    )}
                </ul>
            </div>
        </div>
    )
}