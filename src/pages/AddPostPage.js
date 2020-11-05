import React,{useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom';
import './AppPages.css'
import axios from 'axios'
import M from 'materialize-css'
// import $ from 'jquery'

function AddPostPage() {
  
    const history = useHistory();
    const currentUserName = localStorage.getItem("user") === null?'NoOne':JSON.parse(localStorage.getItem("user")).userName;
    const [heading, setHeading] = useState("");
    const [place, setPlace] = useState("");
    const [body, setBody] = useState("");
    const [image, setImage] = useState("");
    const [url, setUrl] =useState("");

    useEffect(()=>{
        if(url){
         fetch("/createpost",{
             method:"post",
             headers:{
                 "Content-Type":"application/json",
                 "Authorization":"Bearer "+localStorage.getItem("jwt")
             },
             body:JSON.stringify({
                 heading,
                 place,
                 body,
                 pic:url,
             })
             
         }).then(res=>res.json())
         .then(data=>{
            console.log(JSON.stringify({
                heading,
                place,
                body,
                pic:url,
            }));
            if(data.error){
               M.toast({html: data.error,classes:"#c62828 red darken-3"})
            }
            else{
                M.toast({html:"Created post Successfully",classes:"#43a047 green darken-1"})
                history.push(`/feed`)
                window.location.reload(false)
            }
         }).catch(err=>{
             console.log(err)
         })
     }
     },[url])
   
    const postDetails = (e)=>{
        e.preventDefault();
        const data = new FormData()
        data.append("file",image)
        data.append("upload_preset","travelige_photos")
        data.append("cloud_name","travelige")
        axios.post("https://api.cloudinary.com/v1_1/travelige/image/upload", data)
            .then(res => {
                console.log(res.data)
                setUrl(res.data.url)
            })
            .catch(err => console.log(err));
        
            setUrl('');
   }
    
    return (
        <div>
            <div className="container" style={{display:currentUserName==="NoOne"?"none":"block"}}>
                <h3 className="auth-heading">Add Review or Vlog</h3>
                <div className="row">
                    <form className="col-12 col-md-10 col-lg-7" onSubmit={postDetails}>
                        <div className="input-field form-row d-block">
                            <input id="postHeading" type="text" className="validate" value={heading} onChange={(e) => setHeading(e.target.value)}/>
                            <label htmlFor="postHeading">Heading</label>
                        </div>
                        <div className="input-field form-row d-block">
                            <input id="postPlace" type="text" className="validate" value={place} onChange={(e) => setPlace(e.target.value)}/>
                            <label htmlFor="postPlace">Place</label>
                        </div>
                        <div className="file-field input-field d-block">
                            <div className="btn d-flex justify-content-center align-items-center">
                                <span>File</span>
                                <input type="file" multiple onChange={(e) => setImage(e.target.files[0])}/>
                            </div>
                            <div className="file-path-wrapper">
                                <input className="file-path validate" type="text" placeholder="Upload one or more files" onChange={(e) => console.log(e.target.value)}/>
                            </div>
                        </div>
                        <div className="input-field form-row d-block">
                            <textarea id="textareaPost" className="materialize-textarea" data-length="1000" rows="10" value={body} onChange={(e) => setBody(e.target.value)}></textarea>
                            <label htmlFor="textareaPost">Textarea</label>
                        </div>
                        <button type="submit" className="auth-button">Add to Posts</button>
                        
                    </form>
                </div>
            </div>
            <h1 style={{display:currentUserName==="NoOne"?"block":"none", textAlign: "center", marginTop:"40px"}}>Oops, You have to first Login to add Something...</h1>
        </div>
    )
}

export default AddPostPage
