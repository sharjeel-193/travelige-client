import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import './hero.css'
// import $ from 'jquery'


const images = [
    "Images/Carousel/banner1.jpg",
    "Images/Carousel/banner2.jpg",
    "Images/Carousel/banner3.jpg",
    "Images/Carousel/banner4.jpg",
]


// export default function Hero() {


//     const [imageIndex, setimageIndex] = useState(0)
//     // setInterval(() => {
//     //     if(imageIndex === images.length - 1){
//     //         setimageIndex(0)
//     //     } else {
//     //         setimageIndex(imageIndex+1)
//     //     }
//     //   }, 5000);
    
    

//     return (
        
//         <div className="hero-wrapper">
//                 <img src={images[imageIndex]} className="croos" alt={`Banner ${imageIndex}`}/>
                
//                 <div className="container">
//                     <h1 className="hero-text">Share your traveling experience</h1>
//                     <div className="btn-grp">
//                         <Link to="signIn"><button className="outlinebtn">SIGN IN</button></Link>
//                         <Link to="signUp"><button className="fillbtn">SIGN UP</button></Link>
//                     </div>
//                 </div>
//             </div>
//     )
// }

// import React, { Component } from 'react'

export default class Hero extends Component {
    
    constructor(props){
        super(props);
        
        this.state = {
            imageIndex: 0
        }
    }
    
    componentDidMount(){
        setInterval(() => {
            if(this.state.imageIndex === images.length - 1){
                this.setState({
                    imageIndex: 0,
                })
            } else {
                this.setState({
                    imageIndex: this.state.imageIndex + 1
                })
            }
        }, 5000);
    
    }

    
    render() {
        return (
            <div className="hero-wrapper">
                <img src={images[this.state.imageIndex]} className="croos" alt={`Banner ${this.state.imageIndex}`}/>
                
                <div className="container">
                    <h1 className="hero-text">Share your traveling experience</h1>
                    <div className="btn-grp">
                        <Link to="signIn"><button className="outlinebtn">SIGN IN</button></Link>
                        <Link to="signUp"><button className="fillbtn">SIGN UP</button></Link>
                    </div>
                </div>
            </div>
        )
    }
}





