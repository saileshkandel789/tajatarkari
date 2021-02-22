import React from 'react';
import Img from "../images/whychooseusimg.jpg"

const WhyChooseUs = () => {
    return (
        <section id= "whychooseus">
            <div className="container">
                <div className= "why-header">
                <h3>Why Choose Us </h3>
                 <p>The fact of the matter is that you really know something's organic when you find bugs! they obviously wouldn't have made it that far in a non-organic growing environment, so better than any certification or seal on a package, the presence of creatures let you know the plant was healthy and.</p>
                  
                </div>
                <div className="why-body">
                    <div className="row">
                        <div className="col-md-3">
                            <div className="why-text">
                                <h3>100% Organic</h3>
                                <p>Suspendisse ultricies nisi vel quam suscipit, et rutrum odio porttitor. </p>
                            </div>
                            <div className="why-text">
                                <h3>Family healthy</h3>
                                <p>Suspendisse ultricies nisi vel quam suscipit, et rutrum odio porttitor. </p>
                            </div>
                            <div className="why-text">
                                <h3>Always Fresh</h3>
                                <p>Suspendisse ultricies nisi vel quam suscipit, et rutrum odio porttitor. </p>
                            </div>
                            
                        </div>
                        <div className="col-md-6">
                            <img src={Img} alt="whychooseusimg"/>
                        </div>
                        <div className="col-md-3">
                            <div className="why-text">
                                <h3>Low Price</h3>
                                <p>Suspendisse ultricies nisi vel quam suscipit, et rutrum odio porttitor. </p>
                            </div>
                            <div className="why-text">
                                <h3>Family healthy</h3>
                                <p>Suspendisse ultricies nisi vel quam suscipit, et rutrum odio porttitor. </p>
                            </div>
                            <div className="why-text">
                                <h3>Always Fresh</h3>
                                <p>Suspendisse ultricies nisi vel quam suscipit, et rutrum odio porttitor. </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default WhyChooseUs
