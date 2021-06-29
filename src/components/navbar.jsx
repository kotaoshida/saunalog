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
    const login =()=>{
        props.history.push("/login")
    }
    const home =()=>{
        props.history.push("/")
    }

    const register =()=>{
        props.history.push("/register")
    }

    const logs =()=>{
        props.history.push("/logs")
    }

    return (
        <div className="navbar"> 
            <h1>サログ</h1>
            <a onClick={home}>home</a>
            {!localStorage.getItem("login")? 
            <>
            <a onClick={login}>ログイン</a>
            <a onClick={register}>登録</a>
            </>:           
            <>
            <a onClick={logs}>過去サログ</a>
            <a onClick={logout}>ログアウト</a>
            </>}
              
        </div>

    );
    });



export default Navbar;