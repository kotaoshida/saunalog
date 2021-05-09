import React,{useState} from 'react';
import "./register.css"
import Axios from "axios";
import ContainedButtons from"../../components/button"

function Register () {
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");

    const regist = ()=>{
        Axios.post("https://saunalogs.herokuapp.com/user/register",{
            username:username,
            password:password,
            }).then((res)=>{
            console.log(res)
            location.href="https://hardcore-franklin-760778.netlify.app/"
                })
    }

    return (
        <div className="Register">
            <div className="RegisterForm">
                <input type="text" placeholder="username..." 
                onChange={(e)=>{setUsername(e.target.value)}}/>
                <input type="text" placeholder="password..." 
                onChange={(e)=>{setPassword(e.target.value)}}/>
               <ContainedButtons onClick={regist}/>
            </div>
        </div>
        
    )
}

export default Register;