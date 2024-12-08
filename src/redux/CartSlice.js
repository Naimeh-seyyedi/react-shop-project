import { createSlice, current } from "@reduxjs/toolkit";
import BasketModal from "components/BasketModal";

import { toast } from "react-toastify";

const initialState = {
  cartItems:[],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
  isOpen: false,

};

export const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    handleOpen(state, action) {
      state.isOpen = true;
    },
    handleClose(state, action) {
      state.isOpen = false;
    },
    addToCart(state, action) {
      // console.log(current(state.cartItems[itemIndex]));
      console.log(action?.payload.orderCount);

      const itemIndex = state.cartItems?.findIndex(
        (item) => item.product.id === action.payload.product.id
      );
      console.log(itemIndex);
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].orderCount = action.payload.orderCount;
        state.cartItems[itemIndex].totalRow = action.payload.totalRow;
        toast.info("تعداد محصول افزایش یافت", { position: "bottom-left" });
      } else {
        const tempProduct = {
          ...action.payload,
          orderCount: action.payload.orderCount,
          cartQuantity: 1,
        };
        state.cartItems.push(tempProduct);

        toast.success(`به سبد خرید اضافه شد  ${action.payload.product.model} `, {
          position: "bottom-left",
        });
      }
      
      // localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeFromCart(state, action) {
      const newListCartItem = state.cartItems.filter(
        (item) => item.product.id !== action.payload.product.id
      );
      state.cartItems = newListCartItem;
      // localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      toast.error(` حذف شد ${action.payload.product.model} `, {
        position: "bottom-left",
      });
      if(state.cartItems.length === 0 ){
        localStorage.removeItem("count");
      }
    },
    decreaseCart(state, action) {
     
      const itemIndex = state.cartItems?.findIndex(
        (item) => item.product.id === action.payload.product.id
      );
   
      if (state.cartItems[itemIndex].orderCount > 1) {
        console.log("hhhhh")
        state.cartItems[itemIndex].orderCount -= 1;
        //total row product
        state.cartItems[itemIndex].totalRow =
          state.cartItems[itemIndex].orderCount *
          state.cartItems[itemIndex].product.price;
        //update count
        state.count = state.cartItems[itemIndex].orderCount;
      } else {
        console.log("hello");
        const newListCartItem = state.cartItems.filter(
          (item) => item.product.id !== action.payload.product.id
        );
        state.cartItems = newListCartItem;

        toast.error(` حذف شد ${action.payload.product.model} `, {
          position: "bottom-left",
        });
      }
   
    },
    increaseCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.product.id === action.payload.product.id
      );
      // console.log(current(state.cartItems[itemIndex]));

      if (state.cartItems[itemIndex].orderCount > action.payload.inventory) {
        state.isOpen = true;
        alert("موجودی کافی نیست");
        {
          state.isOpen && <BasketModal />;
        }
      } else {
        state.cartItems[itemIndex].orderCount += 1;
        //total row count
        state.cartItems[itemIndex].totalRow =
          state.cartItems[itemIndex].orderCount *
          state.cartItems[itemIndex].product.price;
        //update count
        state.count = state.cartItems[itemIndex].orderCount;
      }
    },
    getTotal(state, action) {
      let { total, quantity } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { product, cartQuantity, orderCount } = cartItem;
          const itemTotal1 =product.price * orderCount;

          cartTotal.total += itemTotal1;
          cartTotal.quantity += cartQuantity;
          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
          // itemTotal: 0,
        }
      );
      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = total;
      // state.totalRow = itemTotal
    },
   
    removeFromBasket(state, action) {
      return initialState;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  getTotal,
  decreaseCart,
  increaseCart,
  handleOpen,
  closeModal,
  removeFromBasket
 
} = CartSlice.actions;

export default CartSlice.reducer;
