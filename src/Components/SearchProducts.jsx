import "../Style/Store.scss";
import Mainimg1 from "../images/slidder/slider-image-1.jpeg";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useDispatch, useSelector } from "react-redux";
import { useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";
// import Summry from "../Components/summry";
import ProductStoreCard from "../Components/StoreCard";
import "../Style/products.css";
import { FaList, FaSquare } from "react-icons/fa";
import Pagination from "../Components/Pagination";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { getCopons } from "../Redux/Reducers/Products";
export default function SearchProducts() {
  const [layout, setLayout] = useState(true);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { id } = useParams();
  useLayoutEffect(() => {
    dispatch(getCopons());
  }, []);
  const { data } = useSelector((state) => state.search);
  const { copones } = useSelector((state) => state.products);

  return (
    <div className="search_product">
      <Helmet>
        <title>{id}</title>
      </Helmet>
      <div className="container my-5 store">
        <div className="row d-flex justify-content-between">
          <div className="col-md-3   "></div>
          <div className="col-md-8 ">
            <img src={Mainimg1} alt="" height={300} className="w-100" />
            <div className="store_head">
              <div className="products_length">
                {data?.search?.data
                  ? data?.search?.data?.length + " " + t("store_product_length")
                  : data?.search?.data?.length +
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
              <div className={`${layout === true ? "row" : "content"}`}>
                {data?.search?.data ? (
                  data?.search?.data?.map((el) => {
                    return (
                      <ProductStoreCard
                        el={el}
                        layout={layout}
                        key={el.id}
                        copone={copones}
                      />
                    );
                  })
                ) : data?.search?.data.length === 0 ? (
                  <h2>{t("no_product")}</h2>
                ) : (
                  data?.search?.data?.map((el) => {
                    return (
                      <ProductStoreCard
                        el={el}
                        layout={layout}
                        key={el.id}
                        copone={copones}
                      />
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>
        <Pagination info={data?.search} />
      </div>
    </div>
  );
}
