import { useState, useLayoutEffect } from "react"
import img from "../images/bgG.jpg"

export default function HowToUse() {
    const [info, setInfo] = useState({})
        useLayoutEffect(() => {
        fetch("https://moneyservices.store/back/public/api/page/6?locale=arabic").then((res) => {
            return res.json()
        }).then((data) => {
            setInfo(data?.page)
        })
    }, [])
    return (
        <div className="global_pages">
            <div className="container">
                <div className="img">
                    <img src={img} alt="" />
                    <h4>{info?.title}</h4>
                </div>
                <p>{info?.description}</p>
            </div>
        </div>
    )
}