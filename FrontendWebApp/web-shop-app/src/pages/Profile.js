import { Fragment } from "react";
import PageContent from "../components/PageContent";
import ProfileOverview from "../components/ProfileOverview";
import { json, redirect } from "react-router-dom";
import {
  extractTokenData,
  getAuthToken,
} from "../service/UserService/AuthService";

const content = {
  title: "Your Profile",
  description: "Check and change your details below.",
};

const ProfilePage = () => {
  return (
    <Fragment>
      <PageContent content={content} />
      <ProfileOverview />
    </Fragment>
  );
};

export default ProfilePage;

export async function loader({ request, params }) {
  const user = extractTokenData();
  const id = user["userId"];
  const response = await fetch("https://localhost:7068/api/users/" + id, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${getAuthToken()}`,
    },
  });

  if (!response.ok) {
    throw json(
      { message: "Could not fetch details for selected user." },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData;
  }
}

export async function action({ request }) {
  const data = await request.formData();
  const user = extractTokenData();
  const id = user["userId"];

  const userData = {
    userId: id,
    userName: "",
    email: "",
    password: data.get("password"),
    firstName: data.get("firstName"),
    lastName: data.get("lastName"),
    address: data.get("address"),
    dateOfBirth: data.get("date").slice(0, 10),
    userType: "",
    image: data.get("img"),
    verification: "",
    orders: [],
  };

  console.log(userData)
  const response = await fetch(
    "https://localhost:7068/api/users/edit/" + id,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${getAuthToken()}`,
      },
      body: JSON.stringify(userData),
    }
  );

  if (
    response.status === 422 ||
    response.status === 401 ||
    response.status === 400 ||
    response.status === 403
  ) {
    return response;
  }
  if (!response.ok) {
    throw json({ message: "Could not authenticate user." }, { status: 500 });
  }


  window.location.reload();
}