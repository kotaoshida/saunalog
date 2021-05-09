import React,{useState} from 'react';
import "./upload.css";
import Axios from"axios";
import {useHistory} from "react-router-dom"


const Upload = () => {

    const [title,setTitle]=useState("");
    const [discription,setDiscription]=useState("");
    const [image,setImage]=useState([]);

    let history = useHistory();

    const upload =()=> {
        const formData = new FormData();
        formData.append("file",image[0]);
        formData.append("upload_preset",'vhfqywka')

        Axios.post("https://api.cloudinary.com/v1_1/dyflxpls8/image/upload",formData).then((response)=>{
            const fileId = response.data.public_id;
            Axios.post("http://localhost:3001/upload",{
                title:title,
                discription:discription,
                imageid:fileId,
                username:localStorage.getItem("username")}
                ).then((r)=>{
                    console.log(r)
                    history.push("/")
                })
        });
    }



    return (
        <div>
            <div className="Upload">
                
            <div className="UploadForm">
            <h1>upload</h1>
                <input type="text" placeholder="title..." 
                onChange={(e)=>{setTitle(e.target.value)}}/>
                <input type="text" placeholder="discription..." 
                onChange={(e)=>{setDiscription(e.target.value)}}/>
                <input type="file" 
                onChange={(e)=>{setImage(e.target.files)}}/>
                <button onClick={upload}>Upload</button>
            </div>
        </div>
        
        </div>
    );
};


export default Upload;