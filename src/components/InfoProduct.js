import * as React from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link as LinkRoute } from "react-router-dom";
const BASE_URl = "http://localhost:3002";

function InfoProduct({record}) {
  return (
    <Grid item xs={4} align="center">
      <LinkRoute to={`/product/${record.id}`}>
        <Card sx={{ maxWidth: 300, display: "flex" }}>
          <CardMedia
            component="img"
            height="150"
            image={`${BASE_URl}${record.images[0]}`}
            alt="green iguana"
            style={{ margin: "15px" }}
          />
          <CardContent>
            <Typography gutterBottom component="div">
              {record.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {record.price}
            </Typography>
            <CardActions>
              <Button size="small">بیشتر بخوانید...</Button>
            </CardActions>
          </CardContent>
        </Card>
      </LinkRoute>
    </Grid>
  );
}

export default InfoProduct;
