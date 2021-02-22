import React ,{Fragment} from 'react';
import Header from "../components/Header";
import {Footer} from "../components/Footer";
import BannerHome from "../containers/banner/BannerHome";
import Features from "../components/Features";
import ProductHome from "../containers/product/ProductHome";
import WhyChooseUs from "../components/WhyChooseUs";
import BannerBg from "../components/BannerBg";



const Home = () => {
    return (
        <Fragment>
            <Header/>
            <BannerHome/>
            <Features />
            <ProductHome />
            <BannerBg/>
            <WhyChooseUs />
            <Footer/>
        </Fragment>
    )
}

export default Home
