import React from "react";
import { GoogleLogin } from "@react-oauth/google";

const responseMessage = (response) => {
  console.log(response);
};
const errorMessage = (error) => {
  console.log(error);
};

const GoogleButton = () => {
  return (
    <GoogleLogin
      onSuccess={responseMessage}
      onError={errorMessage}
    ></GoogleLogin>
  );
};

export default GoogleButton;
