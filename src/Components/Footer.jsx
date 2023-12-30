import { useTranslation } from "react-i18next";
import logo from "../images/logo-white.png";
import "../Style/footer.css";
import { FaFacebookF, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useLayoutEffect, useState } from "react";

export default function Footer() {
  const { t } = useTranslation();
  const [info, setInfo] = useState({})
  useLayoutEffect(() => {
    fetch(`https://moneyservices.store/back/public/api/footer?locale=${localStorage.getItem("lng")}`).then((res) => {
      return res.json()
    }).then((data) => {
      setInfo(data?.data)
    })
  }, [])
  return (
<>
    <div
      className="footer"
    >
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <div className="box mt-4">
              <div className="logo">
                <img src={info?.logo} alt="" style={{ width: "100px" }} />
                <h4>{t("footer_logo")}</h4>
              </div>
              <p className="p-logo">{info?.description1}</p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="box mt-4">
              <h4>{t("footer_link_one_head")}</h4>
              <div className="" dangerouslySetInnerHTML={{__html: info?.description2}}></div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="box mt-4">
              <h4>{t("footer_link_two_head")}</h4>
              <div className="" dangerouslySetInnerHTML={{__html: info?.description3}}></div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="box mt-4">
              <h4>{t("footer_info_head")}</h4>
              <p dangerouslySetInnerHTML={{__html: info?.description4}}></p>
              <div className="footer_links">
                <Link to="" className="facebook">
                  <FaFacebookF />
                </Link>
                <Link to="" className="twitter">
                  <FaTwitter />
                </Link>
                <Link to="" className="linkedIn">
                  <FaLinkedin />
                </Link>
                <Link to="" className="instgram">
                  <FaInstagram />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
      <div className="copy">Design & Development by WEBARABI</div>
</>
  );
}
