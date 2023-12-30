import SocialLogin from "react-social-login";

/* eslint-disable react/prop-types */
 function SocialButton(props) {
    const { children, triggerLogin } = props;
    return (
        <button onClick={triggerLogin} {...props}>{children}</button>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export default SocialLogin(SocialButton)