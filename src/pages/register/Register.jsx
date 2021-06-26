import React,{useState} from 'react';
import "./register.css"
import Axios from "axios";
import ContainedButtons from"../../components/button"
import BasicTextFields from"../../components/testfield"
import SimpleAlerts from"../../components/err"

function Register () {
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    const [message,setMessage]=useState(false);

    const regist = ()=>{
        Axios.post(" https://saunalogs.herokuapp.com/user/register",{
            username:username,
            password:password,
            }).then((res)=>{
            setMessage(res.data.message)
            console.log(res)
            
                })
    }

    return (
        <div className="Register">
             
            <div className="Registwrap">
            {message?<>
                    <SimpleAlerts message={message}/>
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

export default Register;