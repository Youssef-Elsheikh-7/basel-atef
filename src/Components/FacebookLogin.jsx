// import { FacebookLogin } from "facebook-login-react";

import { LoginSocialFacebook } from "reactjs-social-login";
import { FacebookLoginButton } from "react-social-login-buttons";
/* eslint-disable no-undef */
export default function FacebookLoginBtn() {
  return (
    <LoginSocialFacebook
      isOnlyGetToken
      appId="379353534592849"
      autoLoad={false}
      fields="name,email,picture"
      scope="public_profile"
      onResolve={async (login) => {
        // const res = await fetch(`https://moneyservices.store/back/public/api/login_api?name=${login?.name}&email=${login}&provider_id=123456n5&provider=facebook`)
      }}
      //    onReject={(err) => {}}
      className="facebook"
    >
      <FacebookLoginButton />
    </LoginSocialFacebook>
  );
}
