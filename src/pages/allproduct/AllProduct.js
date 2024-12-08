import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Container,
  CssBaseline,
  Grid,
  Pagination,
  Typography,
} from "@mui/material";
import { ApiAdmin } from "api/ApiAdmin";
import MobileCard from "components/ProductCard";
import { useFetch } from "hook/useFetch";
import WithOnlineShopLayout from "layout/WithOnlineShopLayout";
import WithSideBar from "layout/WithSideBar";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link as LinkRoute } from "react-router-dom";
const BASE_URl = "http://localhost:3002";

function AllProduct() {
  const limit = useRef(6);
  const [activePage, setActivePage] = useState(1);
  const { data, loading, getPosts } = useFetch(
    `products?category_id=1&category_id=2&_page=${activePage}limit=${limit.current}`
  );

  return (
    <React.Fragment>
      {/* <CssBaseline /> */}
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
          <Grid container spacing={2} sx={{ padding: 2 }}>
            {data?.data.map((record) => {
              return (
                <Grid item xs={4} align="center">
                  <LinkRoute to={`/product/${record.id}`}>
                    <Card
                      sx={{ maxWidth: 500, display: "flex", height: "100%" }}
                    >
                      <CardMedia
                        component="img"
                        height="150"
                        image={`${BASE_URl}${record.images[0]}`}
                        alt="green iguana"
                        style={{ margin: "15px" }}
                      />
                      <CardContent>
                        <Typography gutterBottom component="div">
                          {record.name} {record.model}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {record.price.toLocaleString() + " تومان "}
                        </Typography>
                        <CardActions>
                          <Button size="small">بیشتر بخوانید...</Button>
                        </CardActions>
                      </CardContent>
                    </Card>
                  </LinkRoute>
                </Grid>
              );
            })}
          </Grid>
          <Pagination
            variant="outlined"
            defaultPage={1}
            page={activePage}
            count={Math.ceil(data?.headers["x-total-count"] / limit.current)}
            onChange={(_, page) => setActivePage(page)}
          />
        </>
      )}
    </React.Fragment>
  );
}

export default WithSideBar(AllProduct);
