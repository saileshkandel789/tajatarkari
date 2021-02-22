import React, { Component,Fragment } from 'react';
import axios from "axios";
import {API ,imageAPI} from "../../config";
import {connect} from "react-redux";
import Header from "../../components/Header";
import {Footer} from "../../components/Footer";


export class UserOrder extends Component {

    state = {
        orderList : [],
        loading : false,
        error  : ''
      }

    componentDidMount() {
        this.setState({loading:true});
        
        axios
            .get(`${API}/order/${this.props.auth.user.id}`)
            .then((res) => {
                this.setState({orderList : res.data , loading : false})
                }
            )
            .catch((err) => {
                this.setState({error : err ,loading:false})
            });
    }
    render() {

        return (
            <Fragment>
                <Header />
                <div className="container">
                    <div className="row">
                        {/* <div className="col-md-2">
                            <AdminNavbar />
                        </div> */}
                        <div className="col-md-10">
                            <div className="dashboard-header">
                                <h3>My Orders list</h3>
                            </div>
                            {this.state.orderList.length < 1 ? (<p style= {{"fontWeight": 500}}>You have not ordered yet</p>): this.state.orderList.map(order => (
                                    <div className= "order-list" key={order._id}>
                                        <div className="order-address-info">
                                            <p>Name : {order.user.name}</p>
                                            <p>TotalPrice : {order.totalPrice}</p>
                                            <p>Address : {order.shippingAddress.Address} </p>
                                            <p>Delivery Status : {order.isDelivered}</p>
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
                <Footer />
            </Fragment>
        )
    }
}
const mapStateToProps = (state) => ({
    auth: state.auth
  });

export default  connect(mapStateToProps, { })(UserOrder);


