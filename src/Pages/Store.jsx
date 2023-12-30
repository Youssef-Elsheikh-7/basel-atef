/* eslint-disable react/jsx-key */

import "../Style/Store.scss";
// import Mainimg1 from "../images/slidder/slider-image-1.jpeg";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { getCopons, getProducts } from "../Redux/Reducers/Products";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";
// import Summry from "../Components/summry";
import ProductStoreCard from "../Components/StoreCard";
import "../Style/products.css";
import { FaList, FaSquare } from "react-icons/fa";
import Paginate from "../Components/Pagination";
import { Helmet } from "react-helmet";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";
import image from "../images/phone.png";
import HomeSearch from "../Components/HomeSearch";

import { Link, json } from "react-router-dom";
import { getCategories } from "../Redux/Reducers/categories";
// import CategoriesCard from "./categoriesCard";
import { filterProductByPrice, Filter } from "../Redux/Reducers/Products";
import { t } from "i18next";
import ReactSlider from "react-slider";
import "../Style/inputRangeduble.scss";

export default function Store() {
  const [layout, setLayout] = useState(true);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    dispatch(getProducts());
    dispatch(getCopons());
  }, []);
  // const { dataall, copones } = useSelector((state) => state?.products);

  const [mainData, setMainData] = useState([]);
  const [filterdmainData, setFilterdmainData] = useState([]);
  const [theData, setTheData] = useState();
  // const [categoryData, setCategoryData] = useState([]);
  // const [priceData, setPriceData] = useState([]);
  // const [colorData, setColorData] = useState([]);
  // const [brandData, setBrandData] = useState([]);
  let language = window.localStorage.getItem("lng");
  useEffect(() => {
    fetch(`https://moneyservices.store/back/public/api/home?locale=${language}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(
          "-------------------------&&&&&&----------------------------"
        );
        console.log(data?.featured_products);
        console.log("-----------------------------------------------------");
        setTheData(data);
        setMainData(data.featured_products);
        setFilterdmainData(data.featured_products);
        // setCategoryData(data.featured_products);
        // setPriceData(data.featured_products);
        // setColorData(data.featured_products);
        // setBrandData(data.featured_products);
        // setFilterdmainData([...categoryData, ...priceData, ...colorData]);
      })
      .catch((error) => {
        console.error("Error", error);
      });
  }, [language]);

  const [cate, setCate] = useState("");
  const [price1, setPrice1] = useState(0);
  const [price2, setPrice2] = useState(0);
  const [brand, setBrand] = useState([]);
  const [active, setActive] = useState(1);
  const [color, setColor] = useState([]);
  const [colorActive, setColorActive] = useState("");
  useLayoutEffect(() => {
    dispatch(getCategories());
    fetch(
      `https://moneyservices.store/back/public/api/brands?locale=${localStorage.getItem(
        "lng"
      )}`
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setBrand(data?.brand);
      });
    fetch("https://moneyservices.store/back/public/api/colors")
      .then((el) => {
        return el.json();
      })
      .then((data) => {
        setColor(data.color);
      });
  }, []);

  const [catData, setCatData] = useState();
  const [productData, setProductData] = useState();

  useEffect(() => {
    fetch(`https://moneyservices.store/back/public/api/home?locale=${language}`)
      .then((response) => response.json())
      .then((data) => {
        setCatData(data?.categories);
        setProductData(data?.featured_products);
      });
  }, [language]);

  return (
    <>
      <Helmet>
        <title>Store</title>
      </Helmet>
      <div className="container my-5 store">
        <div className="store_slider">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={50}
            slidesPerView={1}
            loop={true}
            autoplay
            navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            className="p-3"
          >
            {[
              {
                id: 1,
                title: t("custom_slider_head"),
                info: t("custom_slider_info"),
                img: "phone.png",
              },
              {
                id: 2,
                title: t("custom_slider_head"),
                info: t("custom_slider_info"),
                img: "phone.png",
              },
            ].map((el) => {
              return (
                <SwiperSlide key={el.id}>
                  <div className="container">
                    <div className="row" key={el.id}>
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="box mt-4">
                          <h4 className="fs-3 slider_head">{el.title}</h4>
                          <p className="fs-3 slider_info">{el.info}</p>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="box img mt-4">
                          <img src={image} alt="" />
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
        <div className="row d-flex justify-content-between">
          <div className="col-md-3   ">
            {
              <div className="summry">
                <div className="bg-light p-1">
                  <h4>{t("store_summry_cate")}</h4>
                  <ul>
                    <li
                      className={`category_title `}
                      key={324}
                      onClick={() => {
                        setFilterdmainData(mainData);
                      }}
                    >
                      {t("product_buy_all")}
                    </li>
                    {catData?.map((el) => {
                      return (
                        <>
                          <li
                            className={`category_title `}
                            style={{ color: cate === el.id ? "#ffb61e" : "" }}
                            key={el.id}
                            onClick={() => {
                              localStorage.setItem(
                                "cate",
                                JSON.stringify(el.slug)
                              );
                              setCate(el.id);
                              setFilterdmainData(
                                mainData.filter((item) => {
                                  if (el.slug == item.cat_info.slug) {
                                    return item;
                                  }
                                })
                              );
                            }}
                          >
                            {el?.title}
                          </li>
                        </>
                      );
                    })}
                  </ul>
                </div>

                <div className="bg-light my-4 p-3">
                  <label htmlFor="customRange1" className="form-label ">
                    <h5 className="fw-bolder ">
                      {t("store_summry_price_head")}
                    </h5>
                    <div className="d-flex">
                      <div className="price_info">
                        <h6>
                          {language === "arabic" ? "الحدود : " : "Range : "}
                        </h6>
                        <h6>
                          {price1} - {price2} L.E
                        </h6>
                      </div>
                    </div>
                  </label>
                  {/*<input
                    type="range"
                    className="form-range"
                    id="customRange1"
                    min="0"
                    max="40000"
                    step="10"
                    onChange={(e) => {
                      // dispatch(Filter());
                      localStorage.setItem(
                        "price",
                        JSON.stringify(e.target.value)
                      );
                      setPrice(e.target.value);
                      setFilterdmainData(
                        mainData.filter((ite) => {
                          return +ite.price >= e.target.value;
                        })
                      );
                    }}
                  />*/}

                  <ReactSlider
                    className="horizontal-slider"
                    thumbClassName="example-thumb"
                    trackClassName="example-track"
                    defaultValue={[20, 50000]}
                    min={20}
                    max={50000}
                    ariaLabel={["Lower thumb", "Upper thumb"]}
                    ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
                    renderThumb={(props, state) => (
                      <div {...props}>{state.valueNow}</div>
                    )}
                    pearling
                    onAfterChange={(value) => {
                      dispatch(Filter());
                      localStorage.setItem("price", JSON.stringify(value));
                      setPrice1(value[0]);
                      setPrice2(value[1]);
                      setFilterdmainData(
                        mainData.filter((ite) => {
                          return (
                            +ite.price >= value[0] && +ite.price <= value[1]
                          );
                        })
                      );
                    }}
                    minDistance={10}
                  />
                </div>

                {}
                <div className="bg-light p-3 color">
                  <ul>
                    {color?.map((el) => {
                      return (
                        <li
                          className={`${colorActive === el?.id && "active"}`}
                          key={el.id}
                          style={{ backgroundColor: el?.color_hex }}
                          data-color={el?.color_hex}
                          onClick={() => {
                            localStorage.setItem(
                              "color",
                              JSON.stringify(el?.color_hex)
                            );
                            // dispatch(Filter());
                            setColorActive(el?.id);
                            setFilterdmainData(
                              mainData.filter((element) => {
                                if (element.color_id !== null) {
                                  return element.color_id[0] == el?.color_hex;
                                }
                              })
                            );
                          }}
                        ></li>
                      );
                    })}
                  </ul>
                </div>
                <div className="bg-light p-3">
                  <h4>{t("store_summry_brand")}</h4>
                  <ul>
                    {brand?.map((el) => {
                      return (
                        <li
                          className={`brand_title `}
                          style={{ color: active === el?.id ? "#ffb61e" : "" }}
                          onClick={() => {
                            setFilterdmainData(
                              mainData.filter((brand) => {
                                return brand.brand_id == el?.id;
                              })
                            );
                            setActive(el?.id);
                            localStorage.setItem(
                              "brand",
                              JSON.stringify(el?.slug)
                            );
                            dispatch(Filter());
                          }}
                          key={el?.id}
                        >
                          {el?.title}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            }
          </div>
          <div className="col-md-8 ">
            <div className="store_head">
              <div className="products_length">
                {filterdmainData
                  ? filterdmainData?.length + " " + t("store_product_length")
                  : filterdmainData?.products?.theData?.length +
                    " " +
                    t("store_product_length")}
              </div>
              <div className="product_operation">
                <button onClick={() => setLayout(false)}>
                  <FaList />
                </button>
                <button onClick={() => setLayout(true)}>
                  <FaSquare />
                </button>
              </div>
            </div>
            <div className="container">
              <div className={`${layout === true ? "row" : "grid"}`}>
                {filterdmainData?.map((el) => {
                  return (
                    <ProductStoreCard el={el} layout={layout} key={el.id} />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <HomeSearch />
        <Paginate />
      </div>
    </>
  );
}
