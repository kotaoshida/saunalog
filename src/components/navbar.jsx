import React,{useState,useEffect,useContext} from 'react';
import {useHistory} from "react-router-dom";
import "./navbar.css";
import {LoginContext}from"../components/helper/context";

const Navbar = () => {
    
    
    const history =useHistory();
    const {logined,setLogined}=useContext(LoginContext);
    
    if(logined){
        localStorage.setItem("login",logined);

    }

    return (
        <div className="navbar"> 
            <h1>サログ</h1>
            <a href="/">home</a>
            {!localStorage.getItem("login")? 
            <>
            <a href="/about">login</a>
            <a href="/register">register</a>
            </>:           
            <>
            <a href="/profile">profile</a>
            <a href="/upload">upload</a>
            </>}
              
        </div>
    );
};



export default Navbar;