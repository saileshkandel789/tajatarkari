import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import classnames from "classnames";
import { GET_ERRORS } from "../../actions/types";
import axios from "axios";
// import axios from "../../utils/axios";

import { API } from "../../config";
import Spinner from "../../components/Spinner";
import AdminNavbar from "../Dashboard/adminNavbar";


class AddProduct extends Component {
  state = {
    _id: "",
    name: "",
    category: "",
    price: "",
    description: "",
    image: "",
    errors: "",
    loading : false,
    option : ""
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
  componentDidMount() {
    // console.log(this.props.match.params.productId ,'opopopopjj');
    if (this.props.match.params && this.props.match.params.productId) {
      axios
        .get(`${API}/product/${this.props.match.params.productId}`)
        .then((res) => {
        //   console.log(res, "res");
          this.setState({
            _id: this.props.match.params.productId,
            name: res.data.name,
            category: res.data.category,
            price: res.data.price,
            description: res.data.description,
            image: res.data.image,
            option:res.data.option
          });
        })
        .catch((err) => console.log(err));
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    console.log(this.props.auth.user.id , 'user')
    const fd = new FormData();
    fd.append("image", this.state.image);
    fd.append("name", this.state.name);
    fd.append("category", this.state.category);
    fd.append("price", this.state.price);
    fd.append("description", this.state.description);
    fd.append("_id", this.state._id);
    console.log(this.state._id ,'fuu');
    fd.append("option" , this.state.option );
    this.setState({loading:true})

    axios
      .post(`${API}/product`, fd)
      .then((res) =>
        this.setState({
          name: "",
          category: "",
          price: "",
          description: "",
          image: "",
          _id: "",
          loading: false,
          option : ""
        })
      )
      .catch((err) => this.ondispatcherror(err));
  }
  handleStateChange = (event) => {
    this.setState({ option: event.target.value });
    console.log(this.state.option,'opp');
  };
  
  render() {
    const { errors } = this.state;
    console.log(this.props, "prop");

    const handleChange = (name) => (event) => {
      const value =
        name === "image" ? event.target.files[0] : event.target.value;
      this.setState({ image: value });
    };
    let optionState = [
      { id: 0, name: "per kg" },
      { id: 1, name: "per mutha" },
      { id: 2, name: "per piece" },
      { id: 3, name: "per litre" },
      
    ];

    return (
      <Fragment>
        <div className="admin-dashboard-section">
            <div className="row">
              <div className="col-md-2">
                <AdminNavbar />
              </div>
              <div className="col-md-10">
              {this.state.loading ? <Spinner /> : 

                <div className="contact-wrap">
                  <h3 className="large ">
                    {this.props.match.params.productId ? "Edit Product" : "Add Product"}
                  </h3>

                  <form className="form" onSubmit={this.onSubmit}>
                    <div className="row">
                      <div className="form-group col-md-6 col-sm-10">
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
                      <div className="form-group col-md-6 col-sm-10">
                        <input
                          type="text"
                          placeholder="Category"
                          className={classnames({
                            "is-invalid": errors.category,
                          })}
                          name="category"
                          value={this.state.category}
                          onChange={this.onChange.bind(this)}
                        />
                        {errors.category && (
                          <div className="invalid-feedback">
                            {errors.category}
                          </div>
                        )}
                      </div>
                      <div className="form-group col-md-6 col-sm-10">
                        <input
                          type="text"
                          placeholder="price"
                          className={classnames({
                            "is-invalid": errors.price,
                          })}
                          name="price"
                          value={this.state.price}
                          onChange={this.onChange.bind(this)}
                        />
                        {errors.price && (
                          <div className="invalid-feedback">
                            {errors.price}
                          </div>
                        )}
                      </div>
                      <div className="form-group col-md-6 col-sm-10">
                        <select onChange={this.handleStateChange}>
                            {optionState.map((loc) => (
                              <option value={loc.name} key={loc.id} selected={this.state.option == loc.name} >
                                {loc.name}
                              </option>
                            ))}
                          </select>
                      </div> 
                      <div className="form-group col-md-6 col-sm-10">
                        <input
                          type="text"
                          placeholder="description"
                          className={classnames({
                            "is-invalid": errors.description,
                          })}
                          name="description"
                          value={this.state.description}
                          onChange={this.onChange.bind(this)}
                        />
                        {errors.description && (
                          <div className="invalid-feedback">
                            {errors.description}
                          </div>
                        )}
                      </div>
                      <div className="form-group col-md-6 col-sm-10">
                        <input
                          type="file"
                          accept="image/*"
                          name="image"
                          onChange={handleChange("image")}
                        />
                      </div>
                      <div className=" col-md-12 ">
                        <input type="submit" className="btn " value="Submit" />
                      </div>
                    </div>
                  </form>
                </div>
                }
              </div>
            </div>
          </div>
        

      </Fragment>
    );
  }
}

AddProduct.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps)(withRouter(AddProduct));
