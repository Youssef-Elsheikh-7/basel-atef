import { LoginSocialGoogle } from "reactjs-social-login";
import { GoogleLoginButton } from "react-social-login-buttons";
import axios from "axios";
import { useNavigate } from "react-router-dom/dist/umd/react-router-dom.development";

export default function GoogleLogin() {
  const navigate = useNavigate();

  return (
    <LoginSocialGoogle
      client_id="492206293011-k25f2esbna40s4glq6b7nidf7k14rkgp.apps.googleusercontent.com" // Replace with your actual client ID
      redirect_uri="https://front.moneyservices.store" // Replace with your actual redirect URI
      onResolve={async (res) => {
        console.log(res);

        if (res?.data?.name) {
          try {
            const apiRes = await axios.post(
              "https://moneyservices.store/back/public/api/login_api",
              {
                name: res.data.name,
                email: res.data.email,
                provider_id: res.data.sub,
                provider: res.provider,
                access_token: res.data.access_token,
                // Add other required fields as needed
              }
            );

            console.log(apiRes);

            if (apiRes.status === 200 && apiRes.data && apiRes.data.user) {
              navigate("/");
              console.log("Login successful");
              localStorage.setItem("token", res.data.access_token);
              localStorage.setItem("user", JSON.stringify(apiRes.data.user));
              console.log(res);
            } else {
              console.error("Invalid response format:", apiRes);
            }
          } catch (error) {
            console.error("Error during Google login:", error);
          }
        } else {
          console.error("Invalid data in the Google login response:", res);
        }
      }}
      onReject={(err) => {
        console.error("Error during Google login:", err);
        // You can add a message to the user here if you want
      }}
      className="google mt-4"
    >
      <GoogleLoginButton />
    </LoginSocialGoogle>
  );
}
