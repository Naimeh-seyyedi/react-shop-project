import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Divider,
  ListItemText,
  ListItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { FaUser } from "react-icons/fa";

function Navigationdrawers() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="open drawer"
        onClick={() => setIsDrawerOpen(true)}
      >
        <MenuIcon />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          موبایل
        </Typography>
      </IconButton>

      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClick={() => setIsDrawerOpen(false)}
      >
        <Box p={2} width="250px" textAlign="right" role="presentation">
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
          >
            <FaUser />
            <Typography variant="h6" component="div">
              ورود/ثبت نام
            </Typography>
          </IconButton>
          <Divider />

          {[
            "سامسونگ",
            "اپل",
            "شیائومی",
          ].map((text, index) => (
            <Link to="text">
              <ListItem button key={text} sx={{ direction: "rtl" }}>
                {/* <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon> */}
                <ListItemText primary={text} />
              </ListItem>
            </Link>
          ))}
        </Box>
      </Drawer>
    </>
  );
}

export default Navigationdrawers;
