/* eslint-disable react/prop-types */
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { searchProduct } from "../Redux/Reducers/ProductsSearch";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

export default function CustomSearch({ setSearch }) {
  const dispatch = useDispatch();
  const navicate = useNavigate()
  const formikObj = useFormik({
    initialValues: {
      "search": ""
    },
    onSubmit: (values) => {
      dispatch(searchProduct(values.search))
      navicate(`/store/product-search/${values.search}/`)
      setSearch(false)
                document.body.style.overflow = "auto";  
    }
  })
  const { t } = useTranslation();
  return (
    <div className="custom-search">
      <form action="" onSubmit={formikObj.handleSubmit}>
        <input type="search" placeholder="Search..." name="search" value={formikObj.values.search} onChange={formikObj.handleChange} />
        <button className="" type="submit">
          {t("search_btn")}
        </button>
      </form>
      <div
        onClick={() => {
          setSearch(false);
          document.body.style.overflow = "auto";
        }}
        className="close-btn"
      >
        x
      </div>
    </div>
  );
}
