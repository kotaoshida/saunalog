import React,{useState} from 'react';
import {useHistory,withRouter,MemoryRouter} from "react-router-dom";
import "./register.css"
import Axios from "axios";
import ContainedButtons from"../../components/button"
import BasicTextFields from"../../components/testfield"
import SimpleAlerts from"../../components/err"


function Register (props) {
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    const [message,setMessage]=useState(false);
    const history = useHistory();
    const regist = ()=>{
        Axios.post("https://saunalogs.herokuapp.com/user/register",{
            username:username,
            password:password,
            }).then((res)=>{
                if(res.data.message){
            setMessage(res.data.message)}
            else{
                history.push("/login")
            }
            
            
                })
    }

    return (
        <div className="Register">
              
            <div className="Registwrap">
                <h2>まずはサログに登録しよう！</h2>
            {message?<>
                    <SimpleAlerts message={message} fullWidth={true}/>
                </>:<></>}
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

export default withRouter (Register);