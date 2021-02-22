import React, { useEffect,Fragment } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import classnames from "classnames";
import Logo from "../../images/tarkarilogo2.png";

const AdminNavbar = (props) => {
  

  return (
    <Fragment>
    <div id="mobilenav"></div>
    <div className="admin-navbar" id="navbar">
      <Link to="/">
        <div className="logo">
          <img src={Logo} alt="logo" className="img-fluid" />
        </div>
      </Link>

      <ul>
      <li>
          <Link
            to="/dashboard"
            className={classnames({
              ishover: props.location.pathname === "/dashboard",
            })}
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            to="/addProduct"
            className={classnames({
              ishover: props.location.pathname === "/addProduct",
            })}
          >
            add Product
          </Link>
        </li>

        <li>
          <Link
            to="/addBanner"
            className={classnames({
              ishover: props.location.pathname === "/addBanner",
            })}
          >
            add Banner
          </Link>
        </li>
        <li>
          <Link
            to="/adminProductList"
            className={classnames({
              ishover: props.location.pathname === "/adminProductList",
            })}
          >
            Product List
          </Link>
        </li>
        <li>
          <Link
            to="/Bannerlist"
            className={classnames({
              ishover: props.location.pathname === "/Bannerlist",
            })}
          >
            Banner List
          </Link>
        </li>
        <li>
          <Link
            to="/admin/order"
            className={classnames({
              ishover: props.location.pathname === "/admin/order",
            })}
          >
            Orders
          </Link>
        </li>
      </ul>
    </div>
    
    </Fragment>
  );
};

export default withRouter(AdminNavbar);
