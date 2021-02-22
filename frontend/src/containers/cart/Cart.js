import React , {useState ,useEffect ,Fragment} from 'react';
import {connect} from "react-redux";
import {imageAPI} from "../../config";
import Header from "../../components/Header";
import {Footer} from "../../components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { deleteFromCart} from "../../actions/cartActions"



const Cart = (props ) => {
    const [product, setProduct] = useState([]);
    useEffect(() => {
        setProduct(props.cartData.cart)
       
      }, [props]);

      const checkOutHandler = () => {
           if (props.auth.isAuthenticated ){
             props.history.push('/shippingInfo')
            }else {
                props.history.push('/login')
            }
      }
      const onDelete = (id) => {
          console.log(id,'ll');
        props.deleteFromCart(id)
      }
    return (
        <Fragment>
            <Header/>
        <section className= "cart-section">
        <div className="product-banner">
              <div className="product-banner-inner">
                <h3>YOUR SHOPPING CART</h3>
              </div>
            </div>
            <div className= "container">
                <div className = "row">
                    <table>
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>

                        
                                        { product.map(pro => {
                                        return (
                                            <tr className= "" key= {pro.product} >
                                                <td  className= "product-image">
                                                    <img
                                                            className="img-fluid"
                                                            src={`${imageAPI}/${pro.image}`}
                                                            style = {{ width : "200px"}}
                                                            alt={pro.name}
                                                        />
                                                </td>
                                                <td className= "product-name">{pro.name}</td>
                                                <td className= "product-price"> 
                                                    Rs. {JSON.parse(pro.price)}
                                                </td>
                                                <td className= "product-quantity">
                                                     {pro.qty}
                                                </td>
                                                <td className= "total-price">
                                                     Rs. {pro.price * pro.qty}

                                                </td>
                                                <td>
                                                <FontAwesomeIcon
                                                    icon={faTrash}
                                                    style={{ color: "#80b435" }}
                                                    onClick={() => onDelete(pro.product)}
                                                />
                                                </td>
                                            </tr>
                                        )
                                } )}
                            
                        </tbody>
                    </table>
                    
                    <div >
                    </div>
                    
                
              
                    
                    
                </div>
                <div className ="row-total">
                    <h5> SUB TOTAL
                        <span> Rs. {product.reduce((accumulator, currentValue) => {
                                return accumulator + (currentValue.price  * currentValue.qty)
                            }, 0)}
                            </span>
                    </h5>
                        
                        <button onClick={checkOutHandler.bind(this)} className="addtocart floatright">Checkout</button>
                    </div>
            </div>
               
                
        </section>
        <Footer/>
        </Fragment>
    )
}

const mapStateToProps = (state) => ({
    cartData: state.cartData,
    auth: state.auth,
  });

export default connect(mapStateToProps , {deleteFromCart})(Cart);

