import React, { useEffect,Fragment } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";


const AdminNavbar = (props) => {
  

  return (
    <Fragment>
    <div className="admin-navbar" id="navbar">

      <ul>
        <li>
          <Link
            to="/addProduct"
            
          >
            addproduct
          </Link>
        </li>
        </ul>
        </div>
    
    </Fragment>
  );
};

export default withRouter(AdminNavbar);
