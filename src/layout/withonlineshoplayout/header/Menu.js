
import React, { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import LocalGroceryStoreOutlinedIcon from '@mui/icons-material/LocalGroceryStoreOutlined';
import SearchIcon from '@mui/icons-material/Search';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import {
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  InputBase,
  useTheme,
  useMediaQuery,
  Link,
  Collapse,
  Divider,
  Grid,
} from '@mui/material';
// import image from 'assets/images/theLogo.png';

function Menu() {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down('sm'));
  const [isOpen, isSetOpen] = React.useState(false);

  const handleClick = () => {
    isSetOpen(!isOpen)
  };


  const Search = styled('div')(({ theme }) => ({
    display: 'flex',
    zIndex: '100',
    alignItems: 'center',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: '#F5EEF8',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#F5EEF8',
      color: '#000',
    },
    [theme.breakpoints.down('md')]: {
      marginRight: theme.spacing(15),
      width: 'auto',
    },
  }));
  const SearchSm = styled('div')(({ theme }) => ({
    display: 'flex',
    zIndex: '100',
    alignItems: 'center',
    marginRight: theme.spacing(4),
    width: 'auto',
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  }));

  return (
    <>
      {/* <img className="logo" src={image} alt="logo" /> */}
      <Drawer
        PaperProps={{
          sx: { backgroundColor: 'rgba(255, 255, 255, 0.9)', width: '45%',zIndex: '10000', },
        }}
        anchor="left"
        open={open}
        onClose={() => setOpen(false)}
      >
        <List
      sx={{
        width: '100%',
        marginTop:'50px',
        direction: 'ltr',
        
      }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      <ListItemButton>
        <Link underline='none' color="black" href='/' >
          <ListItemText primary="صفحه اصلی"/>
        </Link>
      </ListItemButton>
      <Divider variant="middle" />
      <ListItemButton onClick={handleClick}>
        <Grid underline='none' color="black"  >
          <ListItemText primary="دسته‌بندی محصولات"/>
        </Grid>
        {isOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Divider variant="middle" />
      <Collapse in={isOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton >
            <Link href="/allProduct/category" color="primary" >
              <ListItemText primary="موبایل"/>
            </Link>
          </ListItemButton>
          <Divider variant="middle" />
          <ListItemButton >
            <Link underline='none' color="primary" href="/products/laptop-list">
              <ListItemText primary="لپ تاپ" />
            </Link>
          </ListItemButton>
          <Divider variant="middle" />
          <ListItemButton >
            <Link underline='none' color="primary">
              <ListItemText primary=" تبلت" />
            </Link>
          </ListItemButton>
          <Divider variant="middle" />
        </List>
      </Collapse>
      <ListItemButton> <Link underline='none' color="black" href='/' >
          <ListItemText primary="تماس با ما"/>
        </Link></ListItemButton>
      <ListItemButton>
        <Link underline='none' color="black" href='/authentication' >
          <ListItemText primary="پنل مدیریت"/>
        </Link>
      </ListItemButton>
      <Divider variant="middle" />
    </List>
      </Drawer>
      {isMatch ? (
        <SearchSm>
          <SearchIcon />
          <StyledInputBase
            placeholder="..."
            inputProps={{ 'aria-label': 'search' }}
          />
        </SearchSm>
      ) : (
        <Search>


<SearchIcon />
          <StyledInputBase
            placeholder="جستجو کنید..."
            inputProps={{ 'aria-label': 'search' }}
          />
        </Search>
      )}
      <IconButton sx={{ marginRight: 'auto' }} onClick={() => setOpen(!open)}>
        <LocalGroceryStoreOutlinedIcon />
        <MenuIcon />
      </IconButton>
    </>
  )
};

export default Menu;