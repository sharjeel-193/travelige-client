
import React, {useEffect, useState} from 'react'
import './AppPages.css'
import {useHistory, useParams, Link} from 'react-router-dom'
import axios from 'axios'

function PostPage(props) {

    const currentUser = localStorage.getItem("user") === null?'NoOne':JSON.parse(localStorage.getItem("user"))._id;
    const history = useHistory();
    const {postId, userName} = useParams();
    const [comment, setComment] = useState('');
    const [data, setData]  = useState([]);
    const [sideBar, setSideBar] = useState([]);
    const searchPlace = data[0]?data[0]:"nothing";
    useEffect(() => {
        
        axios.get(`/post/${postId}`,{
            headers: {
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        })
            .then(res => {
                console.log(postId)
                console.log(res.data);
                console.log("userID ",currentUser)
                setData(res.data.this_post);
                console.log(data)
            });

        axios.get(`/related/${searchPlace.place}`)
        .then(res => {
            // console.log(res.data)
            let sidePosts = res.data.related.filter(post => post._id!=searchPlace._id)
            console.log(sidePosts)
            setSideBar(sidePosts);
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

    const makeComment = (text, postId) => {
        fetch("/comments", {
            method: "put",
            headers: {
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId: postId,
                text: text
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

    const deleteComment = (postId, commentId) => {
        fetch(`http://localhost:5000/deleteComment/${commentId}`,{
            method: "put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId:postId,
                commentId: commentId
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
            <div className="row">
                <div className="col-12 col-md-8 col-lg-9">
                    {data.map(post => {
                        return(
                            <div>
                                <div className="align-items-center d-flex justify-content-between">
                                    <div className="" style={{width:"10%"}}>
                                        <img className="img-fluid" src="https://schoolmaster.faranschool.com/uploads/dummy/user.png" style={{borderRadius:"50%"}}/>
                                    </div>
                                    <h4 className="" style={{width:"88%"}}>{post.postedBy.fullName}</h4>
                                </div>
                                <h2 style={{textAlign: "center"}}>{post.heading}</h2>
                                <Link to={`/search/place/${post.place}`}>
                                    <h5 style={{color:"#616161", textAlign:"center"}}>about {post.place}</h5>
                                </Link>
                                <img src={post.pic} style={{width: "100%", borderRadius:"10%"}}/>
                                <div style={{ padding: "20px", borderRadius: "20px", color:"black", fontSize:"20px", textAlign:"justify"}}>{post.body}</div>
                                <p>Posted On: {post.postedOn}</p>
            
                                <hr />

                                <div className="post-reactions" style={{display: currentUser==='NoOne'?"none":"block"}}>
                                    <i  className={post.agreed.includes(currentUser)?"fas fa-check-circle":"far fa-check-circle"}
                                        style={{color: "green"}} onClick={() => {toggleReaction(postId, 'agree')}}> {post.agreed.length}  Agreed</i>
                                    <i  className={post.disagreed.includes(currentUser)?"fas fa-times-circle":"far fa-times-circle"} 
                                        style={{color: "red"}} onClick={() => {toggleReaction(postId, 'disagree')}}> {post.disagreed.length}  Disagreed</i>
                                    <i  className={post.neutral.includes(currentUser)?"fas fa-meh-blank":"far fa-meh-blank"} 
                                        onClick={() => {toggleReaction(postId, 'neutral')}}> {post.neutral.length}  Neutral</i>
                                </div>

                                <hr />

                                <div className="comments-section">
                                    <h5>Comments</h5>
                                    {
                                        post.comments.map(record=>{
                                            return(
                                                <div key={record._id} className="d-flex justify-content-between align-items-center cmnt-div">
                                                    <p><b>{record.postedBy.userName}</b>  {record.text}</p>
                                                    <i  className="fas fa-trash del-cmnt-btn" 
                                                        style={{display: record.postedBy._id===currentUser? "block":"none"}}
                                                        onClick={() => deleteComment(postId, record._id)}></i>
                                                </div>
                                            )
                                        })
                                    }
                                </div>

                                <form onSubmit={(e)=>{
                                            e.preventDefault()
                                            makeComment(e.target[0].value,post._id)
                                        }} style={{display: currentUser==='NoOne'?"none":"block"}}>
                                    <div className="form-row input-field d-block">
                                        <input id="comment" type="text" className="validate col-8 col-md-9" value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Place a Comment"/>
                                        <button className="btn btn-outline-secondary col-3 col-md-2 offset-1" type="submit">POST</button>
                                    </div>
                                </form> 
                            </div>
                        
                        );
                    })}
            
                </div>
                <div className="col-4 col-lg-3 d-none d-md-block" style={{backgroundColor:"transparent"}}>
                    {sideBar.map(post => {
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
                                        
                                        <Link to={`/search/place/${post.place}`}>
                                            <h6>{post.place}</h6>
                                        </Link>
                                    </div>
                                    <p>{post.agreed.length} Agreed</p>
                                </div>
                            </div>
                            
                        )
                    })}
                </div>
            </div>
            
        </div>
            
            
        
    )
}

export default PostPage
