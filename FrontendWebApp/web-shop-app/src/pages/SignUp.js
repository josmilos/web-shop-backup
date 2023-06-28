import { Autocomplete } from "@mui/material";
import { alignProperty } from "@mui/material/styles/cssUtils";
import { json, redirect, useActionData } from "react-router-dom";
import SignUpForm from "../components/SignUpForm";
import { extractTokenData, storeAuthToken } from "../service/UserService/AuthService";
import { encodeImageToBase64 } from "../service/ImageConverter";


const SignUp = () => {
  return (
    <SignUpForm></SignUpForm>
  )

};

export default SignUp;

export async function action({ request}) {
  const data = await request.formData();

  const userData = {
    userId: 0,
    userName: data.get("username"),
    email: data.get("email"),
    password: data.get("password"),
    firstName: data.get("firstName"),
    lastName: data.get("lastName"),
    address: data.get("address"),
    dateOfBirth: data.get("date").slice(0, 10),
    userType: data.get("type").toLocaleLowerCase(),
    image: data.get("img"),
    verification: "",
    orders: [],
  };

  const response = await fetch("https://localhost:7068/api/users/register", {
    method: "POST",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(userData),
  });

  if(response.status === 422 || response.status === 401 || response.status === 400 || response.status === 403){
    return response;
  }
  if(!response.ok){
    throw json(
      { message: "Could not authenticate user." },
      { status: 500 },
    );
  }

  const resData = await response.json();
  const token = resData.token;

  storeAuthToken(token);
  const expiration = new Date();
  expiration.setHours(expiration.getHours() + 1);
  localStorage.setItem('expiration', expiration.toISOString());
  console.log(extractTokenData)
  return redirect('/dashboard');
}
