import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import shareVideo from "./../assets/share.mp4";
import { client } from "../client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import logo from "./../assets/logowhite.png";
import { useState } from "react";
let image =
  "https://lh3.googleusercontent.com/ogw/AOLn63FSxXBHBEHpi3HGVSl2QYQf6wHp2oxihHTZaK1C=s64-c-mo";

function Login() {
  const navigate = useNavigate();

  async function clickHandler(response) {
    console.log(response);
    localStorage.setItem(
      "user",
      JSON.stringify({
        _id: response.credential,
        userId: response.clientId,
      })
    );

    const doc = {
      _id: response.clientId,
      _type: "user",
      username: "User",
      image: image,
    };

    client.createIfNotExists(doc).then(() => {
      return navigate("/", { replace: true });
    });
  }

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}>
      <div className="flex justify-start items-center flex-col h-screen">
        <div className="relative w-full h-full ">
          <video
            src={shareVideo}
            type="video/mp4"
            loop
            controls={false}
            muted
            autoPlay
            className="w-full h-full object-cover"
          />
        </div>

        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
          <div className="p-5">
            <img src={logo} width="130px" alt="logo" />
          </div>
          <div className="shadow-2xl">
            <GoogleLogin
              cookiePolicy="single_host_origin"
              onSuccess={(credentialResponse) => {
                // console.log(credentialResponse);
                clickHandler(credentialResponse);
              }}
              onError={() => {
                console.log("Login Failed");
              }}
              onFailure={(err) => console.log("fail", err)}
              isSignedIn={true}
              useOneTap
            >
              <button
                type="button"
                className="bg-mainColor flex justify-center items-center rounded-lg cursor-pointer outline-none"
              >
                <FcGoogle className="mr-4" /> Sign In with Goodle
              </button>
            </GoogleLogin>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}

export default Login;
