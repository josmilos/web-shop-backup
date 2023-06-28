import React from "react";
import { Link, useParams, useSubmit } from "react-router-dom";
import { Typography, Box, Paper, Button } from "@mui/material";
import { DecodedImage } from "../DecodedImage";
import { StyledAvatar } from "../Buyer/ProductItemStyle";

const ProductDetailsPage = ({ product }) => {
  const { productId } = useParams();
  const submit = useSubmit();

  function startDeleteHandler() {
    const proceed = window.confirm("Are you sure?");
    if (proceed) {
      submit(null, { method: "delete" });
    }
  }
  return (
    <div style={{display:'flex', justifyContent: 'center'}}>
    <Box sx={{ padding: "2rem" }}>
      <Box display="flex" gap="2rem" >
      <div style={{display:'flex', justifyContent: 'center'}}>
        <StyledAvatar variant="square">
          <DecodedImage base64String={product.image} />
        </StyledAvatar>
        </div>
        <div style={{display:'flex', justifyContent: 'center'}}>
        <Paper elevation={3} sx={{ padding: "1rem" }}>
          <Typography variant="h6" gutterBottom>
            ID: {product.productId}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Name: {product.name}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Description: {product.description}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Price: ${product.price}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Quantity: {product.quantity}
          </Typography>
          <Box mt={2} display="flex" gap={1}>
            <Button variant="contained" color="primary">
              <Link
                to={"edit"}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Edit
              </Link>
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={startDeleteHandler}
            >
              Delete
            </Button>
          </Box>
        </Paper>
        </div>
      </Box>
    </Box>
    </div>
  );
};

export default ProductDetailsPage;
