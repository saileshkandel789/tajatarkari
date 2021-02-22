import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import BannerListItem from "./BannerListItem.js";
import axios from "axios";
import {API,imageAPI} from "../../config";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import AdminNavbar from "../Dashboard/adminNavbar";


class BannerList extends Component {
    state = {
        bannerList: [],
        errors: "",
      };

  componentDidMount() {
    axios
      .get(`${API}/banner`)
      .then((res) =>
        this.setState({
          bannerList: res.data
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
    .post(`${API}/banner/${id}`)
    .then((res) =>
    axios
    .get(`${API}/banner`)
    .then((res) =>
      this.setState({
        bannerList: res.data
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
    let bannerlist = this.state.bannerList.map((banner) => (
        <tr key= {banner._id}>
            <td>
              <img
                  className="img-fluid"
                  src={`${imageAPI}/${banner.image}`}
                  style={{ width: "100px" }}
                />
            </td>
            <td>
              <h5>{banner.title}</h5>
            </td>
            <td>
              <Link to={`/banner/edit/${banner._id}`}>
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
                onClick={() => this.onDelete(banner._id)}
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
                <AdminNavbar/>
              </div>
              <div className="col-md-10">
              <div className="dashboard-header">
                  <h3>BANNER LIST</h3>
              </div>
              <table className= "table" >
                <thead className= "table-head">
                  <tr className= "table-head-each">
                    <th >Image</th>
                    <th>Title</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody >
                  {bannerlist}
                </tbody>
              </table>
                </div>
            </div>
          </div>
       
  
      </Fragment>
    );
  }
}



export default connect(null, {  })(BannerList);
