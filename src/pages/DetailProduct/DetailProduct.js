import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import {
  Grid,
  Box,
  Button,
  Typography,
  Link,
  imageListItemBarClasses,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add";
import WithOnlineShopLayout from "layout/WithOnlineShopLayout";
import { ApiAdmin } from "api/ApiAdmin";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "redux/CartSlice";
import { useNavigate } from "react-router-dom";

function DetailProduct() {
  const productId = useParams();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [count, setCount] = useState(1);
  let Id = parseInt(productId.id);
  const [product, setProduct] = useState(null);
  const [info, setInfo] = useState(null);
  const [Index, setIndex] = useState(0);
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const BASE_URl = "http://localhost:3002";
console.log(product)
  useEffect(() => {
    (async () => {
      let detailProduct = await ApiAdmin.product(`/${Id}`);
      setProduct(detailProduct.data);
    })();
  }, [Id]);

  useEffect(() => {
    const _product = cartItems.find(
      (item) => +item.product.id === +productId.id
    );
    console.log(_product);
    if (_product) {
      setCount(_product.orderCount);
    } else {
      setCount(1);
    }
  }, []);

  const increase = (number) => {
    setCount(number);
  };
  const decrease = (number) => {
    if (number > 0) {
      setCount(number);
    }
  };

  // const myRef = useRef();

  function handleTab(index) {
    setIndex(index);
    // const images = myRef.current.children;
    // for(let i=0; i<images.length; i++){
    //   images[i].className = images[i].className.replace("active", "")
    // }
    // images[index].className="active"
  }

  if (product === null) {
    return <div>loading...</div>;
  }

  console.log(count);
  const totalitem = count * product.price;
  const handleAddToCard = (product, count) => {
    let data = {
      product: { ...product },
      orderCount: count,
      totalRow: totalitem,
    };

    dispatch(addToCart(data));
    navigate("/Shopping-card");
  };

  return (
    <Grid className="details" key={product?.id}>
      <Grid classname="img-container">
        <img
          className="detailsImg"
          src={BASE_URl + product?.images[Index]}
          alt={product.name}
        />
        <Grid container className="detail-gallery">
          {product?.images?.map((img, index) => (
            <Grid key={index}>
              <img
                className="imgCard"
                src={BASE_URl + img}
                alt="image of digitalproduct"
                onClick={() => handleTab(index)}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Box className="box">
        <Grid className="row">
          <Typography className="detail-name">{product.name}</Typography>
          <Typography className="detail-descrip">
            {product.description}
          </Typography>
          <Typography className="dtail-price">
            {product.price.toLocaleString() + " تومان "}
          </Typography>
          <Grid className="detail-btns">
            <Button
              variant="text"
              color="error"
              onClick={() => increase(count + 1)}
            >
              <AddIcon />{" "}
            </Button>
            <Typography variant="h6">{count}</Typography>
            <Button
              variant="text"
              color="error"
              onClick={() => decrease(count - 1)}
            >
              <DeleteOutlineIcon />
            </Button>
          </Grid>
          {/* <Link href="/shopping-card"> */}
          <Button
            disabled={product.inventory < count}
            className="addBasketBtn"
            onClick={() => handleAddToCard(product, count)}
          >
            افزودن به سبد خرید
          </Button>
          {/* </Link> */}
        </Grid>
      </Box>
    </Grid>
  );
}

export default WithOnlineShopLayout(DetailProduct);
