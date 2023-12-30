/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */
import { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { singleProduct } from "../Redux/Reducers/SingleProduct";
import { Helmet } from "react-helmet";
import { PATH_API_FOR_IMG } from "../Helper";
import Progress from "./progressBar";
import "../Style/singleProducts.css";
import { useTranslation } from "react-i18next";
import {
  FaShoppingCart,
  FaHeart,
  FaFacebookF,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";
import ImageZoom from "react-image-zooom";
import { motion } from "framer-motion";
import SingleProductDesc from "./singleProductDesc";
import SingleProductReview from "./singleProductReview";
import SingleProductSlider from "./singleProductsSlider";
import { useCart } from "react-use-cart";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import { Line } from "rc-progress";
import { getCopons } from "../Redux/Reducers/Products";
//import { setWishList } from "../Redux/Reducers/wishList";
import { ToastContainer } from "react-toastify";
import { setWishList } from "../Redux/Reducers/wishList";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

export default function SingleProduct() {
  const { t } = useTranslation();
  const { addItem } = useCart();
  const [size, setSize] = useState("nullnull");
  const { id } = useParams();
  let [state, setState] = useState(1);

  let [hide, setHide] = useState(false);
  const [img, setImg] = useState(null);
  const [color, setColor] = useState("null");
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    dispatch(singleProduct(id));
    dispatch(getCopons());
  }, [dispatch, id]);
  const { data } = useSelector((state) => state.singleProduct);
  console.log("------------------53453--------------");
  console.log(data);
  console.log("------------------53453--------------");

  const { copones } = useSelector((state) => state.products);
  const navicate = useNavigate();
  const changeImg = (img) => {
    setImg(img);
  };

  let language = window.localStorage.getItem("lng");
  const [productData, setProductData] = useState();

  useEffect(() => {
    fetch(`https://moneyservices.store/back/public/api/home?locale=${language}`)
      .then((response) => response.json())
      .then((data) => {
        setProductData(data?.featured_products);
      });
  }, [language]);

  return (
    <>
      <Helmet>
        <title>{id}</title>
        <menu name="description" content={`${id} product`} />
      </Helmet>
      <div className="single_product">
        <div className="container">
          <div className="product_image">
            <img
              src={img === null ? data?.product_detail?.photo[1] : img}
              alt={data?.product_detail?.title}
            />
            <div className="slider_img">
              {data?.product_detail?.photo?.map((el) => {
                return (
                  <img
                    onClick={() => changeImg(el)}
                    src={el}
                    alt=""
                    key={Math.random() * 4}
                  />
                );
              })}
            </div>
          </div>
          <div className="product_info">
            <h4 className="product_title">{data?.product_detail?.title}</h4>
            <div className="product_review">
              <h4 className="product_review_head">
                {t("single_product_taps_reviews")} (
                {data?.product_detail?.get_review?.length})
              </h4>
            </div>
            <div className="product_content">
              <p className="product_price" style={{ color: "#ffb61e" }}>
                {data?.product_detail?.price?.split(".")[0]}LE
              </p>
              <div className="product_limit">
                <span>
                  {t("product_quantity_title")} {data?.product_detail?.stock}
                </span>
                <Line
                  percent={data?.product_detail?.stock}
                  strokeWidth={3}
                  trailWidth={4}
                  strokeColor={"#ffb61e"}
                  className="p-2"
                />
              </div>
              <ul>
                <li className="product_status">
                  <h6 className="head">{t("single_product_status")}:</h6>
                  {data?.product_detail?.stock === "0"
                    ? t("single_product_status_value_two")
                    : t("single_product_status_value_one")}
                </li>
                <li className="product_cat">
                  <h6 className="head">{t("single_product_cat")}:</h6>
                  {data?.product_detail?.cat_info?.slug}
                </li>
              </ul>
              <hr />
              <ul>
                <li className="select_size">
                  <h6 className="head">{t("single_product_select_size")}:</h6>
                  <select
                    name=""
                    id=""
                    onChange={(e) => setSize(e.target.value)}
                  >
                    {data?.product_detail?.size?.map((el) => {
                      return (
                        <option value={el} key={Math.random() * 4}>
                          {el}
                        </option>
                      );
                    })}
                  </select>
                </li>
                {data?.product_detail?.color_id !== null && (
                  <li className="color_list">
                    <h6 className="head">{t("sngle_prodict_color_head")}:</h6>
                    {data?.product_detail?.color_id?.map((el, i) => {
                      return (
                        <div
                          className="color_item"
                          onClick={() => {
                            setColor(el);
                          }}
                          key={i}
                          style={{ backgroundColor: el }}
                        ></div>
                      );
                    })}
                  </li>
                )}
              </ul>
            </div>
            <div className="product_operation">
              <div className="length">
                <button
                  className="length_increment"
                  onClick={() => {
                    setState((state = state + 1));
                    state < 0 && setState(1);
                  }}
                >
                  +
                </button>
                <span className="length_value">{state}</span>
                <button
                  className="length_decrement"
                  onClick={() => {
                    setState((state = state - 1));
                    state === -1 ? setState(1) : setState(1);
                  }}
                >
                  -
                </button>
              </div>
              <div className="operation_content">
                <button
                  onClick={() => {
                    if (size === "null" && color === "null") {
                      alert(t("single_product_alert"));
                    } else {
                      addItem(
                        {
                          ...data?.product_detail,
                          product_size: size,
                          product_color: color,

                          data,
                        },
                        state
                      );
                      navicate("/cart");
                    }
                  }}
                  className="add_to_cart"
                >
                  <h6>{t("add_to_cart")}</h6>
                  <FaShoppingCart />
                </button>
                {/*<div className="add_to_watchlist"
                onClick={() => {
                    dispatch(setWishList(data?.product_detail?.slug))
                }}
                >
                  <FaHeart />
              </div>*/}
              </div>
            </div>
            <hr />
          </div>
          <div className="slider">
            <Swiper
              modules={[Pagination]}
              slidesPerView={1}
              spaceBetween={0}
              pagination={{ clickable: true }}
              loop={true}
            >
              {data?.product_detail?.rel_prods?.map((el) => {
                return (
                  <SwiperSlide key={el?.id}>
                    <div className="img border-bottom">
                      <img src={el?.photo} alt="" />
                    </div>
                    <div className="info text-center mt-2">
                      <h6>
                        {localStorage.getItem("lng") === "arabic"
                          ? el?.title_arabic
                          : el?.title_english}
                      </h6>
                      <p className="price fs-4" style={{ color: "#ffb61e" }}>
                        {el?.price?.split(".")[0]}LE
                      </p>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>
        <div className="content">
          <div className="container">
            <div className="product_share">
              <FacebookShareButton
                url={`${location.href}`}
                quote={"hey let's go"}
                hashtag={data?.product_detail?.cat_info?.title}
                className="facebook_share"
              >
                {t("single_product_facebook_share")}
                <FaFacebookF />
              </FacebookShareButton>
              <TwitterShareButton
                url={`${location.href}`}
                quote={"hey let's go"}
                hashtag={data?.product_detail?.cat_info?.title}
                className="twitter_share"
              >
                {t("single_product_twitter_share")}
                <FaTwitter />
              </TwitterShareButton>
              <WhatsappShareButton
                url={`${location.href}`}
                quote={"hey let's go"}
                hashtag={data?.product_detail?.cat_info?.title}
                className="whatsapp_share"
              >
                {t("single_product_whats_share")}
                <FaWhatsapp />
              </WhatsappShareButton>
            </div>
            <div className="product_taps">
              <div className="product_taps_head">
                <div
                  className={`taps_products ${hide === false && "active"}`}
                  onClick={() => setHide(false)}
                >
                  <h6>{t("single_product_taps_information")}</h6>
                </div>
                <div
                  className={`taps_reviews ${hide === true && "active"}`}
                  onClick={() => setHide(true)}
                >
                  <h6>
                    {t("single_product_taps_reviews")} (
                    {data?.product_detail?.get_review?.length})
                  </h6>
                </div>
              </div>
              <div className="product_tap_content">
                {hide === false ? (
                  <SingleProductDesc desc={data?.product_detail?.description} />
                ) : (
                  <SingleProductReview
                    reviews={data.product_detail?.get_review}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="similar_products">
          <div className="container">
            <div className="similar_product_head">
              <h6>{t("single_product_similar_products_head")}</h6>
            </div>
            <SingleProductSlider
              products={data?.product_detail?.rel_prods}
              copone={copones}
            />
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}
