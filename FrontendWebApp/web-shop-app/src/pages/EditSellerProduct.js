import { Fragment } from "react";
import EditProductForm from "../components/Seller/EditProductForm";
import PageContent from "../components/PageContent";
import { json, redirect, useRouteLoaderData } from "react-router-dom";
import { getAuthToken } from "../service/UserService/AuthService";

const content = {
  title: "Edit Product",
  description: "Edit details of your product.",
};

const EditSellerProductPage = () => {
  const data = useRouteLoaderData("product-detail");
  return (
    <Fragment>
      <PageContent content={content} />
      <div style={{ display: "flex", justifyContent:'center' }}>
        <EditProductForm product={data} />
      </div>
    </Fragment>
  );
};

export default EditSellerProductPage;

export async function action({ request }) {
  const data = await request.formData();

  const productData = {
    productId: data.get("productId"),
    name: data.get("name"),
    description: data.get("description"),
    price: data.get("price"),
    quantity: data.get("quantity"),
    image: data.get("img"),
    sellerId: 0,
  };
  const response = await fetch(
    "https://localhost:7068/api/products/" + productData.productId,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${getAuthToken()}`,
      },
      body: JSON.stringify(productData),
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

  return redirect("/dashboard/my-products");
}
