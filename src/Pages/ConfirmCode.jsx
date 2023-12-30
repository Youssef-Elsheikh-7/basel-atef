import axios from "axios";
import { useFormik } from "formik"
import { m } from "framer-motion";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom/dist/umd/react-router-dom.development";
import { ToastContainer, toast } from "react-toastify";

export default function ConfirmCode() {
    const navigate = useNavigate()
    const SendData =  async (values) => {
            const {email, token} = values
            const res = await axios.get(`https://moneyservices.store/back/public/api/check-code?email=${email}&token=${token}`)

            if (res.status === 200) {
                toast.success(res?.data?.message)
                navigate('/changePassword')
            } else {
                toast.error(res?.data?.message)
            }
        }
    const {t} = useTranslation()
    const formikObj = useFormik({
        initialValues: {
            email: "",
            token: ""
        },
        validate: (values) => {
            const errors = {};
            if (values.token.length === 0) {
                errors.token = t("required")
            }
        },
        onSubmit: async (values) => {
        SendData(values)
        }
    })
    return (
        <div className="confirm my-5  bg-light  rounded-3 p-4">
            <div className="container">
            <Helmet>
                <title>Confirm Password</title>
            </Helmet>
            <h2 className="mb-3">{t('login_form_forget')}</h2>
            <form action="" onSubmit={formikObj.handleSubmit}>
                <div className="form-group">
                    <label className="d-block mb-2" htmlFor="email">{t("confirm_email")}:</label>
                    <input type="email" className='my-2' id="email" style={{width: "40%", borderColor: "#ddd"}} onChange={formikObj.handleChange} value={formikObj.values.email} name='email' />
                </div>
                <div className="form-group">
                    <label className="d-block mb-2" htmlFor="code">{t("confirm_token")}:</label>
                    <input type="number" className='my-2' id="code" style={{width: "40%", borderColor: "#ddd"}} onChange={formikObj.handleChange} value={formikObj.values.token} name='token' />
                </div>
                <button type="submit" style={{backgroundColor: "#ffb61e", borderColor: "#ffb61e", color: "#fff", width: "20%"}}>{t("confirm_btn")}</button>
            </form>
            <Link className='btn btn-danger mt-3'  to='/login'>{t("forget_redrect")}</Link>
            <ToastContainer />
            </div>
        </div>
    )
}