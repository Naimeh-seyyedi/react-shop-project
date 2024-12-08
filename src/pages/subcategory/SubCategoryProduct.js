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
import { Link as LinkRoute, useParams } from "react-router-dom";
import { styled } from "@mui/material/styles";

const BASE_URl = "http://localhost:3002";

function CategoryProduct() {
  const limit =useRef(6)
  const params = useParams();
  let categoryId = parseInt(params.subcategoryId);
  const [cat, setCat] = useState({});
  const [activePage, setActivePage] = useState(1);
  const { data, loading } = useFetch(
    `products?sub_category_id=${categoryId}&_page=${activePage}&_limit=${limit.current}`
  );

  useEffect(() => {
    (async () => {
      let response = await ApiAdmin.products(`subCategories?id=${categoryId}`);
      setCat(response.data);
    })();
  }, [categoryId]);

  const CardImg = styled("img")(({ theme }) => ({
    width: 150,
    height: 150,
    padding:"5px"
  }));

  return (
    <React.Fragment>
      {/* <CssBaseline /> */}
      {loading ? (
        <Box
          sx={{
            position: "absolute",
            background: "#F1F1F8",
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
            <Grid item xs={12}>
              <Typography sx={{ marginTop: 8 }}>
                {"دسته‌بندی " + cat[0]?.name}
              </Typography>
            </Grid>
            {data?.data.map((record) => {
              return (
                <Grid item xs={4} align="center">
                  <LinkRoute to={`/product/${record.id}`}>
                    <Card
                      sx={{
                        maxWidth: 300,
                        display: "flex",
                        height: "100%",
                        flexDirection: "column",
                        alignItems:"center"
                      }}
                    >
                      <CardImg
                        component="img"
                        src={`${BASE_URl}${record.images[0]}`}
                        alt="category mobile"
                       
                      />
                      <CardContent sx={{textAlign:"left"}}>
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

export default WithSideBar(CategoryProduct);
