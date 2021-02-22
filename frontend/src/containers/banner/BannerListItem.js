import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import {imageAPI} from "../../config";
import axios from "axios";
import {API} from "../../config";


const BannerListItem = (props) => {
  useEffect(() => {}, []);

  const onDelete = (id) => {
    axios
    .post(`${API}/banner/${id}`)
    .then((res) =>
    //   dispatch({
    //     type: DELETE_BANNER_DATA,
    //     payload: id,
    //   })
    console.log(res , 'res')
    )
    .catch(
      (err) => console.log(err, "err")
      // dispatch({
      //   type: GET_ERRORS,
      //   payload: err.response.data,
      // })
    );
  };
  return (
          <tr>
            <td>
              <img
                  className="img-fluid"
                  src={`${imageAPI}/${props.image}`}
                  style={{ width: "100px" }}
                />
            </td>
            <td>
              <h5>{props.title}</h5>
            </td>
            <td>
              <Link to={`/banner/edit/${props.id}`}>
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
                onClick={() => onDelete(props.id)}
              />
            </td>
          </tr>
  );
};


const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { })(BannerListItem);
