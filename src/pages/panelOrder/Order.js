import {
  Box,
  CircularProgress,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useFetch } from "hook/useFetch";
import WithDaShboardLayout from "layout/WithDaShboardLayout";
import { useEffect, useMemo, useRef, useState } from "react";
import { Typography, Button } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { useOrder } from "hook/useOrder";
import DialogsOrder from "components/DialogsOrder";

let moment = require("moment-jalaali");

const Order = () => {
  const [showModal, setShowModal] = useState(false);
  const limit = useRef(3);
  const [activePage, setActivePage] = useState(1);
  const [status, setStatus] = useState(3);
  const { data, loading, getPosts } = useOrder(
    `orders?_page=${activePage}&_limit=${limit.current}`
  );
  const [inOrder, setInOrder] = useState({
    rowKey: null,
  });
  const handleClickOpen = (id) => {
    setShowModal(true);
    setInOrder({rowKey: id});
  };
  const handleClose = () => {
    setShowModal(false);
  };

  const hadleChange = (e) => {
  

    if (e.target.value === "waiting") {
      // setOrders(data?.data.filter((item) => item.orderStatus === 3));
      setStatus(3);
    } else if (e.target.value === "recived") {
      // setOrders(data?.data.filter((item) => item.orderStatus === 6));
      setStatus(6);
    }
    getPosts()
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          margin: "17px",
        }}
      >
        <Typography variant="h6">مدیریت سفارش ها </Typography>
        <>
          <FormControl>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              onChange={(e) => hadleChange(e)}
              defaultValue="waiting"
            >
              <FormControlLabel
                value="waiting"
                control={<Radio />}
                label="سفارش های در انتظار بررسی"
              />
              <FormControlLabel
                value="recived"
                control={<Radio />}
                label="سفارش های تحویل شده"
              />
            </RadioGroup>
          </FormControl>
        </>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          marginInline: 2,
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
                <TableCell> ردیف</TableCell>
                <TableCell>نام کاربر</TableCell>
                <TableCell>مجموع مبلغ</TableCell>
                <TableCell>زمان ثبت سفارش</TableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={{ position: "relative" }}>
              {loading ? (
                <Box
                  sx={{
                    position: "absolute",
                    background: "#fafafa",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <CircularProgress />
                </Box>
              ) : (
                <>
                  {data?.data
                    .filter((item) => item.orderStatus === status)
                    .map((record) => (
                      <TableRow key={record.id}>
                        <TableCell>{record.id}</TableCell>
                        <TableCell>
                          {record.customerDetail.firstName}{" "}
                          {record.customerDetail.lastName}
                        </TableCell>
                        <TableCell>
                          {record.cart.cartTotalAmount} تومان
                        </TableCell>
                        <TableCell>
                          {moment(record.orderDate).format("jYYYY/jM/jD")}
                        </TableCell>
                        <TableCell>
                          <Button onClick={() => handleClickOpen(record.id)}>
                            بررسی سفارش
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <Pagination
          variant="outlined"
          defaultPage={1}
          page={activePage}
          count={Math.ceil(data?.headers["x-total-count"] / limit.current)}
          onChange={(_, page) => setActivePage(page)}
        />
      </Box>

      {showModal ? (
        <DialogsOrder
          open={showModal}
          handleClose={handleClose}
          getPosts={getPosts}
          inOrder={inOrder}
          status={status}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default WithDaShboardLayout(Order);
