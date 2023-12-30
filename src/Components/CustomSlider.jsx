import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';
import PhoneImg from "../images/phone.png"
import { useTranslation } from 'react-i18next';

export default function CustomSlider() {
    const {t} = useTranslation()
    return (
            <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={50}
      slidesPerView={1}
      loop={true}
      autoplay
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
    //   style={{backgroundColor: "rgb(255, 182, 30)"}}
      className='p-3 shadow'
    >
      <SwiperSlide>
        <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12">
        <div className="box mt-4">
        <h4 className='fs-3'>{t("custom_slider_head")}</h4>
        <p className='fs-3' style={{color: "#ffb61e"}}>{t("custom_slider_info")}</p>
        </div>
      </div>
      <div className="col-lg-6 col-md-6 col-sm-12">
        <div className="box mt-4">
            <img src={PhoneImg} style={{width: "100px"}} alt="" />
        </div>
      </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12">
        <div className="box mt-4">
        <h4 className='fs-3'>{t("custom_slider_head")}</h4>
        <p className='fs-3' style={{color: "#ffb61e"}}>{t("custom_slider_info")}</p>
        </div>
      </div>
      <div className="col-lg-6 col-md-6 col-sm-12">
        <div className="box mt-4">
            <img src={PhoneImg} style={{width: "100px"}} alt="" />
        </div>
      </div>
        </div>
      </SwiperSlide>
    </Swiper>
    )
}