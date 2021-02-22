import React, { Component,Fragment } from 'react';
import { connect } from "react-redux";
import axios from "axios";
import {API ,imageAPI} from "../../config";
import Logo from "../../images/cod.png";
import Header from "../../components/Header";
import {Footer} from "../../components/Footer";
import {clearCart} from "../../actions/cartActions"
import socketIOClient from "socket.io-client"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCross, faTimes, faTimesCircle
} from "@fortawesome/free-solid-svg-icons";
import classnames from "classnames";
import withErrorHandler from "../withErrorHandler/withErrorHandler";
import { GET_ERRORS } from "../../actions/types";




 class Payment extends Component {
     state = {
        name : '',
        Address : '',
        mobileNo : '',
        _id: '',
        price : 0,
        showModal : false,
        bgblack: false
     }

     ondispatcherror = (err) => (dispatch) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    };

    componentDidMount() {
        axios
      .get(`${API}/shippingAddress/${this.props.auth.user.id}`)
      .then((res) =>
        this.setState({
          name: res.data.name,
          Address: res.data.Address,
          mobileNo: res.data.mobileNo,
          _id: res.data._id
        })
        
      )
      .catch((err) => console.log(err));
    }
     goToHome = () => {
      this.props.history.push('/')
      
    }
    goToMyOrders = () => {
      this.props.history.push('/myOrder');
      
    }
    modalClose = () => {
      this.setState({showModal:false , bgblack:false})
  }
    orderHandler = () => {
        const data = {
            orderItems :  this.props.cartData.cart,
            shippingAddress : this.state._id ,
            totalPrice : this.props.cartData.cart.reduce((accumulator, currentValue) => {
                            return accumulator + (currentValue.price  * currentValue.qty)
                            }, 0)

        }
        if(data.orderItems.length < 1) {
          return this.props.history.push('/')
        }
        // const socket = socketIOClient('http://18.222.127.41:5000')
        const socket = socketIOClient('http://3.141.26.199:5000')

        // const socket = socketIOClient('http://gaukotarkari.com:5000')
        // const socket = socketIOClient('http://ec2-18-222-127-41.us-east-2.compute.amazonaws.com:5000')


        socket.emit("OrderSent", data);
        axios
        .post(`${API}/order` , data)
        .then((res) =>
          {this.setState({
            name : '',
            Address : '',
            mobileNo : '',
            _id: '',
            price : 0,
            showModal:true , 
            bgblack:true
          })
          this.props.clearCart()
        }
        )
        .catch((err) => console.log(err,'oooooooooooo'));
      }


    render() {
       
        return (
          <div id= "payment" >
            <div id= "overlay" className={classnames({ "overlayactive": this.state.bgblack })}></div>
      <div id = "modal"
      // show={modal}
       className={classnames({
              "isdisplay": this.state.showModal,
            })} >
        
        <div className= "modal-wrap d-flex">
          <div className= "" >
          <FontAwesomeIcon
            icon={faTimesCircle}
            style={{ color: "#ff5e15" ,position: "absolute" ,right:"20px"}}
            onClick = {this.modalClose}
        />  
              <p className="sucesscartmsg">Your Items has been successfully ordered</p>
              <div className= "modal-cart d-flex">
                <button className = "btn-default" onClick= {this.goToHome}>continue shopping</button>
                <button className = "btn-default" onClick= {this.goToMyOrders}>My orders</button>

              </div>
              
          </div>
        </div>
          
                   

        </div>
            <Header/>
            <div className="product-banner">
              <div className="product-banner-inner">
                <h3>ORDER Section</h3>
              </div>
            </div>
          <section className= "order-section">
            <div className="container">
                <div className="row">
                <div className ="col-md-7">
                  <div className= "order-info">
                    <h2>Order Now</h2>
                    <p>{this.state.name} , 
                    { this.state.Address} , 
                    { this.state.mobileNo} ,</p>
                    
                    <h3>Payment</h3>
                <img src={Logo} alt="cod"/>
                </div>
                </div>
                <div className="col-md-5">
                    {this.props.cartData.cart.map(pro => {
                                return (
                                    <div className= "d-flex " key= {pro.product} style = {{'justifyContent': 'space-between' , 'marginBottom': "10px"}}>
                                        
                                        <img
                                                className="img-fluid"
                                                src={`${imageAPI}/${pro.image}`}
                                                style = {{ width : "100px"}}
                                                alt={pro.name}
                                            />
                                        <p className= "order-qty"> {pro.qty}</p>
                                        <h4 className= "order-name">  {pro.name} </h4>
                                        
                                        <p className= "order-total">Rs. {pro.price * pro.qty}</p>
                                    </div>
                                )
                        } )}
                        <h2 className= "total-payment">Total Rs  {this.props.cartData.cart.reduce((accumulator, currentValue) => {
                                         return accumulator + (currentValue.price  * currentValue.qty)
                                         }, 0)} 
                    </h2>
                </div>
                </div>
                    <button className= "addtocart" onClick= { this.orderHandler }> Order Now</button>
            </div>
            </section>
            <Footer/>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    cartData: state.cartData,
  });

// export default connect(mapStateToProps , {clearCart})(Payment);
export default connect(mapStateToProps , {clearCart})(withErrorHandler(Payment,axios));



