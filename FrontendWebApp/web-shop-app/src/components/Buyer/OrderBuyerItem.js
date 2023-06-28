import React, { useState } from "react";
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
import { Navigate, json, useNavigate } from "react-router-dom";
import { getAuthToken } from "../../service/UserService/AuthService";

const lessThanOneHourAgo = (date) => {
  return moment(date).isAfter(moment().subtract(1, "hours"));
};

const OrderBuyerItem = ({ order }) => {
  const navigate = useNavigate();
  const [responseMessage, setResponseMessage] = useState("");
  const onCancelHandler = async () => {
    if (lessThanOneHourAgo(order.orderDate) && order.status === "active") {
      const res = await cancelOrder(order);
      if(res && res.message){
        setResponseMessage(res.message);
      }
      
    } else {
      console.log("PROSLO 1 SAT");
    }
  };

  const onDetailsHandler = () => {
    // prosledi ovde ovaj order

    navigate(`/dashboard/order-history/${order.orderId}`, { state: { order } });
  };

  return (
    <>
      {order && (
        <TableRow
          key={order.orderId}
          sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
        >
          <TableCell >{order.orderId}</TableCell>
          <TableCell>
            {moment(order.orderDate).format("DD-MM-YYYY HH:mm:ss")}
          </TableCell>
          <TableCell >{order.status}</TableCell>
          <TableCell >
            {moment(order.deliveryTime).format("DD-MM-YYYY HH:mm:ss")}
          </TableCell>
          <TableCell >${order.totalAmount}</TableCell>
          <TableCell >
            <Button variant="contained" onClick={onDetailsHandler}>
              Details
            </Button>
          </TableCell>
          <TableCell >
            <Button
              variant="contained"
              color="error"
              onClick={onCancelHandler}
              disabled={
                order.status === "cancelled" ||
                !lessThanOneHourAgo(order.orderDate)
              }
            >
              Cancel
            </Button>
            {responseMessage && (
              <Typography variant="body2" color="error">
                {responseMessage}
              </Typography>
            )}
          </TableCell>
        </TableRow>
      )}
    </>
  );
};

export default OrderBuyerItem;

export async function cancelOrder(props) {
  const data = {
    orderId: 0,
    status: "cancelled",
  };

  const response = await fetch(
    "https://localhost:7068/api/orders/" + props.orderId,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${getAuthToken()}`,
      },
      body: JSON.stringify(data),
    }
  );

  
  if (
    response.status === 422 ||
    response.status === 401 ||
    response.status === 400 ||
    response.status === 403 ||
    response.status === 500
  ) {
    const resData = await response.json();
    return resData;
  }
  if (!response.ok) {
    throw json({ message: "Could not patch order." }, { status: 500 });
  }

  window.location.reload();
}
