import { useCart } from "react-use-cart";
// import { ProductService } from './service/ProductService'
import { PATH_API_FOR_IMG } from "../Helper";
import { useTranslation } from "react-i18next";
import "../Style/cart.css";
import CartSummry from "../Components/CartSummry";
import { useNavigate } from "react-router-dom";
import { FaTrashCan } from "react-icons/fa6";
import DiscountForm from "../Components/DiscountForm";
import { useState } from "react";
import { Helmet } from "react-helmet";

function Cart() {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const handleClick = () => {
    // Use navigate to navigate to another page
    navigate("/store");
  };
  const { items, removeItem, updateItemQuantity, getItem, isEmpty, setItems } =
    useCart();

  const { t } = useTranslation();
  const cartItems = localStorage.getItem("react-use-cart");
  if (cartItems.items !== undefined) {
    setItems(JSON.parse(cartItems));
  }
  return (
    <>
      <Helmet>
        <title>Cart</title>
      </Helmet>

      <div className="new-table-x table-responsive">
        <table className="table overflow-scroll d-block">
          <thead>
            <tr>
              {[
                { id: 1, item: t("cart_content_photo") },
                { id: 2, item: t("cart_content_name") },
                { id: 3, item: t("cart_content_price") },
                { id: 4, item: t("cart_content_count") },
                { id: 5, item: t("cart_content_total") },
                { id: 6 },
              ].map((el) => {
                return (
                  <td key={el.id} style={{ margin: "0 20px" }}>
                    {el.item}
                  </td>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {isEmpty ? (
              <h4 className="fs-3 text-capitalize mt-3">this cart is Emty</h4>
            ) : (
              items?.map((el) => {
                return (
                  <tr key={el.id}>
                    <td className="cart_img" style={{ margin: "0 20px" }}>
                      <img src={el?.photo[0]} />
                    </td>
                    <td className="cart_title" style={{ margin: "0 20px" }}>
                      {el.title}
                    </td>
                    <td className="cart_price" style={{ margin: "0 20px" }}>
                      {el.price} EG
                    </td>
                    <td className="cart_count" style={{ margin: "0 20px" }}>
                      <button
                        className="increase"
                        onClick={() => {
                          const increase = getItem(el.id);
                          updateItemQuantity(el.id, increase.quantity + 1);
                        }}
                      >
                        +
                      </button>
                      <label type="number">{el.quantity}</label>
                      <button
                        className="decrease"
                        onClick={() => {
                          const decrease = getItem(el.id);
                          updateItemQuantity(el.id, decrease.quantity - 1);
                        }}
                      >
                        -
                      </button>
                    </td>
                    <td className="cart_total" style={{ margin: "0 20px" }}>
                      {el.itemTotal}
                    </td>
                    <td className="cart_total" style={{ margin: "0 20px" }}>
                      <div
                        className="remove_btn "
                        onClick={() => removeItem(el.id)}
                      >
                        <button type="button" className="border-0">
                          <FaTrashCan
                            style={{
                              color: "#f44336",
                              width: "20px",
                              height: "20px",
                            }}
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <div className="container p-1">
        <div className="row">
          <div className="col-lg-6 col-md-12 box pt-5">
            <div className="box">
              <button
                style={{
                  width: "50%",
                  backgroundColor: "#ffb61e",
                  color: "#fff",
                }}
                className="btn continue-st"
                onClick={handleClick}
              >
                {t("cart_summry_shop")}
              </button>
            </div>
          </div>
          <div className="col-lg-6 col-md-12 box pt-5 elmatador">
            <div className="box">
              <div className="discount_form">
                <DiscountForm setCode={setCode} />
              </div>
            </div>
          </div>
        </div>
        <CartSummry code={code} />
      </div>
    </>
  );
}

export default Cart;

{
  /* <table className="table-responsive-lg table-responsive-md table-responsive-xl table-responsive-xxl table-sm overflow-scroll d-block">
          <thead>
            <tr>
              {[
                { id: 1, item: t("cart_content_photo") },
                { id: 2, item: t("cart_content_name") },
                { id: 3, item: t("cart_content_price") },
                { id: 4, item: t("cart_content_count") },
                { id: 4, item: t("cart_content_total") },
              ].map((el) => {
                return (
                  <td key={el.id} style={{ margin: "0 20px" }}>
                    {el.item}
                  </td>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {isEmpty ? (
              <h4 className="fs-3 text-capitalize mt-3">this cart is Emty</h4>
            ) : (
              items?.map((el) => {
                return (
                  <tr key={el.id}>
                    <td className="cart_img" style={{ margin: "0 20px" }}>
                      <img src={el?.photo[0]} />
                    </td>
                    <td className="cart_title" style={{ margin: "0 20px" }}>
                      {el.title}
                    </td>
                    <td className="cart_price" style={{ margin: "0 20px" }}>
                      {el.price} EG
                    </td>
                    <td className="cart_count" style={{ margin: "0 20px" }}>
                      <button
                        className="increase"
                        onClick={() => {
                          const increase = getItem(el.id);
                          updateItemQuantity(el.id, increase.quantity + 1);

                        }}
                      >
                        +
                      </button>
                      <label type="number">{el.quantity}</label>
                      <button
                        className="decrease"
                        onClick={() => {
                          const decrease = getItem(el.id);
                          updateItemQuantity(el.id, decrease.quantity - 1);

                        }}
                      >
                        -
                      </button>
                    </td>
                    <td className="cart_total" style={{ margin: "0 20px" }}>
                      {el.itemTotal}
                    </td>
                    <td className="cart_total" style={{ margin: "0 20px" }}>
                    <div
                      className="remove_btn "
                      onClick={() => removeItem(el.id)}
                    >
                      <button type="button" className="border-0">
                        <FaTrashCan
                          style={{
                            color: "#f44336",
                            width: "20px",
                            height: "20px",
                          }}
                        />
                      </button>
                    </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table> */
}
