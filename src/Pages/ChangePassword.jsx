import axios from "axios";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { ToastContainer, toast } from "react-toastify";
import { Helmet } from "react-helmet";
import { useNavigate, Link } from "react-router-dom";

export default function ChangePassword() {
    const {t} = useTranslation();
    const navigate = useNavigate()
    const formikObj = useFormik({
        initialValues: {
            email: "",
            new_password: "",
            new_password_confirmation: ""
        },
        validate: (value) => {
            const errors = {};
            if (value.new_password !== value.new_password_confirmation) {
                errors.password = t("password_matching")
            }
            return errors
        },
        onSubmit: async(values) => {
            const {email, new_password, new_password_confirmation} = values;
            const res = await axios.get(`https://moneyservices.store/back/public/api/new-password?email=${email}&new_password=${new_password}&new_password_confirmation=${new_password_confirmation}`)

            if (res.status === 200) {
                toast.success(res.data.message)
                navigate("/login")
            } else {
                toast.error(res.data.message)
            }
        }
    })
    return (
                    <div className="container">
            <Helmet>
                <title>Change Password</title>
            </Helmet>
            <h2 className="mb-3">{t('login_form_forget')}</h2>
            <form action="" onSubmit={formikObj.handleSubmit}>
                <div className="form-group">
                    <label className="d-block mb-2" htmlFor="email">{t("confirm_email")}:</label>
                    <input type="email" className='my-2' id="email" style={{width: "40%", borderColor: "#ddd"}} onChange={formikObj.handleChange} value={formikObj.values.email} name='email' />
                </div>
                <div className="form-group">
                    <label className="d-block mb-2" htmlFor="new_password">{t("setting_form_new")}:</label>
                    <input type="password" className='my-2' id="new_password" style={{width: "40%", borderColor: "#ddd"}} onChange={formikObj.handleChange} value={formikObj.values.new_password} name='new_password' />
                </div>
                <div className="form-group">
                    <label className="d-block mb-2" htmlFor="new_password_confirmation">{t("setting_form_confirm")}:</label>
                    <input type="password" className='my-2' id="new_password_confirmation" style={{width: "40%", borderColor: "#ddd"}} onChange={formikObj.handleChange} value={formikObj.values.new_password_confirmation} name='new_password_confirmation' />
                </div>
                <button type="submit" style={{backgroundColor: "#ffb61e", borderColor: "#ffb61e", color: "#fff", width: "20%"}}>{t("confirm_btn")}</button>
            </form>
            <Link className='btn btn-danger mt-3'  to='/login'>{t("forget_redrect")}</Link>
            <ToastContainer />
            </div>
    )
}