import { Fragment, useContext, useState } from "react";
import {
  ContainerCardGrid,
  StyledCard,
  StyledCardMedia,
  StyledCardContent,
} from "../ProductItemStyle";
import { Grid, Typography, ButtonBase, Icon, Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import CartContext from "../../store/cart-context";
import { DecodedImage } from "../DecodedImage";
import { StyledAvatar } from "./ProductItemStyle";

const ProductItem = ({ product }) => {
  const cartCtx = useContext(CartContext);
  const [dis, setDis] = useState(false);
  const addToCartHandler = () => {
    setDis(true);
    setTimeout(() => {
      if (cartCtx.products.length > 0) {
        cartCtx.products.forEach((pr) => {
          if (
            pr.productId === product.productId &&
            pr.quantity  >= product.quantity
          ) {
            setDis(true);
          } else {
            cartCtx.addProduct({
              productId: product.productId,
              name: product.name,
              description: product.description,
              price: product.price.toFixed(2),
              quantity: 1,
              image: product.image,
              sellerId: product.sellerId,
            });
            setDis(false);
          }
        });
      } else {
        cartCtx.addProduct({
          productId: product.productId,
          name: product.name,
          description: product.description,
          price: product.price.toFixed(2),
          quantity: 1,
          image: product.image,
          sellerId: product.sellerId,
        });
        setDis(false);
      }
    }, 1000);
  };

  return (
    <Fragment>
      {product.quantity > 0 && (
        <div style={{ textAlign: "center", whiteSpace: "nowrap" }}>
          <Grid container spacing={2}>
            <Grid item>
              <StyledCard>
                <StyledCardContent>
                  <StyledAvatar variant="square">
                    <DecodedImage base64String={product.image} />
                  </StyledAvatar>
                  <div style={{ textAlign: "center" }}>
                    <Typography
                      gutterBottom
                      variant="h5"
                      style={{ fontWeight: "bold", marginBottom: "0.5rem" }}
                    >
                      {product.name}
                    </Typography>
                    <Typography style={{ marginBottom: "0.5rem" }}>
                      {product.description}
                    </Typography>
                    <Typography style={{ marginBottom: "0.5rem" }}>
                      Price: {product.price}
                    </Typography>
                    <Typography style={{ marginBottom: "1rem" }}>
                      Available: {product.quantity}
                    </Typography>
                    <Button
                      onClick={addToCartHandler}
                      variant="outlined"
                      disabled={dis}
                      id="btn"
                    >
                      Add to Cart
                    </Button>
                  </div>
                </StyledCardContent>
              </StyledCard>
            </Grid>
          </Grid>
        </div>
      )}
    </Fragment>
  );
};

export default ProductItem;
