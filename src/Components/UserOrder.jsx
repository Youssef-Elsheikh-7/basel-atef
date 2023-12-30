import { useLayoutEffect, useState } from "react";
import { PATH_API_FOR_IMG } from "../Helper";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
export default function UserOrder({ order }) {
  const { t } = useTranslation();
  const [detail, setDetial] = useState({});
  const user = JSON.parse(localStorage.getItem("user"));
  useLayoutEffect(() => {
    fetch(
      `https://moneyservices.store/back/public/api/order-show/${order?.code_order}?user_id=${user?.user?.id}`
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setDetial(data);
      });
  });

  return detail?.orders?.map((el) => {
    return (
      <div className="order" key={el.id}>
        <div className="order_title">
          <div className="info">
            <h4 className="order_title">{el?.code_order}</h4>
            <div className="order_area">{el?.area}</div>
          </div>
          <div className="price">{el?.total_amount}LE</div>
        </div>
        <div className="order_content">
          <div className="order_product">
            <img
              src={PATH_API_FOR_IMG + el?.products?.photo?.split(",")[0]}
              alt=""
            />
            <h4 className="product_title">{el?.products?.title_arabic}</h4>
            <h4 className="product_title">
              {el?.products?.price.split(".")[0]}LE
            </h4>
            <div className="add_review">
              <Link to={`/store/product/${el?.id}/review`}>
                {t("single_product_add_review")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  });
}
