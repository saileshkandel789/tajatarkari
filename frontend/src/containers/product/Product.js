import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {imageAPI} from "../../config";


export default function Product(props) {
  useEffect(() => {}, []);
  return (
    <div className="col-md-4 col-sm-6 col-lg-3">
      <Link to={`/product/${props.id}`}>
        <div className="product-wrap">
          <div className="product-img">
            <img
              className="img-fluid"
              src={`${imageAPI}/${props.image}`}
            />
          </div>
            <p className= "product-name">{props.name}</p>
            <p className = "product-price">Rs. {props.price}</p>
          
        </div>
      </Link>
    </div>
  );
}
