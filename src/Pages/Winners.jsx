import { useLayoutEffect } from "react"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import "../Style/Winners.css"
import { FaGift } from "react-icons/fa6";

export default function Winners() {
    const [winners, setWinners] = useState([])
    const {t} = useTranslation()
    useLayoutEffect(() => {
        fetch(`https://moneyservices.store/back/public/api/winrer-user?locale=${localStorage.getItem("lng")}`).then((res) => {
            return res.json()
        }).then((data) => {
            setWinners(data?.Winrers)
        })
    }, [])
    return (
        <div className='winners'>
            <div className='container'>
                <h4 className="winers_title">{t("winner_title")}</h4>
                <div className="winners_list">
                    {winners.length !== 0 ? winners?.map((el) => {
                        return (
                            <div className="winner" key={el?.id}>
                                <div className="winner_info">
                                    <h4 className="winner_title">{el?.user_name} <FaGift /></h4>
                                    <p className="winner_description">{el?.description}</p>
                                </div>
                                <div className="winner_img">
                                    <img src={el?.user_photo} alt="" />
                                </div>
                            </div>
                        )
                    }) : <h4>{t("winner_not_Found")}</h4>}
                </div>
            </div>
        </div>
    )
}