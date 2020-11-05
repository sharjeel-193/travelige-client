import React, {useState, useContext} from 'react'
import {Link, useHistory} from 'react-router-dom'
import axios from 'axios'
import M from 'materialize-css'
import { UserContext } from '../App';

function SignInPage() {

    const {state,dispatch} = useContext(UserContext)
    const history = useHistory()
    const currentUserName = localStorage.getItem("user") === null?'NoOne':JSON.parse(localStorage.getItem("user")).userName;
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit(e){
        e.preventDefault();
        const user = {
            id: id,
            password: password,
        }
        console.log(JSON.stringify(user));
        axios.post("http://localhost:5000/signIn",user)
            .then(res => {
                console.log(res.data);
                if(res.data.error){
                    M.toast({html: res.data.error, classes:"#424140 grey darken-3"})
                } else {
                    localStorage.setItem("jwt",res.data.token);
                    localStorage.setItem("user",JSON.stringify(res.data.user));
                    // dispatch({type:"USER",payload: res.data.user});
                    M.toast({html: res.data.message,classes:"#43a047 green darken-1"});
                    history.push("/feed");
                    window.location.reload(false);
                    
                    
                }
            })
            .catch(err=>{
                M.toast({html: "Sorry we could not process your request try again later...", classes:"#424140 grey darken-3"})
                console.log(err)
            })
            // window.location.reload(true)
    }
    return (
        <div className="page-wrapper signIn-wrapper">
            <div className="signIn-form">
                <h3 className="auth-heading">Sign In</h3>
                <form onSubmit={handleSubmit}> 
                    <div className="form-row input-field d-block">
                        <i className="fas fa-user-circle prefix"></i>
                        <input id="id" type="text" className="validate" value={id} onChange={(e) => setId(e.target.value)}/>
                        <label htmlFor="id">Username or Email</label>
                    </div>
                    <div className="form-row input-field d-block">
                        <i className="fas fa-key prefix"></i>
                        <input id="password" type="text" className="validate" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        <label htmlFor="password">Password</label>
                    </div>
                    <div className="form-row d-flex justify-content-between align-items-center">
                        <Link to="signUp" className="ml-4 soft-color">Don't have an Account? Sign Up Here</Link>
                        <button className="auth-button" type="submit">Log In</button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default SignInPage
