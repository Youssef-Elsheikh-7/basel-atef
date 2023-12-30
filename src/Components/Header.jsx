import logo from "../images/L3.3.png";
import "../Style/Header.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import faUser from "../assets/man.png";
// import { arabic } from "../images/arabic.png";
// import { english } from "../images/english.png";
import {
  faSearch,
  faShoppingBag,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
import { useLayoutEffect, useState } from "react";
import CustomSearch from "./CustomSearch";
import { motion } from "framer-motion";
import { tokenContext } from "../Context/tokenContext";
import { useContext } from "react";
import { useCart } from "react-use-cart";
import ProfleImg from "../images/profile_img.webp";
import CartImg from "../images/cart.png";
function Header() {
  let { token, setToken } = useContext(tokenContext);
  let navigate = useNavigate();
  function logOut() {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/");
    localStorage.removeItem("user");
  }
  const { totalItems } = useCart();
  const [search, setSearch] = useState(false);
  const [state, setState] = useState(false);
  const { t, i18n } = useTranslation();
  const [info, setInfo] = useState({});
  const user = JSON.parse(localStorage.getItem("user"));
  useLayoutEffect(() => {
    fetch(
      `https://moneyservices.store/back/public/api/profile-user?user_id=${
        user?.user?.id ? user?.user?.id : user?.id
      }`
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setInfo(data?.profile);
      });
  }, []);
  return (
    <>
      <div className="header py-3 ">
        <div className="container d-flex justify-content-between align-items-center">
          <Link to={"/"}>
            <div className="logo cust-logo">
              <img src={logo} alt="" className="i-logo " />
              <span>{t("logo")}</span>
            </div>
          </Link>
          <div className="links">
            <NavLink className="me-2 nav-links" to="/">
              {t("header_link_home")}
            </NavLink>
            <NavLink className="me-2 nav-links" to="/store">
              {t("header_link_shop")}
            </NavLink>
            <NavLink className="me-2 nav-links" to="/blog">
              {t("header_link_blog")}
            </NavLink>
            <NavLink className="me-2 nav-links" to="/about-us">
              {t("header_link_about")}
            </NavLink>
            <NavLink className="me-2 nav-links" to="/contact">
              {t("header_link_contact")}
            </NavLink>
          </div>
          <div className="operation">
            <div
              className="search"
              onClick={() => {
                setSearch(true);
                setState(false);
                document.body.style.overflow = "hidden";
              }}
            >
              <FontAwesomeIcon icon={faSearch} />
            </div>
            <select
              name=""
              id=""
              onChange={(e) => {
                i18n.changeLanguage(e.target.value);
                localStorage.setItem("lng", e.target.value);
              }}
              className="bg-transparent mx-2 d-flex lan_select"
              style={{ border: "none" }}
            >
              <option value="arabic">AR </option>

              <option value="english">EN</option>
            </select>
            <Link to={"/cart"} className="cart-item">
              <span className="cart_total">{totalItems}</span>
              {t("header_cart_item")}
              <img
                src={CartImg}
                style={{
                  margin:
                    i18n.language === "en" ? "0 2px 0 6px" : "0 6px 0 2px",
                }}
                alt=""
              />
            </Link>
            {localStorage.getItem("user") ? (
              <div className="user_account">
                <button
                  className=" dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img src={info?.photo} alt="" className="mx-1" />
                </button>
                <ul className="dropdown-menu dropdown-menu-dark">
                  <li>
                    <Link to={"/userPage"} className="dropdown-item">
                      {t("user_tag")}
                      <img
                src={faUser}
                style={{
                  margin:
                    i18n.language === "en" ? "0 2px 0 6px" : "0 6px 0 2px",
                }}
                alt=""
              />
                    </Link>
                  </li>
                  <li>
                    <Link to={"/setting"} className="dropdown-item">
                      {t("header_user_setting")}
                    </Link>
                  </li>
                  <li>
                    <button className="account_exit" onClick={logOut}>
                      {t("header_nav_link")}
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to={"/login"} className="user">
                <FontAwesomeIcon icon={faUser} className="me-1" />
                {t("header_user")}
              </Link>
            )}
          </div>
          <div
            className="burger-icon"
            onClick={() => {
              setState(!state);
              document.body.style.overflow = "hidden";
            }}
          >
            <FontAwesomeIcon icon={faBars} />
          </div>
        </div>
      </div>
      {search && <CustomSearch setSearch={setSearch} />}
      {state && (
        <div className="mobile-screen">
          <div
            className="close-btn"
            onClick={() => {
              setState(false);
              document.body.style.overflow = "auto";
            }}
          >
            x
          </div>
          <div className="container">
            <div className="links">
              <NavLink
                className="me-2 nav-links"
                onClick={() => {
                  setState(false);
                  document.body.style.overflow = "auto";
                }}
                to="/"
              >
                {t("header_link_home")}
              </NavLink>
              <NavLink
                className="me-2 nav-links"
                onClick={() => {
                  setState(false);
                  document.body.style.overflow = "auto";
                }}
                to="/store"
              >
                {t("header_link_shop")}
              </NavLink>
              <NavLink
                className="me-2 nav-links"
                onClick={() => {
                  setState(false);
                  document.body.style.overflow = "auto";
                }}
                to="/blog"
              >
                {t("header_link_blog")}
              </NavLink>
              <NavLink
                className="me-2 nav-links"
                onClick={() => {
                  setState(false);
                  document.body.style.overflow = "auto";
                }}
                to="/about-us"
              >
                {t("header_link_about")}
              </NavLink>
              <NavLink
                className="me-2 nav-links"
                onClick={() => {
                  setState(false);
                  document.body.style.overflow = "auto";
                }}
                to="/contact"
              >
                {t("header_link_contact")}
              </NavLink>
            </div>
            <div className="operation">
              <div
                className="search"
                onClick={() => {
                  setSearch(true);
                  setState(false);
                  document.body.style.overflow = "hidden";
                }}
              >
                <FontAwesomeIcon icon={faSearch} />
              </div>
              <select
                name=""
                id=""
                onChange={(e) => {
                  i18n.changeLanguage(e.target.value);
                  localStorage.setItem("lng", e.target.value);
                  setState(false);
                  document.body.style.overflow = "auto";
                }}
                className="bg-transparent mx-2"
                style={{ border: "none" }}
              >
                <option value="english">EN</option>
                <option value="arabic">AR</option>
              </select>
              <Link
                to={"/cart"}
                className="cart-item"
                onClick={() => setState(false)}
              >
                <span className="me-1">{totalItems}</span>
                {t("header_cart_item")}
                <img
                  src={CartImg}
                  style={{
                    margin:
                      i18n.language === "en" ? "0 2px 0 6px" : "0 6px 0 2px",
                  }}
                  className="ms-1"
                />
              </Link>
              {localStorage.getItem("token") ? (
                <div className="user_account">
                  <button
                    className=" dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <img src={info?.photo} alt="" className="mx-1" />
                  </button>
                  <ul className="dropdown-menu dropdown-menu-dark">
                    <li>
                      <Link
                        to={"/userPage"}
                        className="dropdown-item"
                        onClick={() => setState(false)}
                      >
                        {t("user_tag")}
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={"/setting"}
                        className="dropdown-item"
                        onClick={() => setState(false)}
                      >
                        {t("header_user_setting")}
                      </Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <button
                        className="account_exit"
                        onClick={() => {
                          setState(false);
                          document.body.style.overflow = "auto";
                          logOut();
                        }}
                      >
                        {t("header_nav_link")}
                      </button>
                    </li>
                  </ul>
                </div>
              ) : (
                <Link
                  to={"/login"}
                  className="user"
                  onClick={() => setState(false)}
                >
                  <img src={faUser} alt="" />
                  {/* <FontAwesomeIcon icon={faUser} className="me-1" /> */}
                  {t("header_user")}
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
