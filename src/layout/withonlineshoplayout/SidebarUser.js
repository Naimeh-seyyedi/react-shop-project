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


export default function SidebarUser() {
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
      <Link to="#">
        <ListItem>
          <ListItemAvatar>
            <StoreIcon />
          </ListItemAvatar>
          <ListItemText primary="موبایل" />
        </ListItem>
      </Link>
      <Link to="#">
        <ListItem>
          <ListItemAvatar>
            <InventoryIcon />
          </ListItemAvatar>
          <ListItemText primary="لپ تاپ " />
        </ListItem>
      </Link>
      <Link to="#">
        
      <ListItem>
        <ListItemAvatar>
         
            <ShoppingCartIcon />
          
        </ListItemAvatar>
        <ListItemText primary=" تبلت " />
      </ListItem>
      </Link>
     
      
    </List>
  );
}
