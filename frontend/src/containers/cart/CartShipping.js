import React, { Component,Fragment } from 'react'
import classnames from "classnames";
import {API} from "../../config";
import axios from "axios";
import { withRouter } from "react-router-dom";
import {connect} from "react-redux";
import Header from "../../components/Header";
import {Footer} from "../../components/Footer";
import withErrorHandler from "../withErrorHandler/withErrorHandler";
import { GET_ERRORS } from "../../actions/types";


 class CartShipping extends Component {
    state = {
        name: "",
        Address: "",
        mobileNo:"",
        City : "",
        errors: ""
    }
    componentDidMount() {
      axios
    .get(`${API}/shippingAddress/${this.props.auth.user.id}`)
    .then((res) =>
      this.setState({
        name: res.data.name,
        Address: res.data.Address,
        mobileNo: res.data.mobileNo,
        City: res.data.City
      })
      
    )
    .catch((err) => console.log(err));
  }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
      }

      ondispatcherror = (err) => (dispatch) => {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data,
        });
      };

    onSubmit = this.onSubmit.bind(this);
    onSubmit(e) {
      e.preventDefault();
      const fd = {
        "name": this.state.name,
        "Address": this.state.Address,
        "mobileNo": this.state.mobileNo,
        "City": this.state.City

      }
  
      axios
        .post(`${API}/shippingAddress`, fd)
        .then((res) =>
        {console.log(res,'oi')
        if(res !== undefined) {
          return this.props.history.push('/payment')

        }

      }
          // this.setState({
          //   name: "",
          //   address: "",
          //   mobileNo: "",
          //   city: "",
          // })
          // {return this.props.history.push('/payment')}
        )
        .catch((err) =>  console.log(err)
        );
    }
    
    render() {
        return (
          <Fragment>
            <Header/>
            <div className="product-banner">
              <div className="product-banner-inner">
                <h3>SHipping Address</h3>
              </div>
            </div>
            <section className= "shipping-section">
              <div className="container">
              <h2>Contact Information</h2>
              <div className= "ship-info">
                    <h3>Shipping Address</h3>
                </div>
              <form className="form" onSubmit={this.onSubmit}>
                    <div className="row">
                      <div className="form-group col-md-6 col-sm-10">
                        <input
                          type="text"
                          placeholder=" name"
                        //   className={classnames({ "is-invalid": errors.name })}
                          name="name"
                          value={this.state.name ? this.state.name : ""}
                          onChange={this.onChange.bind(this)}
                        />
                        {/* {errors.name && (
                          <div className="invalid-feedback">{errors.name}</div>
                        )} */}
                      </div>
                      <div className="form-group col-md-6 col-sm-10">
                        <input
                          type="text"
                          placeholder=" Mobile No"
                        //   className={classnames({ "is-invalid": errors.mobileNo })}
                          name="mobileNo"
                          value={this.state.mobileNo ? this.state.mobileNo : ""}
                          onChange={this.onChange.bind(this)}
                        />
                        {/* {errors.mobileNo && (
                          <div className="invalid-feedback">{errors.mobileNo}</div>
                        )} */}
                      </div>
                      <div className="form-group col-md-6 col-sm-10">
                        <input
                          type="text"
                          placeholder="Address"
                        //   className={classnames({
                        //     "is-invalid": errors.address,
                        //   })}
                          name="Address"
                          value={this.state.Address ? this.state.Address : "" }
                          onChange={this.onChange.bind(this)}
                        />
                        {/* {errors.address && (
                          <div className="invalid-feedback">
                            {errors.address}
                          </div>
                        )} */}
                      </div>
                      <div className="form-group col-md-6 col-sm-10">
                        <input
                          type="text"
                          placeholder="City"
                        //   className={classnames({
                        //     "is-invalid": errors.city,
                        //   })}
                          name="City"
                          value={this.state.City ? this.state.City : ""}
                          onChange={this.onChange.bind(this)}
                        />
                        {/* {errors.city && (
                          <div className="invalid-feedback">
                            {errors.city}
                          </div>
                        )} */}
                      </div>
                      <div className=" col-md-12 ">
                        <input type="submit" className=" addtocart" value="Next" />
                      </div>
                    </div>
                  </form>
              </div>
                
            </section>
            <Footer/>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps , {})(withRouter(withErrorHandler(CartShipping,axios)));
