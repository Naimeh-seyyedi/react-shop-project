import React from "react";
import Caurosel from "components/Caurosel";
import WithOnlineShopLayout from "layout/WithOnlineShopLayout";
import SecondProductGroup from "components/SecondProductGroup"
import {
  AppBar,
  Box,
  Button,
  Container,
  Link,
  Toolbar,
  Typography,
} from "@mui/material";
import FirstProductGroup from "components/FirstProductGroup";

function Home() {
  return (
    <>
      <Container maxWidth="large">
        <Box
          sx={{
            width: 100,
            height: 80,
          }}
        />
        <Box >
          <Caurosel />
        </Box>
        <Box sx={{ bgcolor: "#fff", marginTop: "30px" }}>
          <Box sx={{ display: "flex" , justifyContent:"space-between" , borderBottom: "4px solid #05396a" }}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 , padding:"10px"}}>
              موبایل های برگزیده
            </Typography>
            <Link href="/products/moblie-list" sx={{textDecoration:"none" , }}>
            <Button color="inherit" sx={{ padding:"10px" ,color :"red"}}>مشاهده همه</Button>
            </Link>
          </Box>
          <FirstProductGroup />
        </Box>
        <Box sx={{ bgcolor: "#fff", marginTop: "30px" }}>
          <Box sx={{ display: "flex" , justifyContent:"space-between" , borderBottom: "4px solid #05396a"}}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 , padding:"10px"}}>
              لپ تاپ های برگزیده
            </Typography>
            <Link href="/products/laptop-list" sx={{textDecoration:"none" , }}>
            <Button color="inherit" sx={{ padding:"10px",color :"red"}}>مشاهده همه</Button>
            </Link>
         
          </Box>
          <SecondProductGroup />
        </Box>
      </Container>
    </>
  );
}

export default WithOnlineShopLayout(Home);
