import React from "react";
import { useParams } from "react-router-dom";
import CancelIcon from "@mui/icons-material/Cancel";
import { Box, Grid, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import WithOnlineShopLayout from "layout/WithOnlineShopLayout";
import { Container } from "@mui/system";

function FailedCheckout() {
  const params = useParams();
  return (
    <Container sx={{ height: 300 }}>
      {" "}
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
          <CancelIcon sx={{ color: red[500], fontSize: 100 }} />
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6">
            پرداخت موفقیت آمیز نبود سفارش شما در انتظار پرداخت است
          </Typography>
        </Grid>
      </Box>
    </Container>
  );
}

export default WithOnlineShopLayout(FailedCheckout);
