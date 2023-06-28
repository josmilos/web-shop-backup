import { Fragment } from "react";
import { useLoaderData } from "react-router-dom";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import OrderSellerItem from "./OrderSellerItem";

const OrdersSellerList = (props) => {
  const orders = useLoaderData();
  return (
    <Fragment>
      <TableContainer component={Paper}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Buyer ID</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Delivery Time</TableCell>
              <TableCell>Total Amount</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <OrderSellerItem
                order={order}
                key={order.orderId}
                time={props.time}
              ></OrderSellerItem>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Fragment>
  );
};

export default OrdersSellerList;
