import { Link as RouterLink } from "react-router-dom";
import React, { Fragment, useState } from "react";
import {
  Typography,
  Button,
  AppBar,
  CssBaseline,
  Toolbar,
  Box,
  ButtonBase,
} from "@mui/material";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { styled } from "@mui/material/styles";
import { Form, useRouteLoaderData } from "react-router-dom";
import HeaderCartButton from "./HeaderCartButton";
import Cart from "./Cart/Cart";
import CartProvider from "../store/CartProvider";

const CustomButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#53A7E1",
  color: "white",
  borderRadius: "25px",
  padding: "0.4rem 2.2rem",
  fontWeight: "bold",
  fontSize: "1.1rem",
  "&:hover, &:active": {
    backgroundColor: "#16273E",
  },
}));

function MainNavigation() {
  const token = useRouteLoaderData("root");
  const [CartIsShown, setCartIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  }

  const hideCartHandler = () => {
    setCartIsShown(false);
  }

  return (
    <Fragment>
      {CartIsShown && <Cart onClose={hideCartHandler}/>}
      <header>
        <CssBaseline />
        <AppBar position="relative">
          <Toolbar>
            <ButtonBase component={RouterLink} to={"/"}>
              <ShoppingBagOutlinedIcon />
              <Typography variant="h6">Web Shop</Typography>
            </ButtonBase>

            <Button
              variant="text"
              sx={{ my: 2, color: "white", display: "block", flex: 1 }}
              component={RouterLink}
              to={"dashboard"}
            >
              Dashboard
            </Button>
            <HeaderCartButton onShowCart={showCartHandler}/>
            <Box sx={{ marginLeft: "auto", marginLeft: 2 }}>
              {!token && (
                <CustomButton
                  variant="contained"
                  component={RouterLink}
                  to="log-in"
                >
                  Login
                </CustomButton>
              )}
              {token && (
                <Form action="/logout" method="post">
                  <CustomButton variant="outlined" sx={{ marginLeft: 2 }} type="submit">
                    Logout
                  </CustomButton>
                </Form>
              )}
            </Box>
          </Toolbar>
        </AppBar>
      </header>
    </Fragment>
  );
}

export default MainNavigation;
