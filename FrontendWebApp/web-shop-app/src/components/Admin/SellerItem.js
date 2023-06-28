import React from "react";
import {
  Typography,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Button,
} from "@mui/material";
import { json, redirect } from "react-router-dom";
import { getAuthToken } from "../../service/UserService/AuthService";

const SellerItem = ({ seller }) => {
  async function updateVerificationStatus(status) {
    const response = await fetch(
      "https://localhost:7068/api/users/verify-user/" + seller.userId,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${getAuthToken()}`,
        },
        body: JSON.stringify(status),
      }
    );

    if (
      response.status === 422 ||
      response.status === 401 ||
      response.status === 400 ||
      response.status === 403
    ) {
      return response;
    }
  else if(!response.ok) {
      throw json(
        { message: response["message"] },
        { status: response["statusCode"] }
      );
    }

    window.location.reload();
  }

  const handleVerify = async () => {
    await updateVerificationStatus("approve");
  };

  const handleDeny = async () => {
    await updateVerificationStatus("deny");
  };

  return (
    <>
      {seller && seller.userType !== 'admin' && (
        <TableRow key={seller.userId}>
          <TableCell>{seller.userId}</TableCell>
          <TableCell>{seller.userName}</TableCell>
          <TableCell>{seller.email}</TableCell>
          <TableCell>{seller.firstName}</TableCell>
          <TableCell>{seller.userType}</TableCell>
          <TableCell>{seller.verification}</TableCell>
          <TableCell style={{textAlign:'center'}}>
            {seller.userType === "seller" && (
              <>
                <Button
                sx={{mr: '1rem'}}
                  variant="contained"
                  disabled={
                    seller.verification === "verified" ||
                    seller.verification === "denied"
                  }
                  onClick={() => handleVerify()}
                >
                  Approve
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  disabled={
                    seller.verification === "verified" ||
                    seller.verification === "denied"
                  }
                  onClick={() => handleDeny()}
                >
                  Deny
                </Button>
              </>
            )}
          </TableCell>
        </TableRow>
      )}
    </>
  );
};

export default SellerItem;
