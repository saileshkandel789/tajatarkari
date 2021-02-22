
import { GET_CART_DATA , ADD_CART_DATA,DELETE_CART_DATA ,CLEAR_CART} from "../actions/types";

const initialState = {
  cart: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_CART_DATA:
      return {
        ...state,
        cart: action.payload,
      };
    case ADD_CART_DATA:
        const item = action.payload;
        
        const existItem = state.cart.find(x => x.product === item.product )
        if(existItem) {
            return {
                ...state,
                cart : state.cart.map(x =>  x.product === existItem.product ? item : x)
            }
        }else {
            return {
                ...state,
                cart: [...state.cart ,item]
            }
        }
        case DELETE_CART_DATA:
          return {
            ...state,
            cart: state.cart.filter((x) => x.product !== action.payload),
          } 
        case CLEAR_CART:
            return {
              ...state,
              cart: [],
            }
    default:
      return state;
  }
}
