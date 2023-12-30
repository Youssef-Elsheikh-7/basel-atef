import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { useCart } from "react-use-cart";
import { firstStep } from "./Paymob";
import { first } from "./Payment";
//import{four} from "./Payment";
import React from "react";
import * as Yup from "yup";
//import { AuthContext } from "../Context/authContext";
//import { useAuth } from "../Context/authContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom/dist/umd/react-router-dom.development";

export default function Pay() {
  const { t } = useTranslation();
  const { items, cartTotal } = useCart();
  const products = items.map((item) => ({
    product_id: item.id,
    quantity: item.quantity,
    color: item.product_color,
    size: item.product_size,
  }));

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.user.id;
  //console.log(userId)
  //console.log( user);

  //const { authData } = useAuth();
  //  const {Ttoken} = useContext(AuthContext)
  //  console.log(Ttoken)

  //   useEffect(() => {

  //   async function fetchPaymentId() {
  //      try {
  //        //const token =useAuth;
  //        const Id = await four(token);
  //        console.log(Id);
  //      } catch (error) {
  //        console.error(error);
  //      }
  //    }

  //    fetchPaymentId();

  //  }, []);

  const goHome = useNavigate();

  const formPay = async (values) => {
    try {
      const { data } = await axios.post(
        "https://moneyservices.store/back/public/api/order-cart",
        values
      );
      // console.log("Submission successful:", data);
      // console.log(JSON.stringify(values));
      Swal.fire({
        title: "Good job!",
        text: "Order Confirmed Successfully",
        icon: "success",
        preConfirm: () => {
          goHome("/");
        },
      });
      // formik.resetForm();
    } catch (error) {
      Swal.fire({
        title: "Opps!",
        text: "Something Is Wrong Pleas Try Again!",
        icon: "error",
      });
      // console.error("Submission error:", error);
      // console.log(JSON.stringify(values));
    }
    // console.log(JSON.stringify(values));
  };

  const [payment_status, setSelectedOption] = useState(""); // حالة لتخزين الاختيار الحالي
  const handleOptionChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    formik.setValues({
      ...formik.values,
      payment_status: selectedValue,
    });
    // استدعاء الوظيفة المرتبطة بالاختيار
    switch (selectedValue) {
      case "card":
        // اتصل بالوظيفة المرتبطة بالاختيار 1
        firstStep();
        break;
      case "kiosk":
        // اتصل بالوظيفة المرتبطة بالاختيار 2
        first();
        break;
      default:
        break;
    }
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    phone: Yup.string().required("Phone is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    area: Yup.string().required("city is required"),
  });

  let faweryId = JSON.parse(localStorage.getItem("fawryid"));
  const formik = useFormik({
    initialValues: {
      governorate_id: "",
      name: "",
      phone: "",
      email: "",
      area: "",
      payment_status: "",
      shipping: "",
      products: products,
      user_id: userId,
      ref_num: faweryId,
      total_amount: "0",
    },
    onSubmit: (values) => {
      formPay(values);
    },
    validationSchema: validationSchema,
  });

  const handleSubmit = (values) => {
    formPay(values);
  };
  const calculateTotalAmount = (shippingCa, cartTotal) => {
    const shippingCash = parseFloat(shippingCa || 0);
    const total = parseFloat(cartTotal || 0);

    return (shippingCash + total).toString();
  };

  const [governorates, setGovernorates] = useState([]);
  const [selectedGovernorate, setSelectedGovernorate] = useState("");
  const [shippingCash, setShippingCash] = useState("");

  const handleGovernorateChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedGovernorate(selectedValue);
    setShippingCash(selectedValue);
    const selectedGovernorateData = governorates.find(
      (governorate) => governorate.id === parseInt(selectedValue, 10)
    );
    formik.setValues({
      ...formik.values,
      governorate_id: selectedValue,
      shipping: selectedGovernorateData.price,
      shippingC: selectedGovernorateData.shipping_cash,
    });
    console.log("ShippingC:", selectedGovernorateData.shipping_cash);
  };

  useEffect(() => {
    if (formik.values.payment_status === "cash") {
      formik.setValues({
        ...formik.values,
        total_amount: calculateTotalAmount(formik.values.shippingC, cartTotal),
      });
    } else {
      formik.setValues({
        ...formik.values,
        total_amount: cartTotal.toString(),
      });
    }
  }, [formik.values.payment_status, formik.values.shippingC, cartTotal]);

  useEffect(() => {
    // استرجاع بيانات المحافظات من الAPI
    axios
      .get("https://moneyservices.store/back/public/api/shipping?locale=arabic")
      .then((response) => {
        setGovernorates(response.data);
        setGovernorates(response.data.shippings);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  const [isModalOpen, setModalOpen] = useState(true);
  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <>
      {isModalOpen && (
        <div className="overly">
          <div className="box w-50">
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={handleModalClose}
            ></button>
            <form onSubmit={formik.handleSubmit}>
              <div>
                <div className="form_control ">
                  <label htmlFor="governorate" className="w-100">
                    {t("cart_pay_gover")}
                  </label>
                  <div className="d-flex align-items-between">
                    <select
                      id="governorate"
                      name="governorate"
                      onChange={(e) => {
                        handleGovernorateChange(e);
                        formik.handleChange(e);
                      }}
                      value={selectedGovernorate}
                    >
                      <option value="" disabled>
                        {t("cart_pay_gover")}
                      </option>
                      {Array.isArray(governorates) ? (
                        governorates.map((governorate) => (
                          <option key={governorate.id} value={governorate.id}>
                            {governorate.governorate}
                          </option>
                        ))
                      ) : (
                        <option value="">اي حاجه</option>
                      )}
                    </select>
                    {selectedGovernorate && (
                      <div className="ml-2 p-2 ">
                        {t("Shipping Cost")}:{" "}
                        {
                          governorates.find(
                            (g) => g.id === parseInt(selectedGovernorate)
                          ).price
                        }
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="form_control">
                <label htmlFor="area">{t("cart_pay_city")}</label>

                <input
                  type="text"
                  id="area"
                  name="area"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.area}
                />
                {formik.errors.area && formik.touched.area ? (
                  <div
                    className="alert alert-danger"
                    style={{ maxHeight: "40px" }}
                  >
                    {formik.errors.area}
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="form_control">
                <label htmlFor="name">{t("cart_pay_name")}</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                />
                {formik.errors.name && formik.touched.name ? (
                  <div
                    className="alert alert-danger"
                    style={{ maxHeight: "40px" }}
                  >
                    {formik.errors.name}
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="form_control">
                <label htmlFor="uEmail">{t("cart_pay_email")}</label>
                <input
                  type="email"
                  id="uEmail"
                  name="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
                {formik.errors.email && formik.touched.email ? (
                  <div
                    className="alert alert-danger"
                    style={{ maxHeight: "40px" }}
                  >
                    {formik.errors.email}
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="form_control">
                <label htmlFor="phone">{t("cart_pay_phone")}</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.phone}
                />
                {formik.errors.phone && formik.touched.phone ? (
                  <label
                    className="alert alert-danger "
                    style={{ maxHeight: "40px" }}
                  >
                    {formik.errors.phone}
                  </label>
                ) : (
                  ""
                )}
              </div>
              <div className="pay_operation">
                <label className="text-black  " htmlFor="payment_status">
                  <select
                    id="payment_status"
                    value={payment_status}
                    onChange={handleOptionChange}
                  >
                    <option value="payment_status" disabled>
                      {t("cart_pay_choose")}
                    </option>
                    <option value="card">{t("cart_pay_credit")}</option>
                    <option value="kiosk">{t("cart_pay_money")}</option>
                    <option value="cash">{t("cart_pay_cash")}</option>
                  </select>
                </label>
              </div>
              <button
                className="btn bg-warning w-100 mt-3"
                type="submit"
                onClick={() => {
                  handleSubmit(formik.values);
                }}
              >
                {t("cart_pay_submit")}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
