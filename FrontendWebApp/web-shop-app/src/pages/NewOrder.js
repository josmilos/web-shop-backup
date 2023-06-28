import { Fragment } from "react";
import PageContent from "../components/PageContent";
import ProductsList from "../components/Buyer/ProductsList";
import { json } from "react-router-dom";
import { getAuthToken } from "../service/UserService/AuthService";
import CartProvider from "../store/CartProvider";

const content = {
  title: "New Order",
  description:
    "Create a new order by selecting one or more items that are listed below.",
};

const NewOrderPage = () => {
  return (
    <Fragment>
      <PageContent content={content} />
        <ProductsList />
    </Fragment>
  );
};

export default NewOrderPage;

export async function loader({ request, params }) {
  const response = await fetch("https://localhost:7068/api/products/all", {
    headers: {
      "Content-Type": "application/json",
        "Authorization": `Bearer ${getAuthToken()}`,
    },
  });

  if (!response.ok) {
    throw json(
      { message: "Could not fetch list of products." },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData;
  }
}
