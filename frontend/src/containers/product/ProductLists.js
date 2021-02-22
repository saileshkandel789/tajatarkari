import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { productGet } from "../../actions/productActions";
import Product from "./Product";
import ListView from "./ListView";
import axios from "axios";
import {API} from "../../config";
import Header from "../../components/Header";
import {Footer} from "../../components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faList,faTh
} from "@fortawesome/free-solid-svg-icons";
import classnames from "classnames";



class ProductList extends Component {
  state = {
    product : [],
    loading : false,
    gridView : true,
    error  : '',
    totalData : 0,
    page : 1,
    category: '',
    price: ''
  }
  componentDidMount() {
    this.setState({loading:true});
    axios
      .get(`${API}/product`)
      .then((res) => {
        this.setState({product : res.data , loading : false})
        }
      )
      .catch((err) => {
       this.setState({error : err ,loading:false})
       });
       axios
      .get(`${API}/product/allproduct`)
      .then((res) => {
        // console.log(res.data,'ijij');
        this.setState({totalData : res.data , loading : false})
        }
      )
      .catch((err) => {
       this.setState({error : err ,loading:false})
       });
  }
  getProduct = (no,cat,price) => {
    // console.log(this.state.page,'page');
    axios
      .get(`${API}/product?page=${no}&category=${cat}&price=${price} `)
      .then((res) => {
        this.setState({product : res.data , loading : false})
        // this.setState({page: `${no}`})
        }
      )
      .catch((err) => {
       this.setState({error : err , loading:false})
       });
  } 

  render() {
    let productlist = this.state.product.map((product) => (
    //   console.log(product, "blg")
      <Product
        key={product._id}
        id={product._id}
        name={product.name}
        price={product.price}
        image={product.image}
      />
    ));
    let listviewproduct = this.state.product.map((product) => (
      //   console.log(product, "blg")
        <ListView
          key={product._id}
          id={product._id}
          name={product.name}
          price={product.price}
          image={product.image}
          description ={product.description}
        />
      ));
    return (
      <Fragment>
        <Header />
        <section className="pt-100 pb-50">
          <div className="container-modified">
            <div className="product-banner">
              <div className="product-banner-inner">
                <h3>ALL Products</h3>
              </div>
            </div>
            <div className="wrap-sorting">
                  <div className="ordering">
                    <div className="order-left">
                     <FontAwesomeIcon
                        icon={faList}
                        onClick= {() => this.setState({gridView : false})}
                      /> 
                      <FontAwesomeIcon
                        icon={faTh}
                        onClick= {() => this.setState({gridView : true})}
                      /> 
                      <p>showing  of {this.state.totalData} products</p>  
                    </div>
                    <div className="order-right"></div>
                  </div>
                </div>
            <div className="row justify-content-center">
              <div className="col-md-9">
                
                <div className="row">
                  {this.state.gridView ? productlist : listviewproduct}
                </div>
              </div>
              <div className="col-md-3">
                <div className ="product-aside">

                  <h3 className= "product-aside-title">CATEGORY </h3>
                  <ul>
                  <li onClick = {() =>  
                      { this.setState({category : ""})
                      // console.log(this.state.category,'catt');
                        this.getProduct(1,"",this.state.price)
                    }}
                    className={classnames({ "isgreen": this.state.category === "" })}

                     >All</li>
                    <li onClick = {async() =>  
                      {  
                        const cate = await this.setState({category : "vegetable"})
                      // console.log(this.state.category,'catt');
                        this.getProduct(1,this.state.category,this.state.price)
                    }}
                       className={classnames({ "isgreen": this.state.category === "vegetable" })}
                     >Vegetables</li>
                    <li onClick = {async() =>  {
                      const cate = await this.setState({category : "fruit"})
                      // console.log(this.state.category,'catt');
                      this.getProduct(1,this.state.category,this.state.price)
                      }}
                      className={classnames({ "isgreen": this.state.category === "fruit" })}
                      >Fruits</li>
                    <li>Dry Food</li>
                  </ul>
                </div>
                <div className ="product-aside">
                  
                  <h3 className= "product-aside-title">PRICE </h3>
                  <ul>
                    <li onClick = {async() =>  {
                        const aa = await this.setState({price : ""})
                        this.getProduct(this.state.page,this.state.category,this.state.price)
                        }}  
                        className={classnames({ "isgreen": this.state.price === "" })}                  
                      >All</li>
                    <li onClick = {async() =>  {

                      const aa = await this.setState({price : "0-100"});
                      this.getProduct(this.state.page,this.state.category,this.state.price)
                      }}
                      className={classnames({ "isgreen": this.state.price === "0-100" })}
                      >Rs.0 - Rs 100</li>
                    <li onClick = {async() =>  {
                      const aa = await this.setState({price : "100-200"})
                      this.getProduct(this.state.page,this.state.category,this.state.price)
                      }}
                      className={classnames({ "isgreen": this.state.price === "100-200" })}
                      
                      > Rs.100 - Rs 200</li>
                    <li onClick = {async() =>  {
                      const aa = await this.setState({price : "200-300"})
                      this.getProduct(this.state.page,this.state.category,this.state.price)
                      }}
                      className={classnames({ "isgreen": this.state.price === "200-300" })}

                      >Rs.200 - Rs 300</li>
                    <li onClick = {async() =>  {
                      const aa = await this.setState({price : "300-400"})
                      this.getProduct(this.state.page,this.state.category,this.state.price)
                      }} 
                      className={classnames({ "isgreen": this.state.price === "300-400" })}

                    >Rs.300 - Rs 400</li>
                  </ul>
                </div>
              </div>
              </div>
            <div className = "pagination pagcss">
              <ul>
                <li onClick = {async() =>  {
                      const pagee = await this.setState({page : 1})
                  this.getProduct(this.state.page,this.state.category,this.state.price)}}
                  className={classnames({ "isgreenPage": this.state.page === 1 })}
                  >1</li>
                {this.state.totalData > 10 ? 
                (<li onClick = {async() => {
                  const pagee = await this.setState({page : 2})
                  this.getProduct(this.state.page,this.state.category,this.state.price)}}
                  className={classnames({ "isgreenPage": this.state.page === 2 })}
                  >2</li>) : '' 
              }
               {this.state.totalData > 20 ? 
                (<li onClick = {async() => {
                  const pagee = await this.setState({page : "3"})
                  this.getProduct(this.state.page,this.state.category,this.state.price)}}
                  className={classnames({ "isgreen": this.state.page === "3" })}
                  >3</li>) : ''  
              }

              </ul>
            </div>
          </div>
        </section>
        <Footer />
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  errors: state.errors,
  productData: state.productData,
});

export default connect(mapStateToProps, { productGet })(ProductList);
