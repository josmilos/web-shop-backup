import { ThemeProvider } from "@emotion/react";
import { UploadFileOutlined } from "@mui/icons-material";
import { Box, Button, TextField, Typography, createTheme } from "@mui/material";
import { useState } from "react";
import { Form, useActionData } from "react-router-dom";
import { DecodedImage } from "../DecodedImage";
import { StyledAvatar } from "../Buyer/ProductItemStyle";

const defaultTheme = createTheme();

const EditProductForm = ({ product }) => {
  const data = useActionData();
  const [productId, setproductId] = useState(product.productId);
  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState(product.price);
  const [quantity, setQuantity] = useState(product.quantity);
  const [image, setImage] = useState(product.image);

  const ImageEncode = (e) => {
    const files = e.target.files;
    const file = files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImage((reader.result.substring(reader.result.indexOf(',') + 1)));
    };
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
            width: "150%",
            display: "grid",
            gap: "1rem",
          }}
        >
          <div style={{display:'flex', justifyContent: 'center'}}>
        <StyledAvatar variant="square">
          <DecodedImage base64String={product.image} />
        </StyledAvatar>
        </div> 
          <Form method="patch">
            <div>
            <TextField
              label="Product ID"
              name="productId"
              value={productId}
              onChange={(e) => e.target.value = productId}
              fullWidth
              margin="normal"
              sx={{ width: "100%" }}
            />
            </div>
            <div><TextField
              label="Name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              fullWidth
              margin="normal"
              sx={{ width: "100%" }}
            /></div>
            <div><TextField
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
            /></div>
            <div>
            <TextField
              label="Price"
              type="number"
              value={price}
              name="price"
              onChange={(e) => {if(e.target.value >= 0){setPrice(e.target.value)}}}
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
            <Button
              component="label"
              variant="outlined"
              fullWidth
              startIcon={<UploadFileOutlined />}
              sx={{ marginRight: "2rem", marginTop: "1rem", width: "100%" }}
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
            <input type="text" value={image} name="img" id="img" readOnly hidden/>
            {data && data.message && (
            <Typography
              color={"#FF0000"}
              fontWeight={"bold"}
              style={{ textAlign: "center", width: '100%' }}
            >
              {data.message}
            </Typography>
          )}
            <div>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ mt: 3, mb: 2, width: "100%" }}
            >
              Save
            </Button>
            </div>
          </Form>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default EditProductForm;
