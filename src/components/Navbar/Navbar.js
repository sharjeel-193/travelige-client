import React, { useState, useEffect, useContext } from 'react'
import {Link, useHistory} from 'react-router-dom'
import './Navbar.css'
import {UserContext} from '../../App'
import $ from 'jquery'

function Navbar() {
    const {state, dispatch} = useContext(UserContext);
    const [burger, setBurger] = useState(false);
    const currentUserName = localStorage.getItem("user") === null?'NoOne':JSON.parse(localStorage.getItem("user")).userName;
    
    const history = useHistory();
    const renderList = () => {
        if(state){
            return [
                <li className="nav-item" key="0">
                    <Link to="/feed" className="nav-link">Home</Link>
                </li>,
                <li className="nav-item" key="1">
                    <Link to="/add" className="nav-link">Add Vlog / Review</Link>
                </li>,
                <li className="nav-item" key="2">
                    <Link to={"/"+currentUserName} className="nav-link btn btn-outline-dark">Profile</Link>
                </li>,
                 <li  key="7">
                    <Link to="/logIn"  className="nav-link btn btn-danger ml-2 mr-2" onClick={()=>{
                        localStorage.clear()
                        dispatch({type:"CLEAR"})
                        history.push('/logIn')
                        }}>Logout</Link>
                </li>

            ]
        } else {
            return [
                <li className="nav-item" key="3">
                    <Link to="/" className="nav-link">Home</Link>
                </li>,
                <li className="nav-item" key="4">
                    <Link to="/about" className="nav-link">About Us</Link>
                </li>,
                <li className="nav-item" key="5">
                    <Link to="/logIn" className="nav-link"><b>Log In</b></Link>
                </li>,
                <li className="nav-item" key="6">
                    <Link to="/signUp" className="nav-link btn btn-outline-dark">Sign Up</Link>
                </li>
                
            ];
        }
    }

    function handleClick(e){
        setBurger(!burger);
        $(".mobile-menu-list").slideToggle();
    }
    useEffect(() => {
        document.addEventListener('scroll',() => {
            const isTop = window.scrollY > 5;
            if (isTop) {
                $(".navbar-wrapper").css("background-color","white")
            } else  {
                $(".navbar-wrapper").css("background-color","transparent")
            }
        })
    }, [])
    return (
        <div className="navbar-wrapper">
            <div className="container navbar-container">
                <Link to={state?"/feed":"/"} className="nav-brand">Travelige</Link>
                <ul className="menu-list d-none d-md-block">
                    {renderList()}
                </ul>
                
                <div className="d-block d-md-none" onClick={handleClick}>
                    <i className={burger?'fa fa-bars':'fa fa-times'} id="menu-icon"></i>
                </div>
            </div>
            <div className="container d-block d-md-none">
                <ul className="mobile-menu-list" onClick={handleClick}>
                    {renderList()}
                </ul>
            </div>
        </div>
    )
}

export default Navbar

