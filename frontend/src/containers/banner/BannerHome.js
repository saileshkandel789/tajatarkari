import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {imageAPI ,API} from "../../config";
import axios from "axios";


class BannerHome extends Component {
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

  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
    };

    return (
      <section id="bannerHome">
        <div>
          <Slider {...settings}>
            {this.state.bannerList.map((banner) => (
              <div key={banner._id} className="banner">
                <img
                  src={`${imageAPI}/${banner.image}`}
                  alt={banner.title}
                  className="img-fluid"
                />
              </div>
            ))}
          </Slider>
        </div>
      </section>
    );
  }
}


const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, {  })(withRouter(BannerHome));
