/* eslint-disable react/prop-types */
// import { TabContainer } from "react-bootstrap";
// import "../Style/HomeSlide.scss";
import Carousel from "react-bootstrap/Carousel";
import SlideInfo from "./SlideInfo";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { PATH_API_FOR_IMG } from "../Helper";
import "../Style/SlideInfo.scss";
import "../Style/HomeSlide.css";
import phone from "../images/phone.png";

function HomeSlide({ data }) {
  const { t } = useTranslation();
  const media = window.matchMedia("(max-width: 991px)");
  return (
    <div className="home-slide">
      <div className="container">
        <div className="slider">
          <Swiper
            modules={[Pagination, Navigation]}
            spaceBetween={40}
            slidesPerView={1}
            loop={true}
            navigation
            pagination={{ clickable: true }}
          >
            {data?.map((el) => {
              console.log("-------------------------------------");
              console.log(el);
              console.log("-------------------------------------");
              return (
                <SwiperSlide key={el.id} className="slide-info">
                  <div className="row slide-x01">
                    <div className="col-lg-6 col-md-12 slide-x02">
                      <div className="text mx-5">
                        <h1 className="slider_head">{el?.title}</h1>
                        <div className="mobile_img">
                          <img src={el?.photo} alt="" />
                        </div>
                        <p
                          className="slider_info"
                          dangerouslySetInnerHTML={{
                            __html:
                              media.matches === true
                                ? el?.description?.slice(0, 30)
                                : el?.description,
                          }}
                        ></p>
                        <Link className="more-info">{t("slider_link")}</Link>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-12 slide-x03">
                      <div className="image">
                        <img src={el?.photo} alt="" />
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </div>
  );
}

export default HomeSlide;
