import React, { useEffect } from "react";
import { GoogleButton } from "react-google-button";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import FacebookLogin from "react-facebook-login";

const Signin = () => {
  const { googleSignIn, user, facebookSignIn } = UserAuth();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  const handleFacebookSignIn = async () => {
    try {
      await facebookSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user != null) {
      navigate("/account");
    }
  }, [user]);

  return (
    <div style={{ width: "90%" }}>
      <h1 style={{ marginBottom: 0 }}>Sign in</h1>
      <hr
        style={{
          borderTop: "6px solid black",
          borderRadius: "2px",
          marginBottom: "30px",
        }}
      ></hr>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ marginBottom: "10px" }}>
          <GoogleButton onClick={handleGoogleSignIn} />
        </div>
        <div>
          <FacebookLogin
            appId="587944356394839"
            onClick={handleFacebookSignIn}
          />
        </div>
      </div>
    </div>
  );
};

export default Signin;
