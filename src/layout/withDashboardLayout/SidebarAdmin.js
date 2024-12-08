import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";

import { Link } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import InventoryIcon from '@mui/icons-material/Inventory';
import StoreIcon from '@mui/icons-material/Store';


export default function SidebarAdmin() {
 
  return (
    <List sx={{ width: "100%", maxWidth: 360,  height:"100vh" }}>
     <Link to="/">
     <ListItem>
        <ListItemAvatar>
        <HomeIcon />
        </ListItemAvatar>
        <ListItemText primary="صفحه نخست" />
      </ListItem>
     </Link>
      <Link to="/admin-dashboard">
        <ListItem>
          <ListItemAvatar>
            <StoreIcon />
          </ListItemAvatar>
          <ListItemText primary="کالاها" />
        </ListItem>
      </Link>
      <Link to="/admin-dashboard/quantity" >
        <ListItem>
          <ListItemAvatar>
            <InventoryIcon />
          </ListItemAvatar>
          <ListItemText primary="موجودی و قیمت ها " />
        </ListItem>
      </Link>
      <Link to="/admin-dashboard/order">
        
      <ListItem>
        <ListItemAvatar>
         
            <ShoppingCartIcon />
          
        </ListItemAvatar>
        <ListItemText primary="سفارش ها " />
      </ListItem>
      </Link>
      <Link to="/">
      <ListItem>
        <ListItemAvatar>
        <ExitToAppIcon />
        </ListItemAvatar>
        <ListItemText primary="خروچ" />
      </ListItem>
      </Link>
      
    </List>
  );
}
