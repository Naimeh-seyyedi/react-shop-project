import * as React from "react";
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link as LinkRoute } from "react-router-dom";
import InfoProduct from "./InfoProduct";

const BASE_URl = "http://localhost:3002";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function ProductCard({ dataGroup, nameproduct }) {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          borderBottom: "5px groove  blue",
        }}
      >
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {nameproduct}
        </Typography>
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2} justify="center">
          {dataGroup?.map((record) => {
            return (
              <InfoProduct record={record}/>
              
            );
          })}
        </Grid>
      </Box>
    </>
  );
}
