import { useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPosts } from "../Redux/Reducers/Posts";
import { Swiper, SwiperSlide } from "swiper/react";
import StarsRating from "react-star-rate";
import { Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import { PATH_API_FOR_IMG } from "../Helper";
import { useTranslation } from "react-i18next";
import { HomeApi } from "../Redux/Reducers/Home";
import { Link } from "react-router-dom";
import "../Style/Posts.css";

export default function Posts() {
  const { t } = useTranslation();
  const dispath = useDispatch();
  useLayoutEffect(() => {
    dispath(HomeApi());
  }, []);
  const { data } = useSelector((state) => state.home);
  return (
    <div className="posts">
      <div className="container">
        <h4 className="post_head">{t("post_head")}</h4>
        <Swiper
          modules={[Pagination]}
          loop={true}
          spaceBetween={40}
          slidesPerView={2}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            639: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
        >
          {data?.posts?.map((el) => {
            return (
              <>
                <div className="swiper-button-next" key={el}></div>
                <SwiperSlide className="content d-flex mt-2" key={el?.id}>
                  <div className="post">
                    <div className="img">
                      <img
                        src={`${PATH_API_FOR_IMG}${el?.photo}`}
                        alt={el?.title}
                      />
                    </div>
                    <div className="info">
                      <Link to={`/blog/post/${el.slug}`}>{el?.title}</Link>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: el.summary?.slice(0, 20),
                        }}
                      ></p>
                    </div>
                  </div>
                </SwiperSlide>
                <div className="swiper-button-prev"></div>
              </>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
}
