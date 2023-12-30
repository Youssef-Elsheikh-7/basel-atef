import StarsRating from "react-star-rate";
const user = JSON.parse(localStorage.getItem("user"))
import ProfileImg from "../images/profile_img.webp"

/* eslint-disable react/prop-types */
    export default function SingleProductReview({reviews}) {
        return (
            <div className="reviews">
                {reviews?.map((el) => {
                    return (
                        <div className="review_head" key={el.id}>
                            <div className="info">
                            <img src={user?.user?.img ? user?.user?.img : ProfileImg} alt="" className="w-25" />
                            {/* <h6>{el?.user_info?.email}</h6> */}
                            <h6>{el?.user_info?.name}</h6>
                            </div>
                            <div className="review_content">
                                <p>{el?.review}</p>
                                <StarsRating value={el?.rate} />
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }