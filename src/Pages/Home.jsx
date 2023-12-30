import { Helmet } from "react-helmet";
import HomeSearch from "../Components/HomeSearch";
import HomeSlide from "../Components/HomeSlide";
import LatestProducts from "../Components/LatestProducts";
import NewProducts from "../Components/NewProducts";
import Posts from "../Components/Posts";
import Sale from "../Components/Sale";
import Services from "../Components/Services";
import ProductsBuys from "../Components/productsBuys";
import "../Style/Home.css";
import { useEffect, useLayoutEffect, useState } from "react";
import { HomeApi } from "../Redux/Reducers/Home";
import { useDispatch, useSelector } from "react-redux";
import { getCopons } from "../Redux/Reducers/Products";

function Home() {
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    dispatch(HomeApi());
    dispatch(getCopons());
  }, [dispatch]);
  const { mainData } = useSelector((state) => state.home);
  const [data, setData] = useState(mainData);
  let languagehome = window.localStorage.getItem("lng");
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetch(
      `https://moneyservices.store/back/public/api/home?locale=${languagehome}`
    )
      .then((response) => response.json())
      .then((data) => setData(data));
  }, [languagehome]);

  return (
    <>
      <Helmet>
        <title>Home Page</title>
        <meta name="description" content="Money Services Is Big Store" />
      </Helmet>
      <HomeSlide data={data?.banners} />
      <Sale data={data?.under_slider} />
      <ProductsBuys
        dataInfo={data?.featured_products}
        cate={data?.categories}
      />
      <NewProducts data={data?.Latest_additions} />
      <Services data={data?.icon} />
      <LatestProducts data={data?.new_products} />
      <Posts data={data?.posts} />
      <HomeSearch />
    </>
  );
}

export default Home;
