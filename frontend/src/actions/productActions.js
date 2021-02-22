import axios from "axios";
import {
  GET_ERRORS,
  GET_PRODUCT_DATA
} from "./types";
import { API } from "../config";


export const productGet = () => (dispatch) => {
    axios
      .get(`${API}/product`)
      .then((res) =>
        dispatch({
          type: GET_PRODUCT_DATA,
          payload: res.data,
        })
      )
      .catch((err) =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data,
        })
      );
  };