import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import axios from "axios";
import {API,imageAPI} from "../../config";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import AdminNavbar from "../Dashboard/adminNavbar";
import withErrorHandler from "../withErrorHandler/withErrorHandler";
import { withRouter } from "react-router-dom";


class AdminProductList extends Component {
    state = {
        productList: [],
        errors: "",
      };

  componentDidMount() {
    axios
      .get(`${API}/product`)
      .then((res) =>
        this.setState({
          productList: res.data
        })
      )
      .catch((err) => this.ondispatcherror(err));
  }

//   shouldComponentUpdate(prevProps, prevState, snapshot) {
//     if (this.state.bannerList !== prevState.bannerList) {
//     //   return this.props.BannerGet;
//       return true;
//     }
//   }
onDelete = (id) => {
    axios
    .post(`${API}/product/${id}`)
    .then((res) =>
    axios
    .get(`${API}/product`)
    .then((res) =>
      this.setState({
        productList: res.data
      })
    )
    .catch((err) => this.ondispatcherror(err))
    )
    .catch(
      (err) => console.log(err, "err")
      // dispatch({
      //   type: GET_ERRORS,
      //   payload: err.response.data,
      // })
    ); }

  render() {
    let productlist = this.state.productList.map((product) => (
        <tr key= {product._id}>
            <td>
              <img
                  className="img-fluid"
                  src={`${imageAPI}/${product.image}`}
                  style={{ width: "100px" }}
                />
            </td>
            <td>
              <h5>{product.name}</h5>
            </td>
            <td>
              <h5>{product.category}</h5>
            </td>
            <td>
              <Link to={`/product/edit/${product._id}`}>
                <FontAwesomeIcon
                  icon={faEdit}
                  style={{ color: "#80b435", marginRight: "10px" }}
                />
              </Link>
            </td>
            <td>
              <FontAwesomeIcon
                icon={faTrash}
                style={{ color: "#80b435" }}
                onClick={() => this.onDelete(product._id)}
              />
            </td>
          </tr>
    //   <BannerListItem
    //     key={banner._id}
    //     id={banner._id}
    //     title={banner.title}
    //     image={banner.image}
    //   />
    ));
    return (
      <Fragment>
        
        <div className="admin-dashboard-section">
         
            <div className="row">
              <div className="col-md-2">
                <AdminNavbar />
              </div>
              <div className="col-md-10">
              <h3 className="large dashboard-header">
                     All Products
                  </h3>
              <table className= "table" >
                <thead className= "table-head">
                  <tr className= "table-head-each">
                    <th >Image</th>
                    <th>Name</th>
                    <th>category</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody >
                  {productlist}
                </tbody>
              </table>
                </div>
            </div>
          </div>
       
  
      </Fragment>
    );
  }
}

export default connect(null)(withRouter(withErrorHandler(AdminProductList,axios)));


// export default connect(null, {  })(AdminProductList);
