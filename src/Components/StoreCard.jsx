/* eslint-disable no-unused-vars */
import { FaEye, FaHeart, FaShoppingCart } from "react-icons/fa";
import { PATH_API_FOR_IMG } from "../Helper";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Progress from "./progressBar";
//import { FacebookLogin } from "facebook-login-react";
import { useCart } from "react-use-cart";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Line } from "rc-progress";

/* eslint-disable react/prop-types */
export default function ProductStoreCard({ el, layout, copone }) {
  const [state, setState] = useState(0);
  const [size, serSize] = useState("");
  const { t } = useTranslation();
  const { addItem } = useCart();
  const navicate = useNavigate();
  const thePhoto = el.photo;
  return (
    <div
      className={`${
        layout === true ? "col-lg-4 col-md-6 col-sm-12" : "d-flex"
      }`}
      style={{ width: layout === true ? "" : "80%" }}
    >
      <div className={`store_product mt-4 ${layout === true ? "" : "d-flex"}`}>
        {layout === true ? (
          <>
            <div className="img">
              <img src={thePhoto} alt="test" />
              <div className="operation">
                <Link
                  className="product_preview"
                  to={`/store/product/${el.slug}`}
                >
                  <FaEye />
                </Link>
              </div>
            </div>
            <div className="product_info">
              <h4 className="product_head">{el?.title}</h4>
              <p className="product_price">
                <span>{el?.price.split(".")[0]}</span>
                LE
              </p>
              <div className="product_quantity">
                {t("product_quantity_title")}: {el?.total_stock}
                <Line
                  percent={el?.stock}
                  strokeWidth={3}
                  trailWidth={4}
                  strokeColor={"#ffb61e"}
                  className="p-2"
                />
              </div>
            </div>
            <div className="product_copone">
              <p>{el?.copon}</p>
            </div>
          </>
        ) : (
          <>
            <div className="img">
              <img src={PATH_API_FOR_IMG + el?.photo.split(",")[0]} alt="" />
              {/* <Progress value={el?.stock} /> */}
              <Line
                percent={el?.total_stock}
                strokeWidth={3}
                trailWidth={4}
                strokeColor={"#ffb61e"}
                className="p-2"
              />
            </div>
            <div className="info">
              <h5>{el.title}</h5>
              <p className="product_reviews">
                <Link to={`/store/reviews/${el?.slug}`}>
                  {t("single_product_taps_reviews")}
                </Link>
              </p>
              <p className="product_price">{el?.price.split(".")[0]}$</p>
              <p
                className="product_desc"
                dangerouslySetInnerHTML={{ __html: el.summary }}
              ></p>
              <div className="operation_content">
                <Link to={`/store/product/${el.slug}`} className="add_to_cart">
                  <h6>{t("add_to_cart")}</h6>
                  <FaShoppingCart />
                </Link>
                {/*<div className="add_to_watchlist">
                  <FaHeart />
        </div>*/}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
