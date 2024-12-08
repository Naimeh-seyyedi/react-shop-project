import { Grid, Typography, Button } from "@mui/material";
import React from "react";
import TableOrder from "components/TableOrder";
import { Box } from "@mui/system";
import { useOrder } from "hook/useOrder";
import axios from "axios";
let moment = require("moment-jalaali");
function ModalOrder({ handleClose, inOrder, status }) {
  let id = inOrder.rowKey;
  const { data, loading, getPosts } = useOrder(`orders/${id}`, {
    headers: { token: localStorage.getItem("token") },
  });

  const handleStatus = async (data) => {
    console.log(data?.data);
    await axios.patch(
      `http://localhost:3002/orders/${id}`,
      { ...data, orderStatus: 6 },
      { headers: { token: localStorage.getItem("token") } }
    );
    // getPosts();
    handleClose();
  };
  return (
    <>
      {status === 3 ? (
        <Grid container>
          <Grid
            xs={12}
            sx={{ display: "flex", justifyContent: "space-around" }}
          >
            <Grid xs={6}>
              نام مشتری: {data?.data.customerDetail.firstName}{" "}
              {data?.data.customerDetail.lastName}{" "}
            </Grid>
            <Grid xs={6}>موبایل: {data?.data.customerDetail.mobile}</Grid>
          </Grid>
          <Grid xs={12}  sx={{ display: "flex", justifyContent: "space-around" }}>
            <Grid xs={6}>آدرس: {data?.data.customerDetail.address}</Grid>
            <Grid xs={6}>استان : {data?.data.customerDetail.city}</Grid>
          </Grid>

          <Grid xs={12}>
            {" "}
            تاریخ تحویل :{" "}
            {moment(data?.data?.customerDetail.datepicker).format(
              "jYYYY/jM/jD"
            )}
            {/* {new Date(data?.data?.customerDetail.datepicker).toLocaleTimeString("fa-IR")}{" "} */}
          </Grid>

          <TableOrder data={data} />
          <Grid xs={12} sx={{display:"flex" , justifyContent:"center" , margin:"10px"}}>
            <Button
              variant="contained"
              color="success"
             
              onClick={() => handleStatus(data)}
            >
              تحویل شد
            </Button>
          </Grid>
        </Grid>
      ) : (
        <Grid container>
          <Box sx={{ textAlign: "center" }}>
            <Grid xs={12}>
              نام مشتری: {data?.data.customerDetail.firstName}{" "}
              {data?.data.customerDetail.lastName}{" "}
            </Grid>
            <Grid xs={12}> آدرس: {data?.data.customerDetail.address} </Grid>
            <Grid xs={12}> موبایل: {data?.data.customerDetail.mobile} </Grid>
            <Grid xs={12}> استان : {data?.data.customerDetail.city} </Grid>
            <Grid xs={12}>
              {" "}
              تاریخ تحویل :{" "}
              {new Date(
                data?.data?.customerDetail.datepicker
              ).toLocaleTimeString("fa-IR")}{" "}
            </Grid>
          </Box>
          <TableOrder data={data} />
        </Grid>
      )}
    </>
  );
}

export default ModalOrder;
