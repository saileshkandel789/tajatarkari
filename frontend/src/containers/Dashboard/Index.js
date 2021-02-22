import React, {useState, Fragment } from "react";
import AdminNavbar from "./adminNavbar";
import { Footer } from "../../components/Footer";
import Header from "../../components/Header";
import { withRouter } from "react-router-dom";
import socketIOClient from "socket.io-client"
import classnames from "classnames";
import {API,imageAPI} from "../../config"



const DashboardIndex = (props) => {

  const [msg, setMsg] = useState({});
  const [modal, setModal] = useState(false);

  const modalClose = () => {
    setModal(false);
}
const goToOrder = () => {
  props.history.push('/admin/order')
  
}
const socket = socketIOClient('http://3.141.26.199:5000')
  // const socket = socketIOClient('http://18.222.127.41:5000')
  // const socket = socketIOClient('http://gaukotarkari.com:5000')
  // const socket = socketIOClient('http://ec2-18-222-127-41.us-east-2.compute.amazonaws.com:5000')


  socket.on("OrderSent" , (message) => {
    console.log(message);
    setMsg(message);
    setModal(true);
    
  } )
  return (
    <Fragment>
      <div id = "modal"
      // show={modal}
       className={classnames({
              "isdisplay": modal,
            })} >
        
        <div className= "modal-wrap d-flex">
          <div className= "modal-info" >
          {/* <FontAwesomeIcon
            icon={faTimesCircle}
            style={{ color: "#ff5e15" ,position: "absolute" ,right:"20px"}}
            onClick = {modalClose}
        />   */}
    
              <p className="sucesscartmsg">new order </p>
              <div className= "modal-cart d-flex">
              <button className = "btn-default" onClick= {goToOrder}>Go to order</button>
                <button className = "btn-default" onClick= {modalClose}>close</button>
              </div>
              
          </div>
        </div>
          
                   

        </div>
        
      <div className="admin-dashboard-section">
        <div className="row">
          <div className="col-md-2">
            <AdminNavbar />
          </div>
          <div className="col-md-10">
            <div className="dashboard-header">
              <h3>admin section</h3>
             
              
            </div>
            <h4>admin index page</h4>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default withRouter(DashboardIndex);
