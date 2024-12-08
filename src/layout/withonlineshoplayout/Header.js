import React from "react";
import DrawerProducts from "layout/withonlineshoplayout/header/DrawerProducts";
import Menu from "layout/withonlineshoplayout/header/Menu";
import DrawerAdmin from "layout/withonlineshoplayout/header/DrawerAdmin";
import {
  Grid,
  Tab,
  Toolbar,
  InputBase,
  CssBaseline,
  useTheme,
  useMediaQuery,
  Link,
  Badge,
} from "@mui/material";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import LocalGroceryStoreOutlinedIcon from "@mui/icons-material/LocalGroceryStoreOutlined";
import logo from "assets/images/logo/logo.png";

import SearchIcon from "@mui/icons-material/Search";
import { useSelector } from "react-redux";

const myTheme = createTheme({
  typography: {
    fontFamily: "iranYekan",
  },
  components: {
    MuiCssBaseline: {
      // styleOverrides: {
      //   "@font-face": {
      //     fontFamily: "iranYekan",
      //     src: `url(${iranYekan}) format("truetype")`,
      //   },
      // },
    },
  },
});

const CardImg = styled("img")(({ theme }) => ({
  width: 80,
  height: 50,
  marginTop: "10px",
  backgroundColor: "inherit",
 
}));

const AppbarStyle = styled("div")(() => ({
  position: "fixed",
  top: "0",
  width: "100%",
  zIndex: "1000",
  boxShadow: "none",
  background: "white",
  backdropFilter: "blur(16px) saturate(180%)",
  borderBottom: "4px solid #05396a",
}));

const Search = styled("div")(({ theme }) => ({
  display: "flex",
  zIndex: "100",
  alignItems: "center",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "#F5EEF8",
  color: "#000",
  "&:hover": {
   
    color: "#000",
  },
  // marginRight: theme.spacing(1),
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(10),
    width: "auto",
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

function Header() {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const cartTotalQuantity = useSelector(
    (state) => state.cart.cartTotalQuantity
  );

  return (
    <ThemeProvider theme={myTheme}>
      <CssBaseline />
      <AppbarStyle position="fixed">
        <Toolbar>
          {isMatch ? (
            <>
              <Menu />
            </>
          ) : (
            <Grid container>
              <Grid item xs={2}>
                <Link href="./home">
                  <CardImg component="img" src={logo} />
                </Link>
              </Grid>
              <Grid item xs={4} color="black">
                <Grid sx={{ pt: 1 }}>
                  <Tab label="صفحه اصلی" component={Link} href="/" />
                  <DrawerProducts />
                </Grid>
              </Grid>
              <Grid item xs={4} sx={{ mt: 2 }}>
                <Search>
                  <SearchIcon />
                  <StyledInputBase
                    placeholder="جستجو کنید..."
                    inputProps={{ "aria-label": "search" }}
                  />
                </Search>
              </Grid>
              <Grid sx={{ display: "flex", alignItems: "center" }}>
                <DrawerAdmin />
                <Link href="/Shopping-card" underline="none" color="black">
                  <Badge color="secondary" badgeContent={cartTotalQuantity}>
                    <LocalGroceryStoreOutlinedIcon />
                  </Badge>
                </Link>
              </Grid>
            </Grid>
          )}
        </Toolbar>
        {/* <Divider variant="middle" /> */}
      </AppbarStyle>
    </ThemeProvider>
  );
}
export default Header;
