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
import moment from "moment";
import { useNavigate } from "react-router-dom";

const AOrderItem = ({ order }) => {
  const navigate = useNavigate();

  const onDetailsHandler = () => {
    // prosledi ovde ovaj order

    navigate(`/dashboard/order-history/${order.orderId}`, { state: { order } });
  };

  return (
    <>
      {order && (
        <TableRow key={order.orderId}>
          <TableCell>{order.orderId}</TableCell>
          <TableCell>
            {moment(order.orderDate).format("DD-MM-YYYY HH:mm:ss")}
          </TableCell>
          <TableCell>{order.status}</TableCell>
          <TableCell>{order.userBuyerId}</TableCell>
          <TableCell>{order.totalAmount}</TableCell>
          <TableCell>
            <Button variant="contained" onClick={onDetailsHandler}>
              Details
            </Button>
          </TableCell>
        </TableRow>
      )}
    </>
  );
};

export default AOrderItem;
