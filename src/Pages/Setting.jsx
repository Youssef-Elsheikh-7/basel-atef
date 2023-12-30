import { useState } from "react";
import SettingSummry from "../Components/SettingSummry";
import "../Style/Setting.css"
import SettingPassword from "../Components/SettingPassword";
import UserData from "../Components/UserData";

export default function Setting() {
    const [tap, setTap] = useState(false)
    return (
        <div className='setting'>
            <div className='container'>
                <div className="row">
                    <div className="col-lg-4 col-md-12 mt-4">
                        <SettingSummry setTap={setTap} tap={tap} />
                    </div>
                    <div className="col-lg-4 col-md-12 mt-4 forma">
                        {tap === false ? (
                            <SettingPassword />
                        ) : (
                            <UserData />
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}