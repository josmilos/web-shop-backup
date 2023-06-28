import { Fragment } from "react";
import PageContent from "../components/PageContent";
import {
  extractTokenData,
  getAuthToken,
} from "../service/UserService/AuthService";
import { json } from "react-router-dom";
import OrdersSellerList from "../components/Seller/OrdersSellerList";

const content = {
  title: "New Orders",
  description: "Check newly created orders.",
};

const auth = extractTokenData();
let userType = "";
let userId = "";
if (auth) {
  userType = auth["userType"];
  userId = auth["userId"];
}

const NewOrdersPage = () => {
  return (
    <Fragment>
      <PageContent content={content} />
      <OrdersSellerList time={"new"}/>
    </Fragment>
  );
};

export default NewOrdersPage;

export async function loader({ request, params }) {
  const response = await fetch(
    "https://localhost:7068/api/orders/history-seller" + `/${userId}`,
    {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${getAuthToken()}`,
      },
    }
  );

  if (!response.ok) {
    throw json(
      { message: "Could not fetch list of orders." },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData;
  }
}
