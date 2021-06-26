import React,{useState,useEffect,useContext} from 'react';
import {useHistory,withRouter,MemoryRouter} from "react-router-dom";
import "./navbar.css";
import {LoginContext}from"./context";
import Axios from"axios"
import { responsiveFontSizes } from '@material-ui/core';

export const Navbar = withRouter(props => {
    
    
    
    const {logined,setLogined}=useContext(LoginContext);
    
    const logout =()=>{
        localStorage.clear()
        props.history.push("/")
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
            <a href="/logs">過去サログ</a>
            <a onClick={logout}>ログアウト</a>
            </>}
              
        </div>

    );
    });



export default Navbar;