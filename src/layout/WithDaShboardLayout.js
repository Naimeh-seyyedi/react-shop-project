
import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import SidebarAdmin from "layout/withDashboardLayout/SidebarAdmin";
import HeaderAdmin from "layout/withDashboardLayout/HeaderAdmin";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function WithDaShboardLayout(Component) {
   return (props)=>(
    <>
      <HeaderAdmin />
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2} columns={16}>
          <Grid item xs={4}>
            <SidebarAdmin />
          </Grid>
          <Grid item xs={12}>
             <Component {...props}/>
          </Grid>
        </Grid>
      </Box>
      
    </>
  );
}

