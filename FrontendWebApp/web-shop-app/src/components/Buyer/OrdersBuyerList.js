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
import OrderBuyerItem from "./OrderBuyerItem";

const OrdersBuyerList = () => {
  const orders = useLoaderData();

  return (
    <Fragment>
      <TableContainer component={Paper}>
        <Table stickyHeader>
          <TableHead sx={{ display: "table-header-group" }}>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Delivery Time</TableCell>
              <TableCell>Total Amount</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <OrderBuyerItem
                order={order}
                key={order.orderId}
              ></OrderBuyerItem>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Fragment>
  );
};

export default OrdersBuyerList;
