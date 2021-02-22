import React, { Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { compose } from "redux";
import store from "./store";
import "./index.css";
import jwt_decode from "jwt-decode";
import jwt from "jsonwebtoken";

import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser } from "../src/actions/authActions";


import Home from "./containers/Home";
  import Login from "./containers/auth/Login";
  import Register from "./containers/auth/Register";
  import AddProduct from "./containers/product/AddProduct";
  // import ProductList from "./containers/product/ProductLists"
  import Nav from "./components/Nav";
import ProductLists from "./containers/product/ProductLists";
import ProductDetail from "./containers/product/ProductDetail";
import Cart from "./containers/cart/Cart";
import CartShipping from "./containers/cart/CartShipping";
import Payment from "./containers/cart/Payment";
import AddBanner from "./containers/banner/AddBanner";
import BannerList from "./containers/banner/BannerList";
import AdminProductLists from "./containers/product/AdminProductLists";
import Dashboard from "./containers/Dashboard/Index";
import Adminorder from "./containers/order/AdminOrder";
import MyOrder from "./containers/order/UserOrder";
import {PrivateRoute ,AdminRoute} from "./containers/auth/PrivateRoute";
import category from "./containers/category/CategoryHome";
import AddCategory from "./containers/category/AddCategory";
import CategoryList from "./containers/category/CategoryList";
import AddPro from "./containers/newproduct/addProduct";
import {errorPage} from "./containers/withErrorHandler/errorPage"
import {logoutUser} from "./actions/authActions"











// // check for token
// if (localStorage.jwtToken) {
//   // set auth token header auth
//   setAuthToken(localStorage.jwtToken);
//   // decode token and get user info and exp
//   // const decoded = jwt_decode(localStorage.jwtToken);
//   // decoded.isAdmin = localStorage.isAdmin;
//   // // // set user and isAuthenticated
//   // store.dispatch(setCurrentUser(decoded));
//   jwt.verify(localStorage.jwtToken,'secret',function(err,decode){
//     if(err){
//         store.dispatch(logoutUser());
//     }else{
//      console.log(decode,'decoddddddd');
//      decode.isAdmin = localStorage.isAdmin;
//       store.dispatch(setCurrentUser(decode));
//     }
//    });
// }
if (localStorage.jwtToken) {
  // set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // decode token and get user info and exp
  const decode = jwt_decode(localStorage.jwtToken);
  console.log(decode,'kl');
  decode.isAdmin = localStorage.isAdmin;
  // setCurrentUser(decoded)
  // // // set user and isAuthenticated
  // store.dispatch(setCurrentUser(decoded));
  // jwt.verify(localStorage.jwtToken,'bearer ',function(err,decode){
  //   // if(err){
  //   //     store.dispatch(logoutUser());
  //   // }else{
  //    console.log(decode,'decoddddddd');
  //   //  decode.isAdmin = localStorage.isAdmin;
      store.dispatch(setCurrentUser(decode));
  //   // }
  //  });
}

function App() {
  
  
  return (
    <Provider store={store}>
        <Router>
          <Fragment>
            {/* <Nav /> */}
            <Route exact path="/" component={Home} />
            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <AdminRoute exact path="/addProduct" component={AddProduct} />
              <Route exact path="/productList" component={ProductLists} />
              <Route exact path="/product/:productId" component={ProductDetail} />
              <Route exact path="/cart" component={Cart} />
              <Route exact path="/shippingInfo" component={CartShipping} />
              <Route exact path="/payment" component={Payment} />
              <AdminRoute exact path="/Addbanner" component={AddBanner} />
              <AdminRoute exact path="/Bannerlist" component={BannerList} />
              <AdminRoute exact path="/banner/edit/:bannerId" component={AddBanner} />
              <AdminRoute exact path="/product/edit/:productId" component={AddProduct} />

              <AdminRoute exact path="/adminProductList" component={AdminProductLists} />
              <AdminRoute exact path="/dashboard" component={Dashboard} />
              <AdminRoute exact path="/admin/order" component={Adminorder} />
              <PrivateRoute exact path="/myOrder" component={MyOrder} />
              <Route exact path="/category" component={category} />
              <Route exact path="/Addcategory" component={AddCategory} />
              <Route exact path="/admin/category" component={CategoryList} />
              <Route exact path="/addPro" component={AddPro} />
              <Route exact path="/error" component={errorPage} />




            </Switch>
          </Fragment>
        </Router>
      </Provider>
  );
}

export default App;
