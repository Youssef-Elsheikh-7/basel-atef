/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faEye } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { PATH_API_FOR_IMG } from "../Helper";
import { Line } from "rc-progress";
import ticket from "../images/ticket.png";
import { useTranslation } from "react-i18next";
import StarsRating from "react-star-rate";

export default function ProductCard({ el, copone }) {
  const { t } = useTranslation();
  // const sizes = el?.size !== null ? (
  //   el?.size?.split(",")?.filter((el) => {
  //   return el !== ","
  // })
  // ) : ()
  const rating = el?.get_review?.map((el) => {
    return el.rate;
  });
  return (
    <div className="col-lg-3 col-md-6 col-sm-12">
      <div className="box ">
        <div className="img">
          <img
            src={`${el?.photo?.split(",")[0]}`}
            alt={el.title}
            loading="lazy"
          />
          <div className="operation">
            <Link
              to={`/store/product/${el?.slug}`}
              onClick={() =>
                scrollTo({
                  top: 0,
                  left: 0,
                })
              }
              className="preview"
            >
              <FontAwesomeIcon icon={faEye} />
            </Link>
          </div>
        </div>
        <div className="box-info">
          <Link className="product_title" to={`/store/product/${el?.slug}`}>
            {el.title}{" "}
          </Link>
          {/* <StarsRating value={Math.round(el?.rating?.rate)} /> */}
          <p className="product_price">
            <span>{el?.price?.split(".")[0]}</span>LE
          </p>
          <StarsRating value={rating} />
          <div className="product_quantity">
            {t("product_quantity_title")} {el?.stock}
          </div>
          <Line
            percent={el?.stock}
            strokeWidth={3}
            trailWidth={4}
            strokeColor={"#ffb61e"}
            className="p-2 w-50"
          />
          <span className={`product_condition ${el?.condition}`}>
            {el?.condition}
          </span>
        </div>
        <div className="product_copone">
          <p>{el.copon}</p>
        </div>
      </div>
    </div>
  );
}
