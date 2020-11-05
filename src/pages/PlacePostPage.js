import React, {useEffect, useState} from 'react'
import {Link, useParams} from 'react-router-dom'
import axios from 'axios'

function PlacePostPage() {

    const [data, setData]  = useState([]);
    const {placeName} = useParams();
    const currentUser = localStorage.getItem("user") === null?'':JSON.parse(localStorage.getItem("user"))._id;
    const currentUserName = localStorage.getItem("user") === null?'NoOne':JSON.parse(localStorage.getItem("user")).userName;

    useEffect(() => {
        
        axios.get("/related/"+placeName,{
            headers: {
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        })
            .then(res => {
                console.log(res.data);
                // console.log("userID ",currentUser)
                setData(res.data.related);
            })
    },[data]);

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
                const newData = data.map(item=>{
                  if(item._id==result._id){
                      return result
                  }else{
                      return item
                  }
              })
              setData(newData)
            }).catch(err=>{
                console.log(err)
            })
    }
    
    return (
        <div className="container">
            <h1>Posts about {placeName}:</h1>
            <div className="card-columns" style={{display:currentUserName==="NoOne"?"none":"block"}}>
                {
                    data.map(post => {
                        return(
                           <div className="card card-feed" key={post._id}>
                                <div className="d-flex flex-row">
                                    <div>
                                        <div className="feed-post-user-img">
                                            <img alt="" src="https://schoolmaster.faranschool.com/uploads/dummy/user.png" className="img-fluid" />
                                        </div>
                                    </div>
                                    <div className=" align-items-center d-flex" >
                                        <Link to={"/"+post.postedBy.userName}><h5>{post.postedBy.userName}</h5></Link>
                                    </div>
                                </div>
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
                                        
                                        <h6>{post.place}</h6>
                                        <p>Posted on: {post.postedOn}</p>
                                    </div>
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
                                    <p>{post.agreed.length} Agreed</p>
                                </div>
                            </div>
                  
                        );

                    })
                }
            </div>
            
            
        </div>
    )
}

export default PlacePostPage
