import React,{useState,useEffect,useContext} from 'react';
import {useHistory} from "react-router-dom";
import "./navbar.css";
import {LoginContext}from"../components/helper/context";
import Axios from"axios"
import { responsiveFontSizes } from '@material-ui/core';

const Navbar = () => {
    
    
    const history =useHistory();
    const {logined,setLogined}=useContext(LoginContext);
    
    const logout = async()=>{
        
            Axios.get("https://localhost:3001/user/logout",{withCredentials:"include"})
 
    }

    if(logined){
        localStorage.setItem("login",logined);

    }

    return (
        <div className="navbar"> 
            <h1>サログ</h1>
            <a href="/">home</a>
            {!localStorage.getItem("login")? 
            <>
            <a href="/about">ログイン</a>
            <a href="/register">登録</a>
            </>:           
            <>
            <a href="/profile">profile</a>
            <a onClick={logout}>ログアウト</a>
            </>}
              
        </div>
    );
};



export default Navbar;