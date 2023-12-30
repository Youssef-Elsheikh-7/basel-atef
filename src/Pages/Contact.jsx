import { useTranslation } from "react-i18next";
import ContactForm from "../Components/ContactForm";
import { FaLocationDot, FaSquarePhone } from "react-icons/fa6";
import "../Style/Contact.css";
import ContactMap from "../Components/ContactMap";
import { useFormik } from "formik";
import { useLayoutEffect, useState } from "react";
function Contact() {
  const { t } = useTranslation();
  const [info, setInfo] = useState({});
  useLayoutEffect(() => {
    fetch("https://moneyservices.store/back/public/api/contact-us")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setInfo(data?.data);
      });
  }, []);
  return (
    <div className="contact">
      <div className="container">
        <div className="row py-3">
          <div className="col-lg-6 col-md-12">
            <div className="box mt-4">
              <div className="contact_title ">
                <h4 className="fw-bold">
                  {t("contact_title")}
                  {""}
                  <span style={{ color: "#222" }}>{t("contact_now")}</span>
                </h4>
              </div>
              <ContactForm />
              <div className="contact_info">
                <div className="address">
                  <FaLocationDot />
                  <h4>{info?.address}</h4>
                </div>
                <div className="tel">
                  <FaSquarePhone />
                  <h4>{info?.phone}</h4>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-12">
            <div className="box mt-4">
              <ContactMap />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
