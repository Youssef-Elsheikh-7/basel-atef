import axios from "axios";
import {useTranslation} from "react-i18next"
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function SettingSummry({setTap, tap}) {
    const {t} = useTranslation();
    const navigate = useNavigate()
    // const deleteBtn = async () => {
    //     const condition = confirm(t("setting_delete_msg"))
    //     if (condition === true) {
        //     const {user} = JSON.parse(localStorage.getItem("user"))
        //     const res = await axios.get(`https://moneyservices.store/back/public/api/delete-user/${user?.id}`)
        //     if (res.status === 200) {
        //         localStorage.removeItem("user")
        //         localStorage.removeItem("token")
        //         navigate("/login")
        //     }
        // }
    // }

    const deleteBtn =  () => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: "btn btn-success",
              cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
          });
          swalWithBootstrapButtons.fire({
            title: "Are you sure?",
            text: "متأكد انك عايز تحذف الحساب ؟؟",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                    console.log('done delete yet')
                    const {user} = JSON.parse(localStorage.getItem("user"))
                    axios.get(`https://moneyservices.store/back/public/api/delete-user/${user?.id}`).then((res)=>{
                        if (res.status === 200) {
                            console.log('done delete')
                            localStorage.removeItem("user")
                            localStorage.removeItem("token")
                            navigate("/login")
                            swalWithBootstrapButtons.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
    })
                        }
                    })
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                swalWithBootstrapButtons.fire({
                title: "Cancelled",
                text: "Your imaginary file is safe :)",
                icon: "error"
            });
            }
        });
    }

    return (
        <div className="setting_tap">
            <h4 className="tap password" onClick={() => setTap(false)} style={{opacity: tap === false ? "0.6" : "1"}}>{t("setting_change_password")}</h4>
            <h4 className="tap data" onClick={() => setTap(true)} style={{opacity: tap === false ? "0.6" : "1"}}>{t("setting_change_data")}</h4>
            <div className="delete_btn btn btn-danger w-50" onClick={deleteBtn}>{t("setting_delete_btn")}</div>
        </div>
    )
}