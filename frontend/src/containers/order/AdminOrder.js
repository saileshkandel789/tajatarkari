import React, { Component,Fragment } from 'react';
import axios from "axios";
import AdminNavbar from "../Dashboard/adminNavbar";
import {API ,imageAPI} from "../../config";
// import socketIOClient from "socket.io-client"

export class AdminOrder extends Component {

    state = {
        orderList : [],
        loading : false,
        error  : '',
        response: ''
      }

    componentDidMount() {
        this.setState({loading:true});
        axios
            .get(`${API}/order`)
            .then((res) => {
                this.setState({orderList : res.data , loading : false})
                }
            )
            .catch((err) => {
                this.setState({error : err ,loading:false})
            });

        // const socket = socketIOClient('http://localhost:5000')
        // socket.on("FromAPI", data => {
        //     this.setState({response : data});
        //   });
        

    }
    handleStateChange = (id ,e) => {

        console.log(id,e.target.value,'opp');
        axios
        .post(`${API}/order`, {
            _id : id,
            isDelivered : e.target.value
        })
        .then((res) => {
            axios
            .get(`${API}/order`)
            .then((res) => {
                this.setState({orderList : res.data , loading : false})
                }
            )
            .catch((err) => {
                this.setState({error : err ,loading:false})
            });
        }
        )
        .catch((err) => {
            console.log(err)

        });
      };
    render() {

        return (
            <Fragment>
                <div className="admin-dashboard-section">
                <div className="row">
                    <div className="col-md-2">
                        <AdminNavbar />
                    </div>
                    <div className="col-md-10">
                        <div className="dashboard-header">
                            <h3>ORDER LIST</h3>
                        </div>
                        {this.state.orderList.map(order => (
                                <div className= "order-list" key={order._id}>
                                    <div className="order-address-info">
                                        <p>Name : {order.user.name}</p>
                                        <p>TotalPrice : {order.totalPrice}</p>
                                        <p>Address : {order.shippingAddress.Address} , MobileNo : {order.shippingAddress.mobileNo}</p>
                                        <p>City: {order.shippingAddress.City}</p>
                                        <p>Delivery Status :

                                            <select name="" id="" onChange={(e) => this.handleStateChange(order._id,e)} >
                                                <option value={order.isDelivered } >{order.isDelivered }</option>
                                                {/* {order.isDelivered !== "notdelivered" ? (<option value="notdelivered" disabled={order.isDelivered == "delivered" ? true : null} >notdelivered</option>) : null} */}
                                                {order.isDelivered !== "delivered" ? (<option value="delivered"  disabled={order.isDelivered == "delivered" ? true : null}>delivered</option>) : null}
                                                {/* <option value="delivered" disabled={order.isDelivered == "delivered" ? true : null}>delivered</option> */}
                                            </select> 
                                            
                                            </p>
                                    </div>
                                    <h5> orderItems : </h5>
                                  {order.orderItems.map(e => (
                                      <div key={e._id} className= "order-item-list">
                                          <img src={`${imageAPI}/${e.image}`} alt={e.name} />
                                          <p>name : {e.name}</p>
                                          <p>price: {e.price}</p>
                                          <p>quantity: {e.qty}</p>
                                      </div>
                                      
                                  ))}
                                </div>  
                        ))}
                    </div>
                </div>
               <div>

               </div> 
               </div>
            </Fragment>
        )
    }
}

export default AdminOrder

