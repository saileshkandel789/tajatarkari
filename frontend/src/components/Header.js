import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhoneVolume,
  faMapMarkerAlt,
  faEnvelopeOpen,
  faMobile,
  faShoppingCart,
  faHeart,
  faUser,
  faTrash
} from "@fortawesome/free-solid-svg-icons";
// import Navbar from "./Navbar";
import Logo from "../images/tarkarilogo2.png";
// import Sidebarnav from "../sidebar/sidebarNav";
import { logoutUser } from "../actions/authActions";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaWhatsapp ,FaTrash } from "react-icons/fa";
import { IconContext } from "react-icons";
import {imageAPI} from "../config";
import { withRouter } from "react-router";
import { deleteFromCart} from "../actions/cartActions"


class Headers extends Component {
  
  state = {
    userAccOpen : false,
    products :[],

  }
  componentDidMount(){
    this.setState({products: this.props.cartData.cart})
    console.log(this.state.products);
  }
  
  onLogoutClick(e) {
    e.preventDefault();
    this.props.logoutUser();
  }
  goToCheckout = () => {
    if (this.props.auth.isAuthenticated ){
      this.props.history.push('/shippingInfo')
     }else {
         this.props.history.push('/login')
     }
    
    
  }
   goToCart = () => {
    this.props.history.push('/cart')
    
  }
  switchUserAcc () {
    this.setState({userAccOpen : !this.state.userAccOpen})
    console.log(this.state.userAccOpen)
    console.log(this.state.products);
  }
   onDelete = (id) => {
      console.log(id,'ll');
      this.props.deleteFromCart(id)
    }
    onProductDelete = (id) => {
       const p = this.state.products.filter((x) => x.product !== id);
       this.setState({products: p})
    }
  render() {
    return (
      <header>
        <div className="topbar">
          <div className="container">
            <div className="topbar-inner">
              <ul>
                <li>
                  <FontAwesomeIcon
                    icon={faMobile}
                    style={{ color: "#fff", marginRight: "10px" }}
                  />
                  9852023834
                </li>
                <li>
                <IconContext.Provider
                    value={{ className: "socialmedia-icon" }}
                  >
                    <a
                      href="https://www.facebook.com/eideticengineering/"
                      target="_blank"
                    >
                      <FaFacebookF style={{ color: "#fff" }}/>
                    </a>
                  </IconContext.Provider>
                </li>
              </ul>
              <ul>
                {this.props.auth.isAuthenticated ? (
                  <Fragment>
                    
                    <li 
                    onClick= { this.switchUserAcc.bind(this) }
                    className = "userHeader" >
                        <FontAwesomeIcon
                        icon={faUser}
                        style={{ color: "#fff" }}
                        
                      />
                      {this.state.userAccOpen ? 
                          <div className= "user-account">
                            <dl>
                              {/* <dt><Link>profile</Link></dt> */}
                              <dt> <Link to= "/myOrder"> My orders</Link> </dt>
                              {this.props.auth.user.isAdmin ? 
                                 <dt ><Link to= "/dashboard"> Dashboard</Link></dt> : ""
                              }
                              <dt>
                              <a
                                  href="#"
                                  onClick={this.onLogoutClick.bind(this)}
                                  style={{ color: "#fff" }}
                                >
                                  Logout
                                </a>
                              </dt>
                            </dl>
                        </div> : ''
                    }
                      
                    </li>
                  </Fragment>
                ) : (
                  <Fragment>
                    <li>
                      <Link to="/register">Register</Link>
                    </li>
                    <li>
                      <Link to="/login">Login</Link>
                    </li>
                  </Fragment>
                )}
              </ul>
            </div>
          </div>
        </div>
        <div className="logo-info-bar-wrap">
          <div className="container">
            <div className="row">
              <div  style={{width : "75%"}}>
                <div className="logo-info-bar-inner">
                  <div className="logo">
                    <Link to="/">
                      <img src={Logo} alt="logo" className="img-fluid" />
                    </Link>
                  </div>
                  <div className="search">
                      <input type="text" placeholder="Search.." name="search" />
                      <button type="submit">Search</button>
                  </div>
                 
                </div>
              </div>

              <div className="  cart-header" style={{width : "24%"}}>
                <ul className= "h-100">
                <li className="booknow-header bnh-heart">
                  <FontAwesomeIcon
                    icon={faHeart}
                    style={{ marginRight:'5px '}}
                  />
                  WishList
                  
                  </li>
                  <li className="booknow-header">
                    <div className="booknow-header-wrap">
                      <FontAwesomeIcon
                        icon={faShoppingCart}
                        style={{ marginRight:'5px '}}
                      />
                      Cart
                      <div className= "cartno">
                        <span>{this.props.cartData.cart.length}</span>
                      </div>
                      <div className="mini-cart">
                        
                          {this.state.products.length > 0 ? this.state.products.map(p => 
                            (
                              <div className="mini-cart-wrap" key= {p.product}>
                                <img src={`${imageAPI}/${p.image}`} alt="" />
                                 
                                 <div>
                                    <p className = "mcw-name">{p.name }</p>
                                    <p className = "mcw-price">{`${p.price}` }</p>
                                    <p className = "mcw-qty">{`quantity : ${p.qty}` }</p>
                                   </div>
                                   <FontAwesomeIcon
                                      icon={faTrash}
                                      style={{ color: "#80b435" ,'fontSize' : "14px"}}
                                      onClick={() => {
                                        this.onDelete(p.product)
                                        this.onProductDelete(p.product)
                                      }}
                                    />

                              </div>
                            )
                          ) : "currently,no product in cart"}
                          <div className = "mcw-totalprice">
                            <h5>TOTAL PRICE </h5>
                            <p> RS. {this.state.products.reduce((accumulator, currentValue) => {
                                  return accumulator + (currentValue.price  * currentValue.qty)
                                }, 0)} 
                            </p>
                          
                          </div>
                          <div className= "mcw-btn ">
                              <button className= "mcw-viewcart" onClick= {this.goToCart.bind(this)}>view cart</button>
                              <button className = "mcw-gocheckout" onClick= {this.goToCheckout.bind(this)}>checkout</button>
                          </div>
                    </div>
                    </div>
                    
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  cartData: state.cartData,
});

export default withRouter( connect(mapStateToProps, { logoutUser,deleteFromCart })(Headers));
