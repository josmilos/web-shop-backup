import React, { useState, useEffect } from "react";
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
  const [countdown, setCountdown] = useState("");

  useEffect(() => {
    const intervalId = setInterval(() => {
      updateCountdown();
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const updateCountdown = () => {
    const deliveryTime = moment(order.deliveryTime);
    const currentTime = moment();
    const duration = moment.duration(deliveryTime.diff(currentTime));
    const hours = Math.floor(duration.asHours()).toString().padStart(2, "0");
    const minutes = duration.minutes().toString().padStart(2, "0");
    const seconds = duration.seconds().toString().padStart(2, "0");

    let formattedCountdown = "";
    if (duration.asMilliseconds() <= 0) {
      formattedCountdown = "Delivered";
    } else {
      formattedCountdown = `${hours}:${minutes}:${seconds}`;
    }
    setCountdown(formattedCountdown);
  };

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
          <TableCell>{order.status==="active" ? (countdown || "Loading...") : "Cancelled" }</TableCell>
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
