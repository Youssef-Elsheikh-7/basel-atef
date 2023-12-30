import { useFormik } from "formik";
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux";
import { getValue } from "../Redux/Reducers/disconteCode";

export default function DiscountForm({setCode}) {
    const {t} = useTranslation();
    const dispatch = useDispatch()
    const {code} = useSelector((state => state.value))

    const formikObj = useFormik({
        initialValues: {
            code: ''
        },

        onSubmit: (value) => {
            localStorage.setItem("code", value.code)

            dispatch(getValue(value.code))
            setCode(code)
        }
    })
    return (
        <form action="" onSubmit={formikObj.handleSubmit}>
            <input type="text" name="code" onChange={formikObj.handleChange} placeholder={t("cart_discount_input")} />
            {formikObj.errors.code && alert(t("required"))}
            <button type="submit">{t("cart_discount_btn")}</button>
        </form>
    )
}