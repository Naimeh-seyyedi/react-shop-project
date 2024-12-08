import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import WithOnlineShopLayout from "layout/WithOnlineShopLayout";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseCart,
  getTotal,
  removeFromCart,
  increaseCart,
} from "redux/CartSlice";
import { Link as LinkRoute } from "react-router-dom";
import basket from "assets/images/basket/empty-cart.svg";
import { styled } from "@mui/material/styles";
import { Button, CardMedia, Grid, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import product from "components/Productlist/product";

const CardImg = styled("img")(({ theme }) => ({
  width: 150,
  height: 150,
}));

function ShoppingCard() {
  let location = useLocation();
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  console.log(cart)
  React.useEffect(() => {
    dispatch(getTotal());
  }, [cart, dispatch]);

  const handleRemove = (row) => {
    dispatch(removeFromCart(row));
  };

  const handeDecreaseCard = (row) => {
    
    dispatch(decreaseCart(row));
  };

  const handleIncreaseCard = (row) => {
    dispatch(increaseCart(row));
  };
  return (
    <>
      {cart.cartItems.length === 0 ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
            marginInline: 12,
            marginTop: "100px",
            padding: "50px",
            backgroundColor: "white",
          }}
        >
          <CardImg component="img" src={basket} />
          <Typography>کالایی در سبد خرید شما وجود ندارد </Typography>
          <LinkRoute to="/home">
            <Button variant="contained">بازگشت به فروشگاه</Button>
          </LinkRoute>
        </Box>
      ) : (
        <Container sx={{height: 300}}>
          {" "}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
              marginInline: 2,
              marginTop: "100px",
              
            }}
          >
            <TableContainer component={Paper}>
              <Table
                sx={{ minWidth: 650, minHeight: 100 }}
                size="small"
                aria-label="a dense table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>تصویر محصول</TableCell>
                    <TableCell>نام محصول</TableCell>
                    <TableCell>تعداد</TableCell>
                    <TableCell>قیمت</TableCell>
                    <TableCell>جمع</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody sx={{ position: "relative" }}>
                  {cart.cartItems.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell align="left">
                        {" "}
                        <img src={"http://localhost:3002" + row.product.thumbnail} />
                      </TableCell>
                      <TableCell align="left">
                        <LinkRoute to={`/product/${row.product.id}`}>
                          {row.product.model}
                        </LinkRoute>
                      </TableCell>
                      <TableCell align="left">
                        <Button onClick={() => handeDecreaseCard(row)}>
                          -
                        </Button>
                        {row.orderCount}
                        <Button onClick={() => handleIncreaseCard(row)}>
                          +
                        </Button>
                      </TableCell>
                      <TableCell align="left">
                        {row?.product.price?.toLocaleString() + " تومان "}
                      </TableCell>

                      <TableCell align="left">
                        {row?.totalRow?.toLocaleString() + " تومان "}
                      </TableCell>
                      <TableCell align="left">
                        <Button onClick={() => handleRemove(row)}> حذف </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              gap: 2,
              marginInline: 2,
              marginTop: "50px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                backgroundColor: "white",
                borderRadius: "5px",
                padding: "10px",
                gap: 2,
              }}
            >
              {" "}
              <Typography variant="h6">مجموع :</Typography>
              <Typography variant="h6">
                {cart.cartTotalAmount.toLocaleString() + " تومان "}
              </Typography>
            </Box>

            <Box>
              <LinkRoute to="/checkout/cart">
                <Button variant="contained" color="success">
                  {" "}
                  نهایی کردن سبد خرید{" "}
                </Button>
              </LinkRoute>
            </Box>
          </Box>
        </ Container>
      )}
    </>
  );
}
export default WithOnlineShopLayout(ShoppingCard);
