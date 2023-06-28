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
import moment from "moment/moment";
import { useNavigate } from "react-router-dom";

const lessThanOneHourAgo = (date) => {
  return moment(date).isAfter(moment().subtract(1, "hours"));
};

const OrderSellerItem = ({ order, time }) => {
  const navigate = useNavigate();

  const onDetailsHandler = () => {
    // prosledi ovde ovaj order

    navigate(`/dashboard/order-history/${order.orderId}`, { state: { order } });
  };
  const show = () => {
    if (time === "new") {
      return lessThanOneHourAgo(order.orderDate);
    } else if (time === "past") {
      return !lessThanOneHourAgo(order.orderDate);
    }
  };

  return (
    <>
      {order && show() && (

          <TableRow
            key={order.orderId}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell>{order.orderId}</TableCell>
            <TableCell>
              {moment(order.orderDate).format("DD-MM-YYYY HH:mm:ss")}
            </TableCell>
            <TableCell>{order.userBuyerId}</TableCell>
            <TableCell>{order.status}</TableCell>
            <TableCell>
              {moment(order.deliveryTime).format("DD-MM-YYYY HH:mm:ss")}
            </TableCell>
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

export default OrderSellerItem;
