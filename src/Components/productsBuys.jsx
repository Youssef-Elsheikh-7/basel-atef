/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useTranslation } from "react-i18next";
import ProductCard from "./ProductCard";
// import ProductsCate from "./Productcate";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getProducts } from "../Redux/Reducers/Products";

// export default function ProductsBuys({ dataInfo, cate }) {
//   const dispatch = useDispatch();
//   const { t } = useTranslation();
//   const { data, copones } = useSelector((state) => state.products);
//   const [filterdData,setFilterdData] = useState([data])
//   const [active, setActive] = useState(false);
//   const [cateId, setcateId] = useState(0);

//   return (
//     <div className="buy-products py-4">
//       <div className="container">
//         <div className="head">
//           <h4>{t("product_buy_head")}</h4>
//         </div>
//         <div
//           className="product-cate d-flex justify-content-center p-2 rounded"
//           style={{
//             backgroundColor: "#ffb61e",
//             width: "fit-content",
//             margin: "auto",
//           }}
//         >
//           <span
//             className={`${cateId === 0 ? "active" : ""}`}
//             onClick={(e) => {

//               console.log(filterdData)
//               localStorage.setItem("cate", "");
//               setcateId(0);
//             }}
//           >
//             {t("product_buy_all")}
//           </span>
//           <ProductsCate
//           mainData={data}
//             setcateId={setcateId}
//             cateId={cateId}
//             cate={cate}
//             active={active}
//             setActive={setActive}
//           />
//         </div>
//         <div className="row mt-6">
//           {filterdData?.data
//             ? data?.data?.map((el) => {
//               console.log(data)
//                 return <ProductCard el={el} key={el.id} copone={el.copone} />;
//               })
//             : dataInfo?.map((el) => {
//                 return <ProductCard el={el} key={el.id} copone={el.copone} />;
//               })}
//         </div>
//         <Link className="product-link" to="/store">
//           {t("product_buy_link")}
//         </Link>
//       </div>
//     </div>
//   );
// }

export default function ProductsBuys({ dataInfo, cate }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [active, setActive] = useState(false);
  const [cateId, setcateId] = useState(0);
  const [mainData, setMainData] = useState([]);
  const [filterdmainData, setFilterdmainData] = useState([]);
  const [loader, setLoader] = useState(false);

  let language = window.localStorage.getItem("lng");

  useEffect(() => {
    fetch(`https://moneyservices.store/back/public/api/home?locale=${language}`)
      .then((response) => response.json())
      .then((data) => {
        setMainData(data.featured_products.slice(0, 9));
        setFilterdmainData(data.featured_products);
        setLoader(true);
      })
      .catch((error) => {
        console.error("Error", error);
      });
  }, [language]);

  return (
    <div className="buy-products py-4">
      <div className="container">
        <div className="head">
          <h4>{t("product_buy_head")}</h4>
        </div>
        <div
          className="product-cate d-flex justify-content-center p-2 rounded"
          style={{
            backgroundColor: "#ffb61e",
            width: "fit-content",
            margin: "auto",
          }}
        >
          <span
            className={`${cateId === 0 ? "active" : ""}`}
            onClick={(e) => {
              setFilterdmainData(mainData);
              localStorage.setItem("cate", "");
              setcateId(0);
            }}
          >
            {t("product_buy_all")}
          </span>
          {cate?.map((el) => {
            return (
              <span
                onClick={(e) => {
                  localStorage.setItem("cate", JSON.stringify(el.slug));
                  setcateId(el?.id);
                  setFilterdmainData(
                    mainData.filter((item) => {
                      if (el.slug == item.cat_info.slug) {
                        return item;
                      }
                    })
                  );
                }}
                key={el?.id}
                className={`${
                  el?.id === cateId ? "active" : ""
                } text-capitalize`}
              >
                {el.title}
              </span>
            );
          })}
        </div>
        <div className="row mt-6">
          {filterdmainData?.map((el) => {
            return <ProductCard el={el} key={el.id} copone={el.copone} />;
          })}
        </div>
        <Link className="product-link" to="/store">
          {t("product_buy_link")}
        </Link>
      </div>
    </div>
  );
}

// {dataInfo?.map((el) => {
//   return <ProductCard el={el} key={el.id} copone={el.copone} />;
// })}

// : dataInfo?.map((el) => {
//   return <ProductCard el={el} key={el.id} copone={el.copone} />;
// })}

// <ProductsCate
//           mainData={data}
//             setcateId={setcateId}
//             cateId={cateId}
//             cate={cate}
//             active={active}
//             setActive={setActive}
//           />
