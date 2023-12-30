/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import {Swiper, SwiperSlide} from "swiper/react"
import { Link } from "react-router-dom";
import {Pagination} from "swiper/modules"
import ProductCard from "./ProductCard";
import { PATH_API_FOR_IMG } from "../Helper";
/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faEye } from "@fortawesome/free-solid-svg-icons";
import {motion} from "framer-motion"
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import {Line} from "rc-progress"
import {FaRegHeart, FaEye  } from "react-icons/fa6"
import { useNavigate } from "react-router-dom/dist/umd/react-router-dom.development";


export default function SingleProductSlider({products, copone}) {
  const {t} = useTranslation()
  const navicate = useNavigate()


    return (
    <Swiper
    modules={[Pagination]}
      spaceBetween={50}
      slidesPerView={3}
      loop
      // onSlideChange={() => console.log('slide change')}
      // onSwiper={(swiper) => console.log(swiper)}
    >
        {products?.map((el) => {
          
            return (
                <div
                key={el.id}>
                                    <SwiperSlide >
                          <div className="box ">
                <div className="product">
                  <div className="product_img">
                    <img src={ el?.photo?.split(",")[0]} alt="" />
                    <div className="product_imgs">
                      {el.photo?.split(",")?.map((el, i) => {
                        return (
                          <img key={i} src={el} alt="" />
                        )
                      })}
                    </div>
                  </div>
                  <div className="product_title">
                    <h4 className="product_name">{localStorage.getItem("lng") === "arabic" ? el?.title_arabic : el?.title_english}</h4>
                    <p className="product_price">{el?.price?.split(".")[0]}LE</p>
                  </div>
                  <div className="product_quantity">
                    {t("product_quantity_title")}: {el?.stock}
                    <Line percent={el?.stock} strokeWidth={3} trailWidth={4} strokeColor={'#ffb61e'} className="p-2" />
                  </div>
                  <div className="add_to_watch_list">
                    <FaRegHeart />
                  </div>
                  <div className="watch_details text-center" onClick={() => {
                    navicate(`/store/product/${el.slug}`)
                  }}>
                    {t("latest_products_link")}
                    <FaEye />
                  </div>
                  <div className="product_copone">
                    <p>{copone?.length}</p>
                  </div>
                </div>
      </div>
                </SwiperSlide>
                </div>
            )
        })}
    </Swiper>
    )
}