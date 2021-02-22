import axios from "axios";
import {
  GET_ERRORS,
  GET_CART_DATA,
  ADD_CART_DATA,
  DELETE_CART_DATA,
  CLEAR_CART
} from "./types";
import { API } from "../config";


export const addToCart = (id,qty) => (dispatch ,getState) => {

    axios
      .get(`${API}/product/${id}`)
      .then((res) =>
        {
            dispatch({
          type: ADD_CART_DATA,
          payload: {
                product : res.data._id,
                name: res.data.name,
                image : res.data.image,
                price : res.data.price,
                qty:qty
          },
        })
        localStorage.setItem('cart' , JSON.stringify(getState().cartData.cart))
    }
      )
      .catch((err) =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data,
        })
      );
  };
  export const deleteFromCart = (id) => (dispatch ,getState) => {

    
            dispatch({
          type: DELETE_CART_DATA,
          payload: id,
        })
        localStorage.setItem('cart' , JSON.stringify(getState().cartData.cart))
    
      
  };
  export const clearCart = () => (dispatch ,getState) => {
 
    dispatch({
    type: CLEAR_CART
  })
  localStorage.setItem('cart' , JSON.stringify(getState().cartData.cart))
};