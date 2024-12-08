import { configureStore } from '@reduxjs/toolkit'
import cartReducer ,{ getTotal} from 'redux/CartSlice';

const loadPreloadState = () => {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch {
    // ignore write errors
  }
};

export const store = configureStore({
  devTools : true,
  preloadedState: loadPreloadState(),
  reducer: {
    cart:cartReducer
    
  },
})

store.subscribe(()=>{
  saveState({
    cart: store.getState().cart,
    // theme: store.getState().theme
   })
})

// store.dispatch(getTotal())
