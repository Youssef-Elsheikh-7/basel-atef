/* eslint-disable react/prop-types */
import { useTranslation } from "react-i18next";
import { PATH_API_FOR_IMG } from "../Helper";
import { Link } from "react-router-dom";

export default function PostsCard({ post }) {
  const { t } = useTranslation();
  return (
    <div className="box mt-4">
      <img src={PATH_API_FOR_IMG + post?.photo} alt={post?.title} />
      <h4 className="post_title">{post?.title}</h4>
      <p className="post_tage">{post?.tags}</p>
      <p className="post_content">
        {post?.description?.split(">")[1].split("<")[0]}
      </p>
      <Link className="read_more" to={`/blog/post/${post?.slug}`}>
        {t("blog_read_more")}
      </Link>
    </div>
  );
}
