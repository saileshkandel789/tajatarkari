import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import axios from "axios";
import {API,imageAPI} from "../../config";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import AdminNavbar from "../Dashboard/adminNavbar";


class CategoryList extends Component {
    state = {
        categoryList: [],
        errors: "",
      };

  componentDidMount() {
    axios
      .get(`${API}/category/all`)
      .then((res) =>
        this.setState({
            categoryList: res.data
        })
      )
      .catch((err) => console.log(err));
  }

//   shouldComponentUpdate(prevProps, prevState, snapshot) {
//     if (this.state.bannerList !== prevState.bannerList) {
//     //   return this.props.BannerGet;
//       return true;
//     }
//   }
onDelete = (id) => {
    axios
    .post(`${API}/category/${id}`)
    .then((res) =>
    axios
    .get(`${API}/category/all`)
    .then((res) =>
      this.setState({
        categoryList: res.data
      })
    )
    .catch((err) => console.log(err))
    )
    .catch(
      (err) => console.log(err, "err")
    ); }

  render() {
    let catlist = this.state.categoryList.map((category) => (
        <tr key= {category._id}>
            
            <td>
              <h5>{category.name}</h5>
            </td>
            <td>
              <FontAwesomeIcon
                icon={faTrash}
                style={{ color: "#80b435" }}
                onClick={() => this.onDelete(category._id)}
              />
            </td>
          </tr>
    ));
    return (
      <Fragment>
        
        <div className="admin-dashboard-section">
         
            
            <div className="row">
              <div className="col-md-2">
                <AdminNavbar/>
              </div>
              <div className="col-md-10">
              <div className="dashboard-header">
                  <h3>Category LIST</h3>
              </div>
              <table className= "table" >
                <thead className= "table-head">
                  <tr className= "table-head-each">
                    <th >name</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody >
                  {catlist}
                </tbody>
              </table>
                </div>
            </div>
          </div>
       
  
      </Fragment>
    );
  }
}



export default connect(null, {  })(CategoryList);
