import { Link } from "react-router-dom";
import phone from "../images/phone.png";
import "../Style/SlideInfo.scss";
import { useTranslation } from "react-i18next";

function SlideInfo() {
  const { t } = useTranslation();
  return (
    <div className="slide-info">
      <div className="text">
        <h1>{t("slider_head")}</h1>
        <h5>{t("slider_info")}</h5>
        <Link className="more-info">{t("slider_link")}</Link>
      </div>
      <div className="image">
        <img src={phone} alt="" />
      </div>
    </div>
  );
}

export default SlideInfo;
