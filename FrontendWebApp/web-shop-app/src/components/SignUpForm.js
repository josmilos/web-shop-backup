import React, { useState } from "react";
import {
  Button,
  Grid,
  Typography,
  Box,
  Container,
  Avatar,
  TextField,
  Autocomplete,
  CssBaseline,
  Link,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import GoogleButton from "../components/GoogleButton";
import { GoogleLogin } from "@react-oauth/google";
import { Form, useActionData } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers";

const defaultTheme = createTheme();
const minDate = dayjs(new Date(1910, 1, 1));
const userType = ["Buyer", "Seller"];

const SignUpForm = () => {
  const data = useActionData();

  const [date, setDate] = useState();
  const [image, setImage] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);

  const ImageEncode = (e) => {
    const files = e.target.files;
    const file = files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImage(reader.result.substring(reader.result.indexOf(",") + 1));
    };
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordMatch(value === passwordConfirm);
  };

  const handlePasswordConfirmChange = (e) => {
    const value = e.target.value;
    setPasswordConfirm(value);
    setPasswordMatch(value === password);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          {data && data.message && (
            <Typography
              color={"#FF0000"}
              fontWeight={"bold"}
              style={{ textAlign: "center" }}
            >
              {data.message}
            </Typography>
          )}

          <Box noValidate sx={{ mt: 3 }}>
            <Form method="post">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    name="username"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <input
                      required
                      type="date"
                      name="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      style={{
                        width: "100%", // Stretch the input field to match other fields
                        boxSizing: "border-box", // Include padding and border in the width
                        padding: "10px", // Adjust the padding as needed
                        border: "1px solid #ccc", // Add a border if desired
                        borderRadius: "4px", // Add border radius if desired
                      }}
                      min={"1910-01-01"}
                    ></input>
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="address"
                    label="Address"
                    name="address"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password-confirm"
                    label="Repeat Password"
                    type="password"
                    id="password-confirm"
                    value={passwordConfirm}
                    onChange={handlePasswordConfirmChange}
                    error={!passwordMatch}
                    helperText={!passwordMatch && "Passwords do not match"}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Autocomplete
                    required
                    disablePortal
                    id="combo-box-demo"
                    options={userType}
                    sx={{
                      width: "100%", // Stretch the drop-down box to match other fields
                      display: "flex",
                      justifyContent: "center", // Center the options horizontally
                    }}
                    renderInput={(params) => (
                      <TextField {...params} label="User Type" name="type" />
                    )}
                  />
                </Grid>
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
                        display: "flex",
                        justifyContent: "center", // Center the icon horizontally
                        alignItems: "center", // Center the icon vertically
                        width: "100%", // Stretch the button to match other fields
                      }}
                    >
                      Upload Picture
                    </Button>
                  </label>
                </Grid>
                <input
                  type="text"
                  defaultValue={image}
                  name="img"
                  id="img"
                  hidden
                />
              </Grid>
              <Button
                fullWidth
                variant="contained"
                type="submit"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
            </Form>
            <Typography
              align="center"
              sx={{ mb: "0.5rem" }}
              fontWeight={"bold"}
              color={"#3D70B2"}
            >
              Or
            </Typography>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: '0.5rem' }}>
              <GoogleButton />
            </div>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="log-in" variant="body2">
                  Already have an account? Log in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default SignUpForm;
