import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeadset,
  faDollar,
  faTruck,
} from "@fortawesome/free-solid-svg-icons";
import headPhone from "../images/support.png"
import money from "../images/money.png"
import delivery from "../images/delivery.png"
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

export default function Services({data}) {
  const { t } = useTranslation();
  return (
    <div className="services">
      <div className="container text-center">
        <div className="row">
          {data?.map((el) => {
            return (
          <div className="col-lg-4 col-md-6 col-sm-12" key={el.id}>
            <div className="box mt-4">
              <span>
                <img src={el.photo} alt="" />
              </span>
              <div className="info">
                <h4>{el?.title}</h4>
                <p>{el?.description}</p>
              </div>
            </div>
          </div>
            )
          })}
        </div>
      </div>
    </div>
  );
}
