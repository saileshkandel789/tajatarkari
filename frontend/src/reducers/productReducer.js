
import { GET_PRODUCT_DATA } from "../actions/types";

const initialState = {
  product: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCT_DATA:
      return {
        ...state,
        product: action.payload,
      };
    default:
      return state;
  }
}
