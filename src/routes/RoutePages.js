import React from "react";
import Home from "pages/home/Home";
import Authentication from "pages/authentication/Authentication";
import ShoppingCard from "pages/shoppingCard/ShoppingCard";
import { Navigate, Route, Routes } from "react-router-dom";
import Quantity from "pages/panelQuantity/Quantity";
import Products from "pages/panelProducts/Products";
import Order from "pages/panelOrder/Order";
import DetailProduct from "pages/DetailProduct/DetailProduct";
import { Category, CheckOutlined } from "@mui/icons-material";
import SuccessCheckout from "pages/success/SuccessCheckout";
import Formcheckout from "pages/checkoutPage/Formcheckout";
import FailedCheckout from "pages/failed/FailedCheckout";
import ProtectedRoute from "./ProtectedRoute";
import AllProduct from "pages/allproduct/AllProduct";
import CategoryProduct from "pages/category/CategoryProduct";
import SubCategoryProduct from "pages/subcategory/SubCategoryProduct";

function RoutePages() {
  const privateRoue = [
    {
      path: "/admin-dashboard",
      name: "products",
      id: "products",
      element: <Products />,
    },
    {
      path: "/admin-dashboard/quantity",
      name: "inventory",
      id: "inventory",
      element: <Quantity />,
    },
    {
      path: "/admin-dashboard/order",
      name: "product-order",
      id: "product-order",
      element: <Order />,
    },
  ]
  const RoutePage = [
    { path: "/", name: "Home Page", id: "home", element: <Home /> },
    {
      path: "/home",
      name: "Home Page",
      id: "home",
      element: <Navigate replace to="/" />,
    },
    {
      path: "/shopping-card",
      name: "shoping card ",
      id: "shopping",
      element: <ShoppingCard />,
    },
    {
      path: "/authentication",
      name: "Authentication",
      id: "Authentication",
      element: <Authentication />,
    },
    
    {
      path: "/product/:id",
      name: "detailProduct",
      id: "detailProduct",
      element: <DetailProduct />,
    },
    {
      path: "/Shopping-card",
      name: "Shopping-card",
      id: "Shopping-card",
      element: <ShoppingCard />,
    },
    {
      path: "/orderStatus/Completed",
      name: "checkout-success",
      id: "checkout-success",
      element: <SuccessCheckout />,
    },{
      path: "/checkout/cart",
      name: "Formcheckout",
      id: "Formcheckout",
      element: <Formcheckout />,
    },{
      path: "/orderStatus/Canceled",
      name: "CheckOut-failed",
      id: "CheckOut-failed",
      element: <FailedCheckout />,
    },
    {
      path: "/allProduct",
      name: "allProduct",
      id: "allProduct",
      element: <AllProduct />,
    },{
      path: "/allProduct/category:categoryId",
      name: "allProduct",
      id: "allProduct",
      element: <CategoryProduct />,
    },{
      path: "/allProduct/category:categoryId/subcategory:subcategoryId",
      name: "allProduct",
      id: "allProduct",
      element: <SubCategoryProduct />,
    }
  ];

  
  return (
    <div>
      <Routes>
        {RoutePage.map((route) => {
          return <Route path={route.path} element={route.element} />;
        })}
        <Route element={<ProtectedRoute />}>
        {privateRoue.map((route) => {
          return <Route path={route.path} element={route.element} />;
        })}
        </Route>
      </Routes>
    </div>
  );
}

export default RoutePages;
