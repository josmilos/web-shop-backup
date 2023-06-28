import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { Form, json, Navigate, useActionData, useNavigate } from "react-router-dom";
import { UploadFileOutlined } from "@mui/icons-material";
import { StyledAvatar } from "../Buyer/ProductItemStyle";
import { DecodedImage } from "../DecodedImage";

const defaultTheme = createTheme();

const ProductForm = () => {
  const data = useActionData();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [image, setImage] = useState("");

  const ImageEncode = (e) => {
    const files = e.target.files;
    const file = files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImage(reader.result.substring(reader.result.indexOf(",") + 1));
    };
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Perform any necessary form validation and handle form submission
    // Here, you can make API requests or perform other actions with the form data
    console.log({
      name,
      description,
      price,
      quantity,
      image,
    });

    // Reset form fields
    setName("");
    setDescription("");
    setPrice(0);
    setQuantity(0);
    setImage("");
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box
        sx={{
          marginTop: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          noValidate
          sx={{
            mt: 1,
            width: "200%",
            display: "grid",
            gap: "1rem",
          }}
        >
          {image && (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <StyledAvatar variant="square">
                <DecodedImage base64String={image} />
              </StyledAvatar>
            </div>
          )}

          <Form method="post">
            <div>
              <TextField
                label="Name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                fullWidth
                margin="normal"
                sx={{ width: "100%" }}
              />
            </div>
            <div>
              <TextField
                label="Description"
                value={description}
                name="description"
                onChange={(e) => setDescription(e.target.value)}
                required
                fullWidth
                multiline
                rows={4}
                margin="normal"
                sx={{ width: "100%" }}
              />
            </div>
<div>
            <TextField
              label="Price"
              type="number"
              value={price}
              name="price"
              onChange={(e) => {if(e.target.value >= 0){setPrice(e.target.value)}} }
              required
              fullWidth
              InputProps={{inputProps: {min: 0}}}
              margin="normal"
              sx={{ width: "100%" }}
            />
            </div>
            <div>
            <TextField
              label="Quantity"
              type="number"
              value={quantity}
              name="quantity"
              onChange={(e) => {if(e.target.value >= 0){setQuantity(e.target.value)}}}
              required
              fullWidth
              InputProps={{inputProps: {min: 0}}}
              margin="normal"
              sx={{ width: "100%" }}
            />
            </div>
            <div>
            <Button
              component="label"
              variant="outlined"
              fullWidth
              startIcon={<UploadFileOutlined />}
              sx={{ marginRight: "2rem", marginTop: "1rem", marginBottom:'1rem', width: "100%" }}
            >
              Upload Picture
              <input
                type="file"
                accept="image/*"
                id="imag"
                hidden
                onChange={(e) => ImageEncode(e)}
              />
            </Button>
            </div>
            <input
              type="text"
              value={image}
              name="img"
              id="img"
              readOnly
              hidden
            />
            {data && data.message && (
            <Typography
              color={"#FF0000"}
              fontWeight={"bold"}
              style={{ textAlign: "center" }}
            >
              {data.message}
            </Typography>
          )}
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ mt: 3, mb: 2, width: "100%" }}
            >
              Add Product
            </Button>
          </Form>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default ProductForm;
