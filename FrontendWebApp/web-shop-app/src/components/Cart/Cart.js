import React, { useContext, useEffect, useState } from "react";
import Modal from "./Modal";
import {
  Alert,
  Box,
  Button,
  TextField,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import { Height } from "@mui/icons-material";
import {
  extractTokenData,
  getAuthToken,
} from "../../service/UserService/AuthService";
import { useActionData, json, redirect, useNavigate } from "react-router-dom";
import dayjs from "dayjs";

const SHIPPING_COST = 5;

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const [response, setResponse] = useState({});
  const [isClicked, setIsClicked] = useState(false);
  const [address, setAddress] = useState("");
  const [comment, setComment] = useState("");
  const navigate = useNavigate();

  async function createNewOrder({ request }) {
    const { userId } = extractTokenData();
    const d = new Date();
    const date = new Date(d.getTime() - d.getTimezoneOffset() * 60000);

    // Calculate the maximum time (current time + 24 hours)
    const maxTime = new Date(date.getTime() + 24 * 60 * 60 * 1000);

    // Generate a random time between current time and max time
    const deliveryTime = new Date(
      date.getTime() + Math.random() * (maxTime.getTime() - date.getTime())
    );

    const newOrder = {
      orderId: 0,
      comment: comment,
      address: address,
      orderDate: date.toISOString(),
      userBuyerId: userId,
      totalAmount: (
        cartCtx.totalAmount +
        SHIPPING_COST * cartCtx.sellers.length
      ).toFixed(2),
      sellerCount: cartCtx.sellers.length,
      status: "active",
      deliveryTime: deliveryTime.toISOString(),
      products: cartCtx.products,
    };
    const response = await fetch("https://localhost:7068/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAuthToken()}`,
      },
      body: JSON.stringify(newOrder),
    });

    if (
      response.status === 422 ||
      response.status === 401 ||
      response.status === 400 ||
      response.status === 403
    ) {
      let res = await response.json();
      return res;
    } else if (!response.ok) {
      throw json({ message: "Server error" }, { status: 500 });
    } else {
      props.onClose();
      cartCtx.products.splice(0, cartCtx.products.length);
      cartCtx.totalAmount = 0;
      navigate("/dashboard/order-history");
    }
  }

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.products.length > 0;

  const cartProductRemoveHandler = (productId) => {
    cartCtx.removeProduct(productId);
  };
  const cartProductAddHandler = (product) => {
    cartCtx.addProduct({ ...product, quantity: 1 });
  };

  const cartItems = (
    <ul
      style={{
        listStyle: "none",
        margin: 0,
        padding: 0,
        maxHeight: "20rem",
        overflow: "scroll",
      }}
    >
      {cartCtx.products.map((product) => (
        <CartItem
          key={product.productId}
          name={product.name}
          quantity={product.quantity}
          price={product.price}
          onRemove={cartProductRemoveHandler.bind(null, product.productId)}
          onAdd={cartProductAddHandler.bind(null, product)}
        />
      ))}
    </ul>
  );

  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div
        style={{
          textAlign: "right",
          fontWeight: "bold",
          fontSize: "1.5rem",
          margin: "1rem 0",
        }}
      >
        <div>
          <span style={{ marginRight: "15px" }}>Amount:</span>
          <span>{`${totalAmount}`}</span>
        </div>
        <div>
          <span style={{ marginRight: "15px" }}>Shipping Cost:</span>
          <span>{`$${cartCtx.sellers.length * SHIPPING_COST}`}</span>
        </div>
        <div>
          <span style={{ marginRight: "15px" }}>Total Amount:</span>
          <span>{`$${(
            cartCtx.totalAmount +
            SHIPPING_COST * cartCtx.sellers.length
          ).toFixed(2)}`}</span>
        </div>
      </div>
      {hasItems && !isClicked && (
        <div
          style={{
            textAlign: "right",
          }}
        >
          <Button
            variant="outlined"
            style={{
              cursor: "pointer",
              backgroundColor: "transparent",
              border: "1px solid #16273E",
              padding: "0.35rem 2rem",
              borderRadius: "25px",
              marginLeft: "1rem",
              marginBottom: "1rem",
              color: "#233B58",
            }}
            onClick={props.onClose}
          >
            Close
          </Button>

          <Button
            variant="contained"
            style={{
              cursor: "pointer",
              backgroundColor: "#3D70B2",
              color: "white",
              padding: "0.7rem 2.5rem",
              borderRadius: "25px",
              marginLeft: "1rem",
              transition: "background-color 0.3s ease",
            }}
            onClick={() => setIsClicked(true)}
          >
            Order
          </Button>
        </div>
      )}
      {hasItems && isClicked && (
        <div
          style={{
            textAlign: "right",
            display: "block",
            width: "30%",
            justifyContent: "end",
            marginLeft: "70%",
          }}
        >
          <>
            <div style={{ marginBottom: "1rem" }}>
              <TextField
                name="address"
                label="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                fullWidth
              />
            </div>
            <div style={{ marginBottom: "1rem" }}>
              <TextareaAutosize
                name="comment"
                placeholder="Comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                minRows={3}
                style={{ resize: "vertical", width: "100%" }}
              />
            </div>
          </>

          <div style={{ display: "inline" }}>
            {response && response.message && (
              <Typography
                color={"#FF0000"}
                fontWeight={"bold"}
                style={{ textAlign: "right" }}
                value={response.message}
                sx ={{mb: '1rem'}}
              >
                {response.message}
              </Typography>
            )}
          </div>
          <div
            style={{
              display: "inline",
              flexDirection: "column",
              justifyContent: "end",
            }}
          >
            <Button
              variant="outlined"
              style={{
                cursor: "pointer",
                backgroundColor: "transparent",
                border: "1px solid #16273E",
                padding: "0.35rem 2rem",
                borderRadius: "25px",
                marginLeft: "1rem",
                color: "#233B58",
              }}
              onClick={props.onClose}
            >
              Close
            </Button>
            <Button
              variant="contained"
              type="button"
              style={{
                cursor: "pointer",
                backgroundColor: "#3D70B2",
                color: "white",
                padding: "0.7rem 2.5rem",
                borderRadius: "25px",
                marginLeft: "1rem",
                transition: "background-color 0.3s ease",
              }}
              onClick={async () => {
                const res = await createNewOrder({ request: {} });
                setResponse(res);
              }}
            >
              Confirm
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
};
export default Cart;
