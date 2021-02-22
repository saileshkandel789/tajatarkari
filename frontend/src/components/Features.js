import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaShippingFast,  FaHandsHelping ,  FaTty} from 'react-icons/fa';
import { faHandsHelping, faShippingFast, faTty } from '@fortawesome/free-solid-svg-icons';


const Features = () => {
    return (
        <div className= "feature-section">
           <div className= "container">
               <div className="featurewrap">
               <div className= "row">
                    <div className= "col-md-3 col-sm-6 col-6">
                        <FontAwesomeIcon
                            icon={faShippingFast}
                            style={{ color: "#80b435","fontSize": "30px" }}

                        />
                        <h3>Free Shipping</h3>
                        <p>On order over Rs 100</p>
                    </div>
                    <div className= "col-md-3 col-sm-6 col-6">
                        <FontAwesomeIcon
                            icon={faHandsHelping}
                            style={{ color: "#80b435","fontSize": "30px" }}

                        />
                        <h3>SUPPORT</h3>
                        <p>Life time support 24/7</p>
                    </div>
                    <div className= "col-md-3 col-sm-6 col-6">
                        <FontAwesomeIcon
                            icon={faHandsHelping}
                            style={{ color: "#80b435","fontSize": "30px" }}

                        />
                        <h3>Help Partner</h3>
                        <p>Help all aspects</p>
                    </div>
                    <div className= "col-md-3 col-sm-6 col-6">
                        <FontAwesomeIcon
                            icon={faTty}
                            style={{ color: "#80b435","fontSize": "30px" }}
                        />
                        <h3>contact with us</h3>
                        <p>9852023834</p>
                    </div>
                    </div>
               </div>
            </div> 
        </div>
    )
}

export default Features
