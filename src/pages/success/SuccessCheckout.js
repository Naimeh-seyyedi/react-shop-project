import { Box, Grid, Typography } from "@mui/material";
import WithOnlineShopLayout from "layout/WithOnlineShopLayout";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { removeFromBasket } from "redux/CartSlice";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import axios from "axios";
import { Container } from "@mui/system";
import { ApiAdmin } from "api/ApiAdmin";

function SuccessCheckout() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const params = useParams();

  const client = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    {
      cartItems.map(async (item) => {
        let newCount = item.product.inventory - item.orderCount;
        console.log(item);
        await ApiAdmin.postOrder(`orders`, {
          customerDetail: client,
          orderStatus: 3,
          cart,
        });
        await axios.patch(
          `http://localhost:3002/products/${item.product.id}`,
          { ...item.product, inventory: newCount },
          { headers: { token: localStorage.getItem("token") } }
        );
      });
    }

    localStorage.removeItem("cartItems");
    localStorage.removeItem("userInfo");
    dispatch(removeFromBasket());
  }, []);

  return (
    <Container sx={{ height: 300 }}>
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
        <Grid item xs={6}>
          <CheckCircleIcon color="success" sx={{ fontSize: 100 }} />
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6">
            {" "}
            با تشکر از پرداخت شما، سفارش شما ثبت شده و جهت هماهنگی ارسال با شما
            تماس گرفته خواهد شد
          </Typography>
        </Grid>
      </Box>
    </Container>
  );
}

export default WithOnlineShopLayout(SuccessCheckout);
