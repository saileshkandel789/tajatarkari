import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCross, faTimes, faTimesCircle
} from "@fortawesome/free-solid-svg-icons";
import { API ,imageAPI} from "../../config";
import {addToCart} from "../../actions/cartActions"
import Spinner from "../../components/Spinner";
import Modal from "../../components/Modal";
import Rating from "../../components/Rating";
import classnames from "classnames";
import Header from "../../components/Header";
import {Footer} from "../../components/Footer";






const ProductDesc = (props) => {
  const [product, setProduct] = useState({});
  const [reviews, setReviews] = useState([]);
  const [qty , setQty] = useState(1);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [bgblack , setBgBlack] = useState(false);
  const [cmnterror, cmntSetError] = useState("");








  const loadSingleProduct = (productId) => {
    setLoading(true)
    axios
      .get(`${API}/product/${productId}`)
      .then((res) => {
        setProduct(res.data)
        setReviews(res.data.reviews)
        console.log(res.data.reviews);
        setLoading(false) }
      )
      .catch((err) => {
        setError(err)
      setLoading(false)});
  };
  const quantity = [ 1 , 2 ,3 , 4 , 5, 6 , 7, 8, 9 ]

  const handleStateChange = (event) => {
    setQty(event.target.value);
  }
  const modalClose = () => {
      setModal(false);
      setBgBlack(false);
  }
  const addToCartHandler = () => {
    setModal(true);
    setBgBlack(true);
    props.addToCart(props.match.params.productId,qty)
  }
  const goToHome = () => {
    props.history.push('/')
    
  }
  const goToCart = () => {
    props.history.push('/cart')
    
  }
  const submitHandler = (e) => {
    e.preventDefault()
    // console.log(rating,comment , 'rc');
    // props.history.push('/')
    const data = {
      name : props.auth.user.name ,
      rating : rating,
      comment : comment,
      user : props.auth.user.id 
    }
    axios
      .post(`${API}/product/${props.match.params.productId}/review`, data)
      .then(data => {
            axios
          .get(`${API}/product/${props.match.params.productId}`)
          .then((res) => {
            setReviews(res.data.reviews)
            setComment('')
            setRating(0)

           }
          )
          .catch((err) => {
            setError(err)
          setLoading(false)});
          })
      .catch(err => {
        console.log(err,'errorcmnt');
        // cmntSetError(err);
      } )
    
  }
  useEffect(() => {
    const productId = props.match.params.productId;
    loadSingleProduct(productId);
  }, [props]);


  return (
    <Fragment>
      <div id= "overlay" className={classnames({ "overlayactive": bgblack })} onClick = {modalClose}></div>
      <div id = "modal"
      // show={modal}
       className={classnames({
              "isdisplay": modal,
            })} >
        
        <div className= "modal-wrap d-flex">
          <img src={`${imageAPI}/${product.image}`} alt={product.name} />
          <div className= "modal-info" >
          <FontAwesomeIcon
            icon={faTimesCircle}
            style={{ color: "#ff5e15" ,position: "absolute" ,right:"20px"}}
            onClick = {modalClose}
        />  
              <p className= "productnamemodel">{product.name}</p> 
              <p className="sucesscartmsg">Added to cart successfully</p>
              <div className= "modal-cart d-flex">
                <button className = "btn-default" onClick= {goToHome}>continue shopping</button>
                <button className= "btn-primary" onClick= {goToCart}>go to cart</button>
              </div>
              
          </div>
        </div>
          
                   

        </div>
        <Header/>
        <div className="product-banner">
              <div className="product-banner-inner">
                <h3>Product Description</h3>
              </div>
            </div>
      <section className="pt-100 pb-50">
        <div className="container">
        {loading ? <Spinner /> : 
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="">
                <img
                  src={`${imageAPI}/${product.image}`}
                  className="img-fluid"
                  alt="ddd"
                />

              </div>
              
            </div>
            <div className="col-md-6">
              <div className="product-details-content">
                <div className= "product-name">
                  <h2>{product.name}</h2>
                </div>
                <p>Rs. {product.price } / {product.option}</p>
                
                
                <div className= "product-quantity">
                  Quantity : 
                  <select onChange={handleStateChange}>
                      {quantity.map((x) => (
                        <option value={x} key={x}>
                          {x}
                        </option>
                          ))}
                  </select>
                </div>
                <div className= "wrap-price">
                  <p>Total Rs. {product.price * qty}</p>
                </div>
                <div className= "product-description">        
                   <p>Description : <span className= "pdd">{product.description}</span></p>
                </div>
                <button onClick= {addToCartHandler} className= "addtocart">
                  ADD TO CART 
                </button>
                
                <div >
                </div>
                
              </div>
            </div>
          </div>
          
            }
            <div className="row">
              <div className="col-md-6">
              
            <div className="review-section">
              <h4>Reviews</h4>
              {cmnterror ? cmnterror : ""}

              {/* {product.reviews.length === 0 && <p>No Reviews</p>} */}
              {/* {JSON.stringify(product.reviews)} */}
              <ul>
                {reviews.map((review) => (
                  <li key={review._id}>
                    <div className="rs-list-wrap">
                      <p>
                        <strong>{review.name}</strong>
                        <span className="review-date">{review.createdAt.substring(0, 10)}</span>
                      </p>
                      <Rating value={review.rating} />
                    </div>
                    
                    <h5>{review.comment}</h5>
                  </li>
                ))}
                </ul>
                <h5>WRITE A CUSTOMER REVIEW</h5>
                
                    <form onSubmit={submitHandler} className= "review-section">
                      <div className="form-group">
                        <label>Ratings : </label>
                        <select
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value=''>Select...</option>
                          <option value='1'>1 - Poor</option>
                          <option value='2'>2 - Fair</option>
                          <option value='3'>3 - Good</option>
                          <option value='4'>4 - Very Good</option>
                          <option value='5'>5 - Excellent</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Comment</label>
                        <textarea
                          row='3'
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></textarea>
                      </div>
                      <button type='submit' className ="submitReview">
                        Submit REVIEW
                      </button>
                    </form>
                  
              </div>
                
              </div>
            </div>
        </div>
      </section>
      <Footer/>
    </Fragment>
  );
};
const mapStateToProps = (state) => ({
  productData: state.productData,
  auth:state.auth
});

export default connect(mapStateToProps , {addToCart})(ProductDesc);
