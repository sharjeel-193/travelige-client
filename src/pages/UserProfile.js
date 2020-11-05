import React, { useEffect, useState } from 'react'
import {Link, useHistory, useParams} from 'react-router-dom';
import axios from 'axios'

function UserProfile() {

    const {userName, profile} = useParams(); 
    const [posts, setPosts] = useState([]);
    const [err, setErr] = useState('');
    const [user, setUser] = useState([]);
    const [followers, setFollowers] = useState(0);
    const [followings, setFollowings] = useState(0);
    const currentUser = localStorage.getItem("user") === null?'NoOne':JSON.parse(localStorage.getItem("user"))._id;
    

    useEffect(() => {
        console.log(currentUser)
        axios.get("/user/"+userName)
        .then(res => {
            console.log(res.data.profile_posts)
            setPosts(res.data.profile_posts);
            setUser(res.data.profile_user);
            
            
        })
        .catch(err => {
            console.log(err);
            setErr("404 (Not Found): Sorry, no User with this userName")
        })
    }, [user])

    const toggleReaction = (id, react) => {
        fetch("/reaction",{
                method:"put",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":"Bearer "+localStorage.getItem("jwt")
                },
                body:JSON.stringify({
                    postId:id,
                    reaction: react
                })
            }).then(res=>res.json())
            .then(result=>{
                console.log(result);
                const newData = posts.map(item=>{
                  if(item._id==result._id){
                      return result
                  }else{
                      return item
                  }
                })
                console.log(user)
                setPosts(newData)
                setErr('');
            }).catch(err=>{
                console.log(err)
            })
    }

    const deletePost = (postId) => {
        
        fetch(`/deletepost/${postId}`,{
            method: "delete",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            params:JSON.stringify({
                postId: postId
            })
        }).then(res=>res.json())
        .then(result=>{
            console.log(result);
            const newData = posts.filter(item=>{
                return item._id !== result._id
            })
            setPosts(newData)
            setPosts(newData)
        }).catch(err=>{
            console.log(err)
        })
    }

    const followSomeOne = (followId) => {
        fetch("/follow", {
            method: "put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                followId: followId
            })
        }).then(res => res.json)
        .then(result => console.log(result))
        .catch(err => console.log(err))
    }
    const unfollowSomeOne = (followId) => {
        fetch("/unfollow", {
            method: "put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                followId: followId
            })
        }).then(res => res.json)
        .then(result => console.log(result))
        .catch(err => console.log(err))
    }
    return (
        <div >
            <div className="container mt-3" style={{"transition":"0.5s ease-out", display: err===''?"block":"none"}}>
                <div className="row">
                    <div className="col-4 col-md-3 text-center">
                        <img src="https://schoolmaster.faranschool.com/uploads/dummy/user.png" className="profile-img" alt="profile-img"  />
                        <h5 className="text-center">{user.userName}</h5>
                    </div>
                    <div className="col-7 offset-1 col-md-5  justify-content-center d-flex flex-column">
                        <div className="row m-0">
                            <h5>{user.fullName}</h5>
                        </div>
                        <div className="row mt-1 mb-1">
                            <h5 
                                className="btn btn-info waves-effect" 
                                style={{display: (user._id===currentUser || currentUser==="NoOne")?"none":"block"}}
                                onClick={(e) => e.target.innerText==="FOLLOW"?followSomeOne(user._id):unfollowSomeOne(user._id)}
                                >
                                    {user.followers?(user.followers.includes(currentUser)?"UNFOLLOW":"FOLLOW"):"Wait..."}</h5>
                        </div>  
                        <div className="row m-0">
                            <h5>{posts.length} Reviews or Vlogs</h5>
                        </div>
                        <div className="row m-0">
                            <h5>{user.followers?user.followers.length:"No"} Followers</h5>
                        </div>
                        <div className="row m-0">
                            <h5>{user.followings?user.followings.length:"No"} Followings</h5>
                        </div>
                    </div>

                </div>
                <div className="gallery">
                    <div className="card-columns">
                        {
                            posts.map(post => {
                                return(
                                    <div className="card card-feed" key={post._id}>
                                        <Link to={`/${post.postedBy.userName}/${post._id}`} >
                                            <div className="card-image">
                                                <img alt="" src={post.pic} />
                                            </div>
                                        </Link>
                                        <div className="card-content">
                                            <div className="post-data">
                                                <Link to={`/${post.postedBy.userName}/${post._id}`} >
                                                    <h4>{post.heading}</h4>
                                                </Link>
                                                <Link to={`/search/place/${post.place}`}>
                                                    <h6>{post.place}</h6>
                                                </Link>
                                                <p>Posted on: {post.postedOn}</p>
                                            </div>
                                            <div className="justify-content-between align-items-center post-metadata" style={{display: currentUser==='NoOne'?"none":"flex"}}>
                                                <div className="post-reactions">
                                                    <i 
                                                        className={post.agreed.includes(currentUser)?"fas fa-check-circle":"far fa-check-circle"} 
                                                        onClick={() => {toggleReaction(post._id, 'agree')}}
                                                        style={{color: post.agreed.includes(currentUser)?"green":"#414240"}}></i>
                                                    <i 
                                                        className={post.disagreed.includes(currentUser)?"fas fa-times-circle":"far fa-times-circle"} 
                                                        onClick={() => {toggleReaction(post._id, 'disagree')}}
                                                        style={{color: post.disagreed.includes(currentUser)?"red":"#414240"}}></i>
                                                    <i 
                                                        className={post.neutral.includes(currentUser)?"fas fa-meh-blank":"far fa-meh-blank"} 
                                                        onClick={() => {toggleReaction(post._id, 'neutral')}}></i>
                                                </div>
                                                <i className="fas fa-trash del-post-btn" onClick={() => deletePost(post._id)} style={{display: currentUser===post.postedBy._id?"block":"none"}}></i>
                                            </div>
                                            <p>{post.agreed.length} Agreed</p>
                                        </div>
                                    </div>
                                );
                            })
                        }
                        

                    </div>  
                </div>
            </div>
            <h1 style={{display:err!==''?"block":"none", textAlign: "center", marginTop:"40px"}}>{err}</h1>
        </div>
    )
}

export default UserProfile
