import { createSlice } from "@reduxjs/toolkit";

export const PostListSlice= createSlice({
    name: "getData",
    initialState: {
      data: []
    },
    reducers: {
      addTodo: (state, action) => {
        state.data.push(action.payload);
      },
      getTodo: (state, action) => {
        state.data = [action.payload];
      }
    }
   
});
export const getProductAsync = (data) => async (dispatch) => {
    try {
      const response = await ApiAdmin.addproducts();
      dispatch(getTodo(response.data));
    } catch (err) {
      throw new Error(err);
    }
  };
  export const { addTodo, getTodo } = todoSlide.actions;
  export const showTodo = (state) => state.todo.data;
  export default todoSlide.reducer;
