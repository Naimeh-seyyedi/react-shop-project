import { createSlice } from "@reduxjs/toolkit";

export const ProductSlice = createSlice({
  name: "product",
  initialState: { product: [] },
  reducers: {
    productAdd: (state, action) => {
      const { id, task } = action.payload; 

      state.product.push({ id, task })
    },
    productRemoved: (state, action) => {
      const { id } = action.payload; 


     
    //  return state.product.splice(
    //     state.product.findIndex((arrow) => arrow.id === action.payload),
    //     1
    //   );
      state.product = state.product.filter(item => item.id !== action.payload)


    },
  },
});

export const { productRemoved , productAdd } = ProductSlice.actions;
export const selectProduct= (state) => state.product.product;

export default ProductSlice.reducer;
