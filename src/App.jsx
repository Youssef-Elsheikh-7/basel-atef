import { Route, Routes } from "react-router-dom";
import Header from "./Components/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import Store from "./Pages/Store";
import AboutUs from "./Pages/AboutUs";
import Contact from "./Pages/Contact";
import Home from "./Pages/Home";
import Cart from "./Pages/Cart";
import SingleProduct from "./Components/SingleProduct";
import Footer from "./Components/Footer";
import Register from "./Pages/Register";
import { tokenContext } from "./Context/tokenContext";
import { useContext, useEffect, useState } from "react";
import Login from "./Pages/Login";
//import ProtectedRoutes from "./Components/ProtectedRoutes";
import Protect from "./Components/Protect";
import NotFound from "./Components/NotFound";
import Blog from "./Pages/Blog";
import AddReviews from "./Components/AddReviews";
import Pay from "./Components/Pay";
import Credit from "./Components/Credit";
import SearchProducts from "./Components/SearchProducts";
import StoreReview from "./Components/StoreReview";
import UserPage from "./Pages/UserPage";
import Setting from "./Pages/Setting";
import Privacy from "./Pages/Privacy";
import HowToUse from "./Pages/HowToUse";
import WhoAreWe from "./Pages/WhoAreWe";
//import { AuthProvider } from "./Context/authContext";
import WishList from "./Pages/WishList";
import ProtectedRoutes from "./Components/Protect";
import Loading from "./Components/Loading";
import Winners from "./Pages/Winners";
import ForgetPassword from "./Pages/ForgetPassword";
import ConfirmCode from "./Pages/ConfirmCode";
import ChangePassword from "./Pages/ChangePassword";
import PostDetails from "./Components/PostDetails";
function App() {
  const [load, setLoad] = useState(false);
  let { setToken } = useContext(tokenContext);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
    setTimeout(() => {
      setLoad(true);
    }, 3000);
  }, []);
  if (load === false) return <Loading />;
  return (
    <div style={{ overflowX: "hidden" }}>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/wish-list" element={<WishList />} />
        <Route path="/winners" element={<Winners />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/store" element={<Store />} />
        <Route path="/store/reviews/:userId" element={<StoreReview />} />
        <Route path="/cart" element={<Cart />}>
          <Route path="pay">
            <Route index element={<Pay />} />
            <Route path="credit" element={<Credit />} />
          </Route>
        </Route>
        <Route path="/register" element={<Register />} />
        <Route
          path="/login"
          element={
            <Protect>
              <Login />
            </Protect>
          }
        />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/confirm" element={<ConfirmCode />} />
        <Route path="/changePassword" element={<ChangePassword />} />
        <Route path="/store/product/:id/" element={<SingleProduct />} />

        <Route path="/store/product/:id/review" element={<AddReviews />} />
        <Route path="/store/product-search/:id/" element={<SearchProducts />} />
        <Route path="/Blog" element={<Blog />} />
        <Route path="/blog/post/:id" element={<PostDetails />} />
        <Route path="/userPage" element={<UserPage />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="privacy-policy" element={<Privacy />} />
        <Route path="/terms-of-use" element={<HowToUse />} />
        <Route path="/who-are-we" element={<WhoAreWe />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
