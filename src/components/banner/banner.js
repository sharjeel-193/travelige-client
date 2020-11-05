import React from 'react'
import './banner.css'


const features = [
    {
        icon:"fas fa-atlas",
        name: "Reviews",
        text: "A huge set of revies is awaiting for u",
        key: 0
    },
    {
        icon: "fas fa-map-marked-alt",
        name: "Maps",
        text: "Choosing place based on revies through user friendly integration of maps",
        key: 1,
    },
    {
        icon: "fas fa-map-signs",
        name: "Decision",
        text: "Decision to go to right place",
        key: 2,
    },
    
];

function Banner() {
    return (
        <div className="banner-wrapper">
                <div className="banner-pics">
                    <div className="banner-img">
                        <img className="banner-responsive-img" src="Images/Banner/camera-woman.png" alt="camera woman"/>
                    </div>
                    <blockquote className="d-none d-md-block quote">
                        <q>THE REAL VOYAGE OF DISCOVERY CONSISTS NOT IN SEEKING NEW LANDSCAPES, BUT IN HAVING NEW EYES.</q>
                        <footer><cite>- Marcel Proust</cite></footer>
                    </blockquote>
                    <div className="banner-img">
                        <img className="banner-responsive-img" src="Images/Banner/hiking-man.png" alt="hiking woman"/>
                    </div>
                </div>
                <div className="banner-text">
                    <div className="container banner-container">
                        <div className="row banner-heading">
                            <h3 className="col-12 text-center">Features</h3>
                        </div>
                        <div className="row feature-row">
                            {features.map((feature) => {
                                return(
                                    <div className="col-10 col-md-3 offset-1 feature-card" key={feature.key}>
                                        <i className={feature.icon}></i>
                                        <h4>{feature.name}</h4>
                                        <p>{feature.text}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
                
            </div>
    )
}

export default Banner

