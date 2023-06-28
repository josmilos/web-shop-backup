import { Fragment } from "react";
import PageContent from "../components/PageContent";
import { Button, Stack } from "@mui/material";
import { Form, Link, json, redirect } from "react-router-dom";
import SProductsList from "../components/Seller/SProductsList";
import {
  extractTokenData,
  getAuthToken,
} from "../service/UserService/AuthService";

const content = {
  title: "My Products",
  description:
    "Overview of your created products. You can check details of each product and edit, or add a new one by clicking button below",
};

const SellerProductsPage = () => {
  return (
    <Fragment>
      <PageContent content={content} />
      <div className="flexGrow">
        <Stack direction="row" spacing={1} justifyContent="center">
          <Form action="new-product" method="post">
            <Button variant="contained">
              <Link to={"new-product"} style={{ textDecoration: "none", color: "inherit" }}>Add New Product</Link>
            </Button>
          </Form>
        </Stack>
      </div>
      <SProductsList />
    </Fragment>
  );
};

export default SellerProductsPage;

export async function loader({ request, params }) {
  const user = extractTokenData();
  const id = user["userId"];

  const response = await fetch(
    "https://localhost:7068/api/products/seller-products/" + id,
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`,
      },
    }
  );

  if (!response.ok) {
    throw json(
      { message: "Could not fetch list of products for selected seller." },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData;
  }
}
