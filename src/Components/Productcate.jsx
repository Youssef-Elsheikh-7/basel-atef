// /* eslint-disable react/prop-types */
// import { useDispatch, useSelector } from "react-redux";
// import { Filter } from "../Redux/Reducers/Products";
// import { useState } from "react";

// export default function ProductsCate({mainData,cate, active, setcateId, cateId}) {
//   const dispatch = useDispatch()
//   return (
//     <>
//       {cate?.map((el) => {
//         return (
//           <span
//             onClick={(e) => {
//               localStorage.setItem("cate", JSON.stringify(el.slug))
//               setcateId(el?.id)
//               dispatch(Filter())
//             }}
//             key={el?.id}
//             className={`${el?.id === cateId ? "active" : ""} text-capitalize`}
//           >
//             {el.title}
//           </span>
//         );
//       })}
//     </>
//   );
// }
