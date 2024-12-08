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
  TextField,
} from "@mui/material";
import { useFetch } from "hook/useFetch";
import WithDaShboardLayout from "layout/WithDaShboardLayout";
import { useMemo, useRef, useState } from "react";
import { Typography, Button } from "@mui/material";
import { ApiAdmin } from "api/ApiAdmin";
import EasyEdit from "react-easy-edit";
import axios from "axios";

const Quantity = () => {
  const limit = useRef(5);
  const [activePage, setActivePage] = useState(1);
  const { data, loading, getPosts } = useFetch(
    `products?_page=${activePage}&_limit=${limit.current}`
  );
  const [inEditMode, setInEditMode] = useState({
    status: false,
    rowKey: null,
  });
  const [unitPrice, setUnitPrice] = useState(null);
  const [unitInventory, setUnitInventory] = useState(null);

  const saveCount = async (e, record) => {
    if (e > 0) {
      await axios.patch(
        `http://localhost:3002/products/${record.id}`,
        { ...record, inventory: e },
        { headers: { token: localStorage.getItem("token") } }
      );
    } else {
      alert("تعداد بزرگتر از صفر باشد");
    }
  };

  const savePrice=async (e, record) => {
    if (e > 0) {
      await axios.patch(
        `http://localhost:3002/products/${record.id}`,
        { ...record, price: e },
        { headers: { token: localStorage.getItem("token") } }
      );
    } else {
      alert(" قیمت مناسب راوارد کنید");
    }
  };
  const cancel = () => {alert("Cancelled")}

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
        <Typography variant="h6">مدیریت موجودی و قیمت ها </Typography>
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
                <TableCell>ردیف</TableCell>
                <TableCell>کالا</TableCell>
                <TableCell>قیمت</TableCell>
                <TableCell>موجودی </TableCell>
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
                  {data?.data.map((record) => {
                    console.log(record);
                    return (
                      <TableRow key={record.id}>
                        <TableCell>{record.id}</TableCell>
                        <TableCell>{record.model}</TableCell>
                        <TableCell>
                        <EasyEdit
                            type="text"
                            onSave={(e) => savePrice(e, record)}
                            onCancel={cancel}
                            saveButtonLabel="دخیره"
                            cancelButtonLabel="لغو"
                            attributes={{ name: "awesome-input", id: 1 }}
                            value={record?.price.toLocaleString()+" تومان "}
                          />
                        </TableCell>
                        <TableCell>
                          <EasyEdit
                            type="text"
                            onSave={(e) => saveCount(e, record)}
                            onCancel={cancel}
                            saveButtonLabel="دخیره"
                            cancelButtonLabel="لغو"
                            attributes={{ name: "awesome-input", id: 1 }}
                            value={record?.inventory}
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })}
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
    </>
  );
};

export default WithDaShboardLayout(Quantity);
