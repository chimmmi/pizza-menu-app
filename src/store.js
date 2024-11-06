import { configureStore } from "@reduxjs/toolkit";
import userReducer from './features/user/userSlice';
import cartReducer from './features/cart/cartSlice'

//* the store will serve as the central hub for managing the application's state. it hold the entire state tree of the app and allows
//* diffrent parts of the ap[p to access, update, and react to state changes.
const store = configureStore({
    reducer: {
        user: userReducer,
        cart: cartReducer,
    }
})

export default store;