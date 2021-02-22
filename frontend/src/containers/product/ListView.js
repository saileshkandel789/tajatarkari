import React from 'react';
import { Link } from "react-router-dom";
import {imageAPI} from "../../config";

const ListView = (props) => {
    return (
        <fragment>
            <div className="col-md-12">
                <Link to={`/product/${props.id}`}>
                    <div className="listview-wrap">
                        <div className="listview-img">
                            <img
                            className="img-fluid"
                            src={`${imageAPI}/${props.image}`}
                            />
                            
                        </div>
                        <div className = "listview-info">
                                <p className= "listview-name">{props.name}</p>
                                <p className = "listview-price">Rs. {props.price}</p>
                                <p className = "listview-description">{props.description}</p>
                            </div>
                            
                    </div>
                </Link>
            </div>
        </fragment>
    )
}

export default ListView
