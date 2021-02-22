import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";
import productReducer from "./productReducer";
import cartReducer from "./cartReducer";


export default combineReducers({
    errors: errorReducer,
    auth:authReducer,
    productData:productReducer,
    cartData : cartReducer
});
