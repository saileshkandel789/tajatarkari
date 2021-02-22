import React , {useState}from 'react'
import { useEffect } from 'react';
import axios from "axios";
import {API} from "../../config";
import Product from "./Product";
import { Link } from "react-router-dom";



const ProductHome = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);


    useEffect(() => {
        setLoading(true)
        axios
            .get(`${API}/product`)
            .then((res) => {
                setProducts(res.data)
                setLoading(false) }
            )
            .catch((err) => {
                setError(err)
            setLoading(false)});
        }, [])

    return (
        <section className= "productHome">
            <div className="container">
                <div className="title-text">
                    <h3>Latest Products</h3>
                </div>
                <div className="row">
                    {products.map(product => (
                        <Product
                        key={product._id}
                        id={product._id}
                        name={product.name}
                        price={product.price}
                        image={product.image}
                      />
                      ))}
                </div>
                <div className="viewall">
                    <Link to="/productList">
                     <button className= "viewallbtn mx-auto"> VIEW ALL</button>
                     </Link>
                </div>
            </div>
        </section>
    )
}

export default ProductHome
