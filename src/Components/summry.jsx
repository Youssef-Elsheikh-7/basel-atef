// import { useLayoutEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import { getCategories } from "../Redux/Reducers/categories";
// import CategoriesCard from "./categoriesCard";
// import { filterProductByPrice, Filter } from "../Redux/Reducers/Products";
// import { t } from "i18next";

// export default function Summry() {
//   const [cate, setCate] = useState("");
//   const [price, setPrice] = useState(0);
//   const [brand, setBrand] = useState([]);
//   const [active, setActive] = useState(1);
//   const [color, setColor] = useState([]);
//   const [colorActive, setColorActive] = useState("");
//   const dispatch = useDispatch();
//   useLayoutEffect(() => {
//     dispatch(getCategories());
//     fetch(
//       `https://moneyservices.store/back/public/api/brands?locale=${localStorage.getItem(
//         "lng"
//       )}`
//     )
//       .then((res) => {
//         return res.json();
//       })
//       .then((data) => {
//         setBrand(data?.brand);
//       });
//     fetch("https://moneyservices.store/back/public/api/colors")
//       .then((el) => {
//         return el.json();
//       })
//       .then((data) => {
//         setColor(data.color);
//       });
//   }, []);

//   const { data } = useSelector((state) => state.categories);

//   return (
//     <div className="summry">
//       <div className="bg-light p-1">
//         <h4>{t("store_summry_cate")}</h4>
//         <ul>
//           {data?.category?.map((el) => {
//             return (
//               <li
//                 className={`category_title `}
//                 style={{ color: cate === el.id ? "#ffb61e" : "" }}
//                 key={el.id}
//                 onClick={() => {
//                   localStorage.setItem("cate", JSON.stringify(el.slug));
//                   // dispatch(Filter());
//                   setCate(el.id);
//                   setFilterdmainData(
//                     mainData.filter((item) => {
//                       if (el.slug == item.cat_info.slug) {
//                         return item;
//                       }
//                     })
//                   );
//                 }}
//               >
//                 {el?.title}
//               </li>
//             );
//           })}
//         </ul>
//       </div>

//       <div className="bg-light my-4 p-3">
//         <label htmlFor="customRange1" className="form-label ">
//           <h5 className="fw-bolder ">{t("store_summry_price_head")}</h5>
//           <div className="d-flex">
//             <div className="price_info">
//               <h6>الحدود: </h6>
//               <h6>0 - {price}$</h6>
//             </div>
//           </div>
//         </label>
//         <input
//           type="range"
//           className="form-range"
//           id="customRange1"
//           min="0"
//           max="40000"
//           step="10"
//           onChange={(e) => {
//             dispatch(Filter());
//             localStorage.setItem("price", JSON.stringify(e.target.value));
//             setPrice(e.target.value);
//           }}
//         />
//       </div>
//       <div className="bg-light p-3 color">
//         <ul>
//           {color?.map((el) => {
//             return (
//               <li
//                 className={`${colorActive === el?.id && "active"}`}
//                 key={el.id}
//                 style={{ backgroundColor: el?.color_hex }}
//                 data-color={el?.color_hex}
//                 onClick={() => {
//                   localStorage.setItem("color", JSON.stringify(el?.color_hex));
//                   dispatch(Filter());
//                   setColorActive(el?.id);
//                 }}
//               ></li>
//             );
//           })}
//         </ul>
//       </div>
//       <div className="bg-light p-3">
//         <h4>{t("store_summry_brand")}</h4>
//         <ul>
//           {brand?.map((el) => {
//             return (
//               <li
//                 className={`brand_title `}
//                 style={{ color: active === el?.id ? "#ffb61e" : "" }}
//                 onClick={() => {
//                   setActive(el?.id);
//                   localStorage.setItem("brand", JSON.stringify(el?.slug));
//                   dispatch(Filter());
//                 }}
//                 key={el?.id}
//               >
//                 {el?.title}
//               </li>
//             );
//           })}
//         </ul>
//       </div>
//     </div>
//   );
// }
