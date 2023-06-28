import { Fragment } from "react";
import PageContent from "../components/PageContent";
import {
  extractTokenData,
  getAuthToken,
} from "../service/UserService/AuthService";
import { json } from "react-router-dom";
import OrdersBuyerList from "../components/Buyer/OrdersBuyerList";
import OrdersSellerList from "../components/Seller/OrdersSellerList";

const content = {
  title: "Order History",
  description: "Check your past orders.",
};
const auth = extractTokenData();
let userType = "";
let userId = "";
if (auth) {
  userType = auth["userType"];
  userId = auth["userId"];
}

let query = "";

if (userType === "buyer") {
  query = "buyer";
} else if (userType === "seller") {
  query = "seller";
}

const OrderHistoryPage = () => {
  return (
    <Fragment>
      <PageContent content={content} />
      {
      userType === "buyer" && (<OrdersBuyerList />) }
       {userType === "seller" && (<OrdersSellerList time={"past"}/>)
}
    </Fragment>
  );
};

export default OrderHistoryPage;

export async function loader({ request, params }) {
  const response = await fetch(
    "https://localhost:7068/api/orders/history-" + `${query}/${userId}`,
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
