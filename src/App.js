import './App.css';
import React,{useState} from 'react';
import {BrowserRouter as Router,Route,Switch,Link} from "react-router-dom";
import SaunaLogList from "./pages/upload/saunaLogList";
import Navbar from "./components/navbar"
import Register from "./pages/register/Register"
import Login from "./pages/login/login"
import { LoginContext } from './components/context';
import Home from "./pages/home/home";


function App() {

  const [logined,setLogined]=useState(false);

  return (
    <LoginContext.Provider value={{logined,setLogined}}>
      <>
   
    <Router>
    <Navbar/>
        <Route path="/" exact render={()=><Home/>}/>
        <Route path="/register" exact render={()=><Register/>}/>
        <Route path="/login" exact render={()=><Login/>}/>
        <Route path="/logs" exact render={()=><SaunaLogList/>}/>

    </Router>
    </>
    </LoginContext.Provider>
  )

}

export default App;
