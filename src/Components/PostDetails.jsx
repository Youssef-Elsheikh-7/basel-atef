import { useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PATH_API_FOR_IMG } from "../Helper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import { Pagination, Navigation } from "swiper/modules";
import "../Style/Posts.css";

export default function PostDetails() {
  const [blog, setBlog] = useState({});
  const { id } = useParams();

  useLayoutEffect(() => {
    fetch(
      `https://moneyservices.store/back/public/api/blog-detail/${id}?locale=${localStorage.getItem(
        "lng"
      )}`
    )
      .then((res) => {
        return res.json();
      })
      .then((post) => {
        setBlog(post);
      });
    let { post, recent_posts } = blog;
  }, []);
  return (
    <>
      <div className="post_detail">
        <div className="container">
          <div className="img">
            <img src={`${PATH_API_FOR_IMG + blog?.post?.photo}`} alt="" />
          </div>
          <div className="post_info">
            <h4 className="post_title">{blog?.post?.title}</h4>
            <h6 className="post_cate">{blog?.post?.tags}</h6>
            <p
              className="post_desc"
              dangerouslySetInnerHTML={{ __html: blog?.post?.description }}
            ></p>
          </div>
        </div>
      </div>
      <div className="post_slider">
        <Swiper
          modules={[Pagination, Navigation]}
          spaceBetween={50}
          slidesPerView={3}
          loop={true}
        >
          {blog?.recent_posts?.map((el) => {
            return (
              <SwiperSlide key={el.id}>
                <div className="img">
                  <img src={PATH_API_FOR_IMG + el?.photo} alt="" />
                </div>
                <div className="info">
                  <h4 className="slider_title">
                    {localStorage.getItem("lng") === "arabic"
                      ? el?.title_arabic.slice(0, 22)
                      : el?.title_english.slice(0, 22)}
                  </h4>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </>
  );
}
