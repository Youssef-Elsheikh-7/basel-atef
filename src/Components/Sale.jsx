import { useTranslation } from "react-i18next";
import cam from "../images/cam.png";
import phone from "../images/phone.png";
import vr from "../images/vr.png";
import CustomSale from "./CustomSale";

export default function Sale({ data }) {
  const { t } = useTranslation();
  return (
    <div className="sale pt-4 pb-4">
      <div className="container">
        <div className="row">
          {data?.map((el) => {
            return (
              <div className="col-lg-4 cpl-md-6 col-sm-12" key={el.id}>
                <div className="box mt-4">
                  <CustomSale
                    img={el?.photo}
                    head={el?.title}
                    info={el?.id !== 2 ? el?.description : ""}
                    name={`sale_${el?.id}`}
                  />
                </div>
              </div>
            );
          })}
          {/* <div className="col-lg-4 col-md-12 p-0">
            <div className="box mt-4 p-0">
              <CustomSale
                img={phone}
                head={`${t("sale_phone_head")}`}
                info={`${t("sale_phone_info")}`}
                name="phone"
                price="260"
              />
            </div>
          </div>
          <div className="col-lg-4 col-md-12 p-0">
            <div className="box mt-4 p-0">
              <CustomSale
                img={vr}
                head={`${t("sale_vr_head")}`}
                name="vr"
                price="299"
              />
            </div>
          </div>
          <div className="col-lg-4 col-md-12 p-0">
            <div className="box mt-4 p-0">
              <CustomSale
                img={cam}
                head={`${t("sale_camera_head")}`}
                info={`${t("sale_camera_info")}`}
                name="camera"
                price="399"
              />
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}
