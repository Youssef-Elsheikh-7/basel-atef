import React, { useEffect, useLayoutEffect, useState } from "react";
import photo from "../images/about.jpg";
import "../Style/about.css";
const user = JSON.parse(localStorage.getItem("user"));
import { ToastContainer, toast } from "react-toastify";
import { useTranslation } from "react-i18next";

export default function AboutUs() {
  const [info, setInfo] = useState({});
  const [use, setUse] = useState({});
  const [loader1, setLoader1] = useState(false);
  const [loader2, setLoader2] = useState(false);
  const { t } = useTranslation();
  let language = localStorage.getItem("lng");
  useEffect(() => {
    fetch(
      `https://moneyservices.store/back/public/api/about/5?locale=${language}`
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setInfo(data);
        setLoader1(true);
      })
      .catch((err) => toast.error(err.message));
    fetch(
      `https://moneyservices.store/back/public/api/page/6??locale=${language}`
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setUse(data);
        setLoader2(true);
      })
      .catch((err) => toast.error(err.message));
  }, [language]);

  return (
    <>
      {(() => {
        if (loader1 && loader2) {
          return (
            <>
              <div className="container my-5">
                <div className="row">
                  <div className="col-md-8 ">
                    <div className="my-5">
                      <h3 className="fw-bolder my-4">
                        <span className="text-warning ">
                          {info?.page?.title?.split(" ")[0]}
                        </span>{" "}
                        <span>{info?.page?.title?.split(" ")[1]}</span>{" "}
                      </h3>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: info?.page?.description,
                        }}
                        className="lh-md"
                      ></p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <img
                      src={info?.page?.photo[0]}
                      className="w-75"
                      alt=""
                    ></img>
                  </div>
                </div>
              </div>

              <div className="container  bg-warning p-5 position-relative ">
                <h2 className="fw-bolder text-center ">
                  {t("about_goal_title")}
                </h2>
                <div className="row align-item-center justify-content-center ">
                  {info?.Our_goals?.map((el) => {
                    return (
                      <div className="col-md-3" key={el.id}>
                        <div className="card border border-dark rounded ro2 ">
                          <img
                            src={el?.photo}
                            className="card-img-top w-100"
                            alt="..."
                          />
                          <div className="card-body">
                            <p
                              className="card-text"
                              dangerouslySetInnerHTML={{
                                __html: el?.description,
                              }}
                            ></p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="pt-5">
                <div className="container my-5 pt-5 ">
                  <div className="row pt-5 ">
                    <div className="col-md-12">
                      <h4 className="fw-bolder my-4">
                        <span className="text-warning ">
                          {use?.page?.title?.split(" ")[0]}
                        </span>{" "}
                        <span>{use?.page?.title?.split(" ")[1]}</span>{" "}
                      </h4>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: use?.page?.description,
                        }}
                        className="w-100"
                      ></p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          );
        }
      })()}
      <ToastContainer />
    </>
  );
}
