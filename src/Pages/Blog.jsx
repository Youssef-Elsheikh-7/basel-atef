import { useLayoutEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getBlogs } from '../Redux/Reducers/blog';
import PostsCard from '../Components/PostsCard';
import PostsSummry from '../Components/PostsSummry';
import "../Style/Posts.css"


export default function Blog() {
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    dispatch(getBlogs())
  }, [])
  const {data} = useSelector((state) => state?.blog)
  return (
    <div className="posts">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-md-12">
            <PostsSummry posts={data} />
          </div>
          <div className="col-lg-8 col-md-12 posts-read-x0">
          {data?.map((el) => {
            return <PostsCard post={el} key={el.id} />
          })}
          </div>
        </div>
      </div>
    </div>
  )
}
