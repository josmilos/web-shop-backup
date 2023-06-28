import { Button, Typography } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { styled } from "@mui/material/styles";
import { extractTokenData } from "../service/UserService/AuthService";
import { Fragment, useContext } from "react";
import CartContext from "../store/cart-context";

const CustomButton = styled(Button)(({ theme }) => ({
  cursor: "pointer",
  font: "inherit",
  border: "none",
  backgroundColor: "#233B58",
  color: "white",
  padding: "0.5rem 1.5rem",
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  borderRadius: "25px",
  fontWeight: "bold",
  "&:hover, &:active": {
    backgroundColor: "#16273E",
  },
  "& .icon": {
    width: "1.1rem",
    height: "1.1rem",
    marginRight: "0.4rem",
  },
  "& .badge": {
    backgroundColor: "#3D70B2",
    padding: "0.25rem 1rem",
    borderRadius: "25px",
    marginLeft: "1rem",
    fontWeight: "bold",
  },
  "&:hover .badge, &:active .badge": {
    backgroundColor: "#2C5AA0",
  },
  "& .bump": {
    animation: "bump 300ms ease-out",
  },
  "@keyframes bump": {
    "0%": {
      transform: "scale(1)",
    },
    "10%": {
      transform: "scale(0.9)",
    },
    "30%": {
      transform: "scale(1.1)",
    },
    "50%": {
      transform: "scale(1.15)",
    },
    "100%": {
      transform: "scale(1)",
    },
  },
}));

const HeaderCartButton = (props) => {
  const cartCtx =useContext(CartContext);
  const numberOfItems = cartCtx.products.reduce((curNumber, product) => {return curNumber + product.quantity}, 0);
  const auth = extractTokenData();
  let userType = "";
  if (auth) {
    userType = auth["userType"];
  }

  return (
    <Fragment>
      {userType && userType === "buyer" && (
        <CustomButton onClick={props.onShowCart}>
          <ShoppingCartIcon className="icon" />
          Your Cart
          <Typography
            className="badge bump"
            variant="body1"
            style={{ color: "white" }}
          >
            {numberOfItems}
          </Typography>
        </CustomButton>
      )}
    </Fragment>
  );
};

export default HeaderCartButton;
