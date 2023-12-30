import { jwtDecode } from "jwt-decode"
import { useTranslation } from "react-i18next";
import "../Style/reviews.css"
import { useFormik } from "formik";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function AddReviews() {
    const {id} = useParams()
    const {t} = useTranslation()
    const token = localStorage.getItem("user")
    const user = JSON.parse(token)
    const navicgate = useNavigate()
    async function sentData({title, rate}) {
        try {
            const res = await axios.post(`https://moneyservices.store/back/public/api/product/${id}/review?rate=${rate}&user_id=${decode.id}&review=${title}`)
            // const data = await res.json()

            if (res.status === 200) {
                toast.success(res.data.message);

                navicgate(`/store/product/${id}`)
            }
            // return data
        } catch (err) {
            toast.error(err.message)
        }
    }
    const formikObj = useFormik({
        initialValues: {
            title: "",
            rate: "",
        },
        onSubmit: (values) => {

            sentData(values)
        },
        validate: (values) => {
            const error = {};
            if (values.title.length === 0) {
                error.title = t('required');
            }
            if (values.rate.length === 0) {
                error.rate = t('required');
            }
            return error
        }
    })
    return (
        <div className="add_reviews">
            <div className="container">
                                    <form action="" onSubmit={formikObj.handleSubmit}>
            <div>
                <label htmlFor="title">{t("add_reviews_title")}:</label>
                <input type="text" name="title" id="title" onChange={formikObj.handleChange} value={formikObj.values.title} />
                {formikObj.errors.title && (
                <p className="reviews_error">
                    {formikObj.errors.title}
                </p>
                )}
            </div>
            <div>
                <label htmlFor="rate">{t("add_reviews_rate")}:</label>
                <input type="number" name="rate" onChange={formikObj.handleChange} value={formikObj.values.rate} id="rate" />
                {formikObj.errors.rate && (
                <p className="reviews_error">
                    {formikObj.errors.rate}
                </p>
                )}
            </div>
            <button type="submit">{t("add_reviews_btn")}</button>
        </form>
            </div>
            <ToastContainer />
        </div>
    )
}