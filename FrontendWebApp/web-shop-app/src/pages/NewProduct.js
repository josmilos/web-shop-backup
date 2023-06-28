import { Fragment } from "react";
import PageContent from "../components/PageContent";
import ProductForm from "../components/Seller/ProductForm";
import { Form, Link, json, redirect, useNavigate } from "react-router-dom";
import { Button, Stack } from "@mui/material";
import {
  extractTokenData,
  getAuthToken,
} from "../service/UserService/AuthService";
import { ImageEncode } from "../service/ImageConverter";

const content = {
  title: "Add New Product",
  description:
    "Create a new product and add it to the shop. Fill in the necessary data in the form below.",
};

const NewProductPage = () => {
  const navigate = useNavigate();

  return (
    <Fragment>
      <PageContent content={content} />
      <div className="flexGrow">
        <Stack direction="row" spacing={1} justifyContent="center">
          <Button
            type="submit"
            variant="contained"
            onClick={() => navigate(-1)}
          >
            My Products
          </Button>
        </Stack>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <ProductForm />
      </div>
    </Fragment>
  );
};

export default NewProductPage;

export async function action({ request }) {
  const data = await request.formData();
  const user = extractTokenData();
  const sellerId = user["userId"];

  const productData = {
    productId: 0,
    name: data.get("name"),
    description: data.get("description"),
    price: data.get("price"),
    quantity: data.get("quantity"),
    image: data.get("img"),
    sellerId: sellerId,
  };

  const response = await fetch("https://localhost:7068/api/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAuthToken()}`,
    },
    body: JSON.stringify(productData),
  });

  if (
    response.status === 422 ||
    response.status === 401 ||
    response.status === 400 ||
    response.status === 403
  ) {
    return response;
  }

  if (!response.ok) {
    throw json(
      { message: response["message"] },
      { status: response["statusCode"] }
    );
  }

  return redirect("/dashboard/my-products");
}
