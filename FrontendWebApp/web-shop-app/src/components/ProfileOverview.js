import React, { useEffect, useState } from "react";
import { Form, useLoaderData, useActionData } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  Avatar,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { ImageEncode } from "../service/ImageConverter";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DecodedImage } from "./DecodedImage";
import styled from "@emotion/styled";

const defaultTheme = createTheme();
const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: "180px",
  height: "180px",
}));

const ProfileOverview = () => {
  const user = useLoaderData();
  const data = useActionData();
  const [image, setImage] = useState(user.image);
  const [date, setDate] = useState(user.dateOfBirth);


  const ImageEncode = (e) => {
    const files = e.target.files;
    const file = files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImage(reader.result.substring(reader.result.indexOf(",") + 1));
    };
  };

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    userId: user.userId,
    username: user.userName,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    address: user.address,
    dateOfBirth: user.dateOfBirth,
    password: "",
    userType: user.userType,
    image: user.image,
    verificationStatus: user.verification,
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    // Perform save logic here
  };

  const handleChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center", // Added justifyContent to center the content
            py: 4,
          }}
        >
          <Box
            noValidate
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              alignItems: "center",
            }}
          >
            <StyledAvatar sx={{ justifyContent: "center" }}>
              <DecodedImage base64String={user.image} />
            </StyledAvatar>

            <Form method="patch">
              <TextField
                label="User ID"
                value={formData.userId}
                disabled
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                label="Username"
                value={formData.username}
                disabled
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                label="Email Address"
                value={formData.email}
                disabled
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
              required
                label="First Name"
                value={formData.firstName}
                disabled={!isEditing}
                fullWidth
                name="firstName"
                onChange={handleChange}
                sx={{ mb: 2 }}
              />
              <TextField  required
                label="Last Name"
                value={formData.lastName}
                disabled={!isEditing}
                fullWidth
                name="lastName"
                onChange={handleChange}
                sx={{ mb: 2 }}
              />
              <TextField
              required
                label="Address"
                value={formData.address}
                disabled={!isEditing}
                fullWidth
                name="address"
                onChange={handleChange}
                sx={{ mb: 2 }}
              />
              <Grid item xs={12} sx={{ mb: 2 }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <input
                  required
                    type="date"
                    name="date"
                    disabled={!isEditing}
                    value={date.slice(0, 10)}
                    onChange={(e) => setDate(e.target.value)}
                    style={{
                      width: "100%", // Stretch the input field to match other fields
                      boxSizing: "border-box", // Include padding and border in the width
                      padding: "10px", // Adjust the padding as needed
                      border: "1px solid #ccc", // Add a border if desired
                      borderRadius: "4px", // Add border radius if desired
                    }}
                  ></input>
                </LocalizationProvider>
              </Grid>
              <TextField
                label="Password"
                value={formData.password}
                disabled={!isEditing}
                fullWidth
                name="password"
                type="password"
                onChange={handleChange}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Type of User"
                value={formData.userType}
                disabled
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                label="Verification Status"
                value={formData.verificationStatus}
                disabled
                fullWidth
                sx={{ mb: 2 }}
              />

              {isEditing ? (
                <>
                  <Grid item xs={12}>
                    <input
                      type="file"
                      accept="image/*"
                      id="imag"
                      style={{ display: "none" }}
                      onChange={(e) => ImageEncode(e)}
                    />
                    <label htmlFor="imag">
                      <Button
                        component="span"
                        variant="outlined"
                        startIcon={<UploadFileIcon />}
                        sx={{
                          marginRight: "2rem",
                          mb: 2,
                          display: "flex",
                          justifyContent: "center", // Center the icon horizontally
                          alignItems: "center", // Center the icon vertically
                          width: "100%",
                        }} // Stretch the button to match other fields }}
                      >
                        Upload Picture
                      </Button>
                    </label>
                  </Grid>
                  <div style={{ display:'inline-block'}}>
                  {data && data.message && (
            <Typography
              color={"#FF0000"}
              fontWeight={"bold"}
              style={{ textAlign: "center"}}
            >
              {data.message}
            </Typography>
          )}
          </div>
                  <Button variant="contained" type="submit" fullWidth>
                    Save
                  </Button>
                </>
              ) : (
                <Button variant="contained" onClick={handleEdit} fullWidth>
                  Edit
                </Button>
              )}
              <input
                type="text"
                value={image}
                name="img"
                id="img"
                readOnly
                hidden
              />
            </Form>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default ProfileOverview;
