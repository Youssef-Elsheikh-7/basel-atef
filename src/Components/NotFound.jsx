import { Helmet } from "react-helmet";
import NotFoundImg from "../images/notfound_page.avif";

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>Not Found Page</title>
      </Helmet>
      <img src={NotFoundImg} alt="" className="w-100" />
    </>
  );
}
