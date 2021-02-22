import React, { Component,Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";
import Header from "../../components/Header";
import {Footer} from "../../components/Footer";



class Login extends Component {
  state = {
    mobileNo: "",
    password: "",
    errors: "",
  };

  onSubmit = this.onSubmit.bind(this);

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

    // componentDidMount() {
    //   if (this.props.auth.isAuthenticated) {
    //     this.props.history.push("/dashboard");
    //   }
    // }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }
//   static getDerivedStateFromProps(props, state) {
//     if (props.currentRow !== state.lastRow) {
//       return {
//         isScrollingDown: props.currentRow > state.lastRow,
//         lastRow: props.currentRow,
//       };
//     }
// componentDidUpdate(nextProps, nextState) {
//     if (nextProps.errors) {
//         this.setState({ errors: nextProps.errors });
//       }
//   }
  onSubmit(e) {
    e.preventDefault();

    const userData = {
      mobileNo: this.state.mobileNo,
      password: this.state.password,
    };

    this.props.loginUser(userData);
    
  }

  render() {
    const { errors } = this.state;

    return (
      <Fragment>
        <Header />
      <section className="container  ">
        <div className = "loginmargin contact-wrap">
        {errors? (
          <div className="alert alert-danger">Invalid credentials</div>
        ) : (
          ""
        )}
        <h1 >Sign In</h1>
        <p className="lead">
          <i className="fas fa-user"></i> Sign into Your Account
        </p>
        <form noValidate className="form" onSubmit={this.onSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Mobile No"
              className={classnames({ "is-invalid": errors.mobileNo })}
              name="mobileNo"
              value={this.state.mobileNo}
              onChange={this.onChange.bind(this)}
            />
            {errors.mobileNo && (
              <div className="invalid-feedback">{errors.mobileNo}</div>
            )}
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              className={classnames({ "is-invalid": errors.password })}
              name="password"
              value={this.state.password}
              onChange={this.onChange.bind(this)}
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password}</div>
            )}
          </div>
          <input type="submit" className="btn " value="Login" />
        </form>
        {/* <p className="my-1">
          Don't have an account? <a href="register.html">Sign Up</a>
        </p> */}
        </div>
      </section>
      <Footer/>
      </Fragment>
    );
  }
}

Login.propTypes = {
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
  auth: state.auth,

});

export default connect(mapStateToProps, {loginUser })(withRouter(Login));
