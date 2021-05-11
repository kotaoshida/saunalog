import React,{useState} from 'react';
import "./register.css"
import Axios from "axios";
import ContainedButtons from"../../components/button"
import BasicTextFields from"../../components/testfield"

function Register () {
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");

    const regist = ()=>{
        Axios.post("https://saunalogs.herokuapp.com/user/register",{
            username:username,
            password:password,
            }).then((res)=>{
            console.log(res)
            window.location.href="https://hardcore-franklin-760778.netlify.app/login"
                })
    }

    return (
        <div className="Register">
            <div className="Registwrap">
            <div className="RegisterForm">

                <BasicTextFields label="なまえ" func={(e)=>{setUsername(e.target.value)}}/>
                <BasicTextFields label="パスワード" func={(e)=>{setPassword(e.target.value)}}/>
                <div  className="registButton">
               <ContainedButtons func={regist} text={"登録する"}/>
               </div>
            </div>
            </div>
        </div>
        
    )
}

export default Register;