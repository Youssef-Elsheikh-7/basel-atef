import axios from "axios";
import { useFormik } from "formik";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom/dist/umd/react-router-dom.development";
import { ToastContainer, toast } from "react-toastify";

export default function ForgetPassword() {
    const {t} = useTranslation();
    const navicate = useNavigate()
    const formikObj = useFormik({
        initialValues: {
            email: ""
        },
        validate: (value) => {
            const errors = {};
            if (value.email.length === 0) {
                errors.email = t("required")
            } 
        },
        onSubmit: async (value) => {

            const res = await axios.post(`https://moneyservices.store/back/public/api/sendLink?email=${value?.email}`);
            if (res.status === 200) {
                navicate("/confirm")
            } else {
                toast.error(res.response.data.message)
            }
        }
    })
    return (
        <div className="my-5  bg-light  rounded-3 p-4">
            <Helmet>
                <title>Forget Password</title>
            </Helmet>
            <h2 className="mb-3">{t('login_form_forget')}</h2>
            <form action="" onSubmit={formikObj.handleSubmit}>
                <input type="email" placeholder="info@mail.com" style={{width: "40%", borderColor: "#ddd"}} onChange={formikObj.handleChange} name='email' />
                <button type="submit" style={{backgroundColor: "#ffb61e", borderColor: "#ffb61e", color: "#fff", width: "20%"}}>{t("forget_btn")}</button>
            </form>
            <Link className='btn btn-danger mt-3'  to='/login'>{t("forget_redrect")}</Link>
            <ToastContainer />
        </div>
    )
}