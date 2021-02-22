import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import classnames from "classnames";
import { GET_ERRORS } from "../../actions/types";
import axios from "axios";
import { API } from "../../config";
import Spinner from "../../components/Spinner";
import AdminNavbar from "../Dashboard/adminNavbar";


class AddProduct extends Component {
  state = {
    name: "",
    errors: "",
    variant : [{type: "" , options : []}],
    loading : false,
  };

  onSubmit = this.onSubmit.bind(this);

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  ondispatcherror = (err) => (dispatch) => {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  };
  
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    
  }
 
  
  render() {
    const { errors } = this.state;
    console.log(this.props, "prop");

    

    return (
      <Fragment>
        <div className="admin-dashboard-section">
            <div className="row">
              <div className="col-md-2">
                <AdminNavbar />
              </div>
              <div className="col-md-10">

                <div className="contact-wrap">
                  <h3 className="large ">
                    Add Product
                  </h3>

                  <form className="form" onSubmit={this.onSubmit}>
                    <div className="row">
                      <div className="form-group col-md-12 col-sm-10">
                        <input
                          type="text"
                          placeholder="name"
                          className={classnames({ "is-invalid": errors.name })}
                          name="name"
                          value={this.state.name}
                          onChange={this.onChange.bind(this)}
                        />
                        {errors.name && (
                          <div className="invalid-feedback">{errors.name}</div>
                        )}
                      </div>
                      <p >add Attribute</p>
                      <div className="form-group col-md-12 col-sm-10 fg">
                          <input type="text" 
                          placeholder= "type" 
                          name="type"
                        //   value={this.state.name}
                        //   onChange={this.onChange.bind(this)} 
                          />
                        <input
                          type="text"
                          placeholder="options"
                          name="options"
                        //   value={this.state.name}
                        //   onChange={this.onChange.bind(this)}
                        />
                      </div>
                      
                     
                      
                      <div className=" col-md-12 ">
                        <input type="submit" className="btn " value="Submit" />
                      </div>
                    </div>
                  </form>
                </div>
                
              </div>
            </div>
          </div>
        

      </Fragment>
    );
  }
}


const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps)(withRouter(AddProduct));
