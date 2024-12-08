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
import glass from "assets/images/glass/glass.jpg";
import React, {  useMemo, useRef, useState } from "react";
import { Link as LinkRoute } from "react-router-dom";
const BASE_URl = "http://localhost:3002";
function FirstProductGroup() {
  const limit = useRef(6);
  const [activePage, setActivePage] = useState(1);
  const { data, loading } = useFetch(
    `products?sub_category_id=4&sub_category_id=3&_limit=${limit.current}`
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
        <Grid container spacing={3} justify="center"  sx={{padding:2}} className="main-container" >
          {data?.data.map((record) => {
            return (
                <Grid item  sm={6}  md={4} lg={4} xs={12}  align="center" className="home-container" >
                   <LinkRoute to={`/product/${record.id}`}>
                  <Card sx={{ maxWidth: 500, display: "flex" ,height: "100%" }} className="card-container">
                    <CardMedia
                      component="img"
                      className="card-img"
                      height="150"
                      image={`${BASE_URl}${record.images[0]}`}
                      alt="green iguana"
                      style={{ margin: "15px" }}
                    />
                    <CardContent>
                      <Typography gutterBottom component="div" className="font-card">
                      {record.name} {record.model}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" className="font-card">
                        {record.price.toLocaleString()+" تومان "}
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
      )}
    </React.Fragment>
  );
}

export default FirstProductGroup;
