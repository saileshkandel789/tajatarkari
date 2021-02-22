import React, { Component,Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";
import axios from "axios";
import Header from "../../components/Header";
import {Footer} from "../../components/Footer";

class Register extends Component {
  state = {
    name: "",
    mobileNo: "",
    password: "",
    password2: "",
    errors: {},
    // email : "default@gmail.com"
  };
  onSubmit = this.onSubmit.bind(this);

    // componentDidMount() {
    //   if (this.props.auth.isAuthenticated) {
    //     this.props.history.push("/dashboard");
    //   }
    // }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      mobileNo: this.state.mobileNo,
      password: this.state.password,
      password2: this.state.password2,
      // email : this.state.email
    };
  console.log(newUser,'newuser')
    this.props.registerUser(newUser, this.props.history);
  }
  render() {
    // const { user } = this.props.auth;
    const { errors } = this.state;
    // console.log(this.state,'stt')
    console.log(this.props.errors, "state");

    return (
      <Fragment>
      <Header/>
      <section className="container ">
        <div className= "loginmargin contact-wrap">
        {/* {user ? user.name : null} */}
        <h1 className="large ">Register</h1>
        <p className="lead">
          <i className="fas fa-user"></i> 
          Create Your Account
        </p>
        <form noValidate className="form" onSubmit={this.onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className={classnames({ "is-invalid": errors.name })}
              placeholder="Name"
              name="name"
              value={this.state.name}
              onChange={this.onChange.bind(this)}
            />
            {errors.name && (
              <div className="invalid-feedback">{errors.name}</div>
            )}
          </div>
          <div className="form-group">
            <input
              type="number"
              className={classnames({ "is-invalid": errors.mobileNo })}
              placeholder="Mobile No"
              name="mobileNo"
              value={this.state.mobileNo}
              onChange={this.onChange.bind(this)}
            />
            {errors.mobileNo && (
              <div className="invalid-feedback">{errors.mobileNo}</div>
            )}
           
          </div>
          {/* <div className="form-group">
            <input
              type="email"
              placeholder="email"
              name="email"
              value={this.state.email}
              onChange={this.onChange.bind(this)}
            />
           
          </div> */}
          <div className="form-group">
            <input
              type="password"
              className={classnames({ "is-invalid": errors.password })}
              placeholder="Password"
              name="password"
              minLength="6"
              value={this.state.password}
              onChange={this.onChange.bind(this)}
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password}</div>
            )}
          </div>
          <div className="form-group">
            <input
              type="password"
              className={classnames({ "is-invalid": errors.password2 })}
              placeholder="Confirm Password"
              name="password2"
              minLength="6"
              value={this.state.password2}
              onChange={this.onChange.bind(this)}
            />
            {errors.password2 && (
              <div className="invalid-feedback">{errors.password2}</div>
            )}
          </div>
          <input type="submit" className="btn " value="Register" />
        </form>
        {/* <p className="my-1">
          Already have an account? <a href="login.html">Sign In</a>
        </p> */}
        </div>
      </section>
      <Footer/>
      </Fragment>
    );
  }
}

// Register.propTypes = {
//   registerUser: PropTypes.func.isRequired,
//   auth: PropTypes.object.isRequired,
// };

const mapStateToProps = (state) => ({
  errors: state.errors,
});

export default connect(mapStateToProps, { registerUser})(withRouter(Register));

