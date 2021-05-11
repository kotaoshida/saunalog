import React,{useState,useContext}from 'react';
import "./login.css"
import {useHistory} from "react-router-dom";
import {LoginContext}from"../../components/helper/context";
import Axios from "axios"
import BasicTextFields from"../../components/testfield"
import ContainedButtons from"../../components/button"

const Login = () => {

    const {logined,setLogined}=useContext(LoginContext);

    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");

    const [message,setMessage]=useState("");

    let history = useHistory();

    const login = ()=>{
        Axios.post("https://saunalogs.herokuapp.com/user/login",{
            username:username,
            password:password,
            }).then((res)=>{
            if(res.data.login){
                setLogined(true);
                localStorage.setItem("username",username);
                history.push("/");
                console.log(res)
            }else{
                setMessage(res.data.message);
                
            }})
    }

    return (
        <div className="login">
             <div className="loginForm">
             <BasicTextFields label="なまえ" func={(e)=>{setUsername(e.target.value)}}/>
                <BasicTextFields label="パスワード" func={(e)=>{setPassword(e.target.value)}}/>
                <div  className="registButton">
               <ContainedButtons func={login} text={"ログイン"}/>
                {message}
            </div>
           </div>
        </div>
    );
};



export default Login;