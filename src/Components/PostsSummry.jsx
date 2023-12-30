import { useTranslation } from "react-i18next";
import { PATH_API_FOR_IMG } from "../Helper";
import { Link } from "react-router-dom";

export default function PostsSummry({posts}) {
    const {t} = useTranslation()
    return <div className="post_summry">
        <div className="summry_title">
            <h4>{t("posts_summry_title")}</h4>
        </div>
        <div className="summry_content">
            {posts?.slice(0, 3)?.map((el) => {
                return (
                <div className="post" key={el.id} style={{backgroundImage: `url(${PATH_API_FOR_IMG + el?.photo})`, maxHeight: "500px" , height: "400px", backgroundRepeat: "no-repeat", width: "100%"}}>
                    <Link to={`/blog/post/${el.slug}`} className="post_head">{el?.title}</Link>
                </div>
                )
            })}
        </div>
    </div>
}