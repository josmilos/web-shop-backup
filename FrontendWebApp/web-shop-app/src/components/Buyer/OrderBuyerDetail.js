import React from "react";
import { Typography, Grid } from "@mui/material";
import { useLocation } from "react-router-dom";
import { extractTokenData } from "../../service/UserService/AuthService";
import { DecodedImage } from "../DecodedImage";
import PageContent from "../PageContent";
import { StyledCard, StyledCardContent } from "../ProductItemStyle";
import { StyledAvatar } from "./ProductItemStyle";

const content = {
  title: "Order Details",
  description: "",
};

const OrderBuyerDetail = () => {
  const location = useLocation();
  const { userType } = extractTokenData();
  const { order } = location.state;
  return (
    <>
      <PageContent content={content} />

      <div
        style={{
          justifyContent: "center",
          display: "block",
          textAlign: "center",
        }}
      >
        <Typography variant="h6" style={{ marginBottom: "1rem" }}>
          Order Information
        </Typography>
        <Typography style={{ marginBottom: "0.5rem" }}>
          Order ID: {order.orderId}
        </Typography>
        <Typography style={{ marginBottom: "0.5rem" }}>
          Comment: {order.comment}
        </Typography>
        <Typography style={{ marginBottom: "0.5rem" }}>
          Address: {order.address}
        </Typography>
        <Typography style={{ marginBottom: "0.5rem" }}>
          Order Date: {new Date(order.orderDate).toLocaleString()}
        </Typography>
        {(userType === "seller" || userType === "admin") && (
          <Typography style={{ marginBottom: "0.5rem" }}>
            Buyer ID: {order.userBuyerId}
          </Typography>
        )}

        <Typography style={{ marginBottom: "0.5rem" }}>
          Total Amount (incl. shipping): ${order.totalAmount}
        </Typography>
        <Typography style={{ marginBottom: "0.5rem" }}>
          Status: {order.status}
        </Typography>
        <Typography style={{ marginBottom: "2rem" }}>
          Delivery Time: {new Date(order.deliveryTime).toLocaleString()}
        </Typography>

        <Typography variant="h3" style={{ marginBottom: "1rem" }}>
          Products
        </Typography>
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <div
          style={{ textAlign: "center", whiteSpace: "nowrap", display: "flex" }}
        >
          {order.products.map((product) => (
            <Grid container spacing={2} key={product.productId}>
              <Grid item>
                <StyledCard>
                  <StyledCardContent>
                    <StyledAvatar variant="square">
                      <DecodedImage base64String={product.image} />
                    </StyledAvatar>
                    <div style={{ textAlign: "center" }}>
                      <Typography
                        variant="h5"
                        style={{ fontWeight: "bold", marginBottom: "0.5rem" }}
                      >
                        {product.name}
                      </Typography>
                      <Typography style={{ marginBottom: "0.5rem" }}>Product ID: {product.productId}</Typography>
                      {userType === "buyer" ||
                        (userType === "admin" && (
                          <Typography style={{ marginBottom: "0.5rem" }}>Seller ID: {product.sellerId}</Typography>
                        ))}

                      <Typography style={{ marginBottom: "0.5rem" }}>
                        Description: {product.description}
                      </Typography>
                      <Typography style={{ marginBottom: "0.5rem" }}>
                        Price: ${product.price}
                      </Typography>
                      <Typography>
                        Quantity: {product.quantity}
                      </Typography>
                    </div>
                  </StyledCardContent>
                </StyledCard>
              </Grid>
            </Grid>
          ))}
        </div>
      </div>
    </>
  );
};

export default OrderBuyerDetail;
