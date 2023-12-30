import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { BrowserRouter } from "react-router-dom";
import TokenContextProvider from "./Context/tokenContext";
//import AuthProvider from "./Context/authContext.jsx";
import "./Style/Normalize.css";
import "./Style/Main.scss";
import "./Style/Global.scss";
import "./i18n.js";
import { Provider } from "react-redux";
import { store } from "./Redux/index.js";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay"
import "./Style/Home.css";
import "./Style/products.css";
 import 'react-toastify/dist/ReactToastify.css';
 import { CartProvider } from "react-use-cart";
import "bootstrap/dist/js/bootstrap.js"
import { AuthProvider } from "./Context/authContext.jsx";
import "./Fonts/Tahoma_Font.ttf"

ReactDOM.createRoot(document.getElementById("root")).render(

    <Provider store={store}>
      <CartProvider>
              <BrowserRouter>
        <TokenContextProvider>
          <AuthProvider>
          <App />
          </AuthProvider>
        </TokenContextProvider>
      </BrowserRouter>
      </CartProvider>
    </Provider>
 
);
