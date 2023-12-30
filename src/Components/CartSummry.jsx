import { useTranslation } from "react-i18next";
import { useCart } from "react-use-cart";
import HomeSlide from "./HomeSlide";
import { useLayoutEffect, useState } from "react";
import Pay from "./Pay";
import Mainimg1 from "../images/imgephone.png"
import CustomSlider from "./CustomSlider";
import { useNavigate } from "react-router-dom/dist/umd/react-router-dom.development";
import { useSelector } from "react-redux";

export default function CartSummry({code}) {
  const { cartTotal } = useCart();
  const { t } = useTranslation();
  const [state, setState] = useState(false);
  const [copone, setCopone] = useState(null)
  const navigate = useNavigate()
  // useLayoutEffect(() => {
  //   fetch(`https://moneyservices.store/back/public/api/check-copoun?code=${localStorage?.getItem("code")}`).then((res) => {
  //     return res.json()
  //   }).then((data) => {
  //     setCopone(data)
  //   })
  //   localStorage.removeItem("code")
  // }, [])



  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-12 box mt-4">

            <div className="cart_details">
              <div className="product_details">
                <h6>{t("cart_summry_product")}</h6>
                <span>{cartTotal} EG</span>
              </div>
             
              <div className="discount_details">
                <h6>{t("cart_summry_discount")}</h6>
                <span>{code?.success ? "Yes" : "No"}</span>
              </div>
              <hr />
              <div className="cart_total">
                <h5>{t("cart_summry_total")}</h5>
                <span>{code?.success ? (<span>{cartTotal * (parseInt((code?.coupon?.value)) / 100)}</span>) : (
                  <span>{cartTotal }</span>)} LE</span>
              </div>
              <button
                onClick={() => {
                  localStorage.getItem("user") ? setState(true) : navigate("/login")
                }}
                className="cart_button"
              >
                {t("cart_summry_btn")}
              </button>
            </div>
            
          </div>
         
          <div className="col-lg-6 col-md-12 box mt-4">
            <CustomSlider />
          </div>
        </div>
       
      </div>
      {state === true ? <Pay /> : ""}
    </>
  );
}
