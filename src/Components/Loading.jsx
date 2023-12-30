import LoadingImg from "../images/spinner.svg"

export default function Loading() {
    return (
        <div style={{height: "100vh"}} className="loading d-flex justify-content-center align-items-center">
            <img src={LoadingImg} style={{width: "100px"}} alt="" />
        </div>
    )
}