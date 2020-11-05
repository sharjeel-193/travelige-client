import React, {useState} from 'react'
// import $ from 'jquery'
import './pages.css'
import {Link, useHistory} from 'react-router-dom'
import axios from 'axios'
import M from 'materialize-css'
// import { application, json } from 'express';


export default function SignUpPage() {
    const history = useHistory();

    const [fullName, setFullName] = useState('');
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit(e){
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html: "invalid email",classes:"#c62828 red darken-3"})
            return
        }

        e.preventDefault();
        const user = {
            fullName: fullName,
            userName: userName,
            email: email,
            password: password
        }
        console.log(JSON.stringify(user));
        
        axios.post("/signUp", user)
            .then(res => {
                // console.log(res.data)
                if(res.data.error){
                    M.toast({html: res.data.error, classes:"#424140 grey darken-3"})
                    console.log(res.data)
                } else {
                    M.toast({html: res.data.message,classes:"#43a047 green darken-1"});

                    history.push('/logIn');
                }
            })
            .catch(err=>{
                M.toast({html: "Sorry we could not process your request try again later...", classes:"#424140 grey darken-3"})
                console.log(err)
            })
            
        
    }
            
        
    

    return (
        <div className="page-wrapper row">
            <div className="d-none d-md-block signUp-wrapper">
                <div className="signUp-container">
                    <h3 className="signUp-heading">Make Travelige your traveling partner</h3>
                </div>
            </div>
            <div className="signUp-form-wrapper">
                <h3 className="auth-heading">Sign Up</h3>
                <div className="signUp-form">
                    <form onSubmit={handleSubmit}>
                        <div className="form-row input-field d-block">
                            <i className="fas fa-user prefix"></i>
                            <input id="fullName" type="text" className="validate" value={fullName} onChange={(e) => setFullName(e.target.value)}/>
                            <label htmlFor="fullName">Full Name</label>
                        </div>
                        <div className="form-row input-field d-block">
                            <i className="fas fa-user-circle prefix"></i>
                            <input id="userName" type="text" className="validate" value={userName}  onChange={(e) => setUserName(e.target.value)}/>
                            <label htmlFor="userName">Choose a unique username</label>
                        </div>
                        <div className="form-row input-field d-block">
                            <i className="fas fa-envelope prefix"></i>
                            <input id="email" type="email" className="validate" value={email}  onChange={(e) => setEmail(e.target.value)}/>
                            <label htmlFor="email">Enter your Email</label>
                        </div>
                        <div className="form-row input-field d-block">
                            <i className="fas fa-key prefix"></i>
                            <input id="password" type="text" className="validate" value={password}  onChange={(e) => setPassword(e.target.value)}/>
                            <label htmlFor="password">Choose your password</label>
                        </div>
                        <div className="form-row input-field d-block">
                            <i className="fas fa-lock prefix"></i>
                            <input id="confirmPassword" type="text" className="validate" />
                            <label htmlFor="confirmPassword">Confirm yor Password</label>
                        </div>
                        <div className="form-row d-flex justify-content-between align-items-center">
                            <button className="auth-button" type="submit">Finish</button>
                            <Link to="logIn" className="soft-color">Already have an account? Sign In here</Link>
                        </div>
                    </form>
                </div>  
            </div>
        </div>
        
    )
}
