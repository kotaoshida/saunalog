import React,{useState,useContext}from 'react';
import "./login.css"
import {useHistory} from "react-router-dom";
import {LoginContext}from"../../components/context";
import Axios from "axios"
import BasicTextFields from"../../components/testfield"
import ContainedButtons from"../../components/button"
import SimpleAlerts from"../../components/err"

const Login = () => {

    const {logined,setLogined}=useContext(LoginContext);

    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");

    const [message,setMessage]=useState(false);

    let history = useHistory();

    const login = ()=>{
        Axios.post(" https://saunalogs.herokuapp.com/user/login",{
            username:username,
            password:password,
            }).then((res)=>{
            if(res.data.login==true){
                setLogined(true);
                localStorage.setItem("username",username);
                localStorage.setItem("login",true);
                history.push("/");
                console.log(res)
            }else{
                console.log(res)
                setMessage(res.data.message);
                
            }})
    }

    return (
        <div className="login">
        
             <div className="loginForm">
                 <h2>ログインしよう！</h2>
             {message?<>
                    <SimpleAlerts message={message}/>
                </>:<></>}
             <BasicTextFields label="なまえ" func={(e)=>{setUsername(e.target.value)}}/>
                <BasicTextFields label="パスワード" func={(e)=>{setPassword(e.target.value)}}/>
                <div  className="registButton">
               <ContainedButtons func={login} text={"ログイン"}/>
              
            </div>
           </div>
        </div>
    );
};



export default Login;