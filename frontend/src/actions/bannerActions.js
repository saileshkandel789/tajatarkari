import axios from "axios";
import {
  GET_ERRORS,
} from "./types";
import { API } from "../config";


export const bannerGet = () => (dispatch) => {
    axios
      .get(`${API}/banner`)
      .then((res) =>
        this.setState({
          bannerList: res.data
        })
      )
      .catch((err) =>
        console.log(err,'errm')
      );
  };



