import './App.css';
import React,{useState} from 'react';
import {BrowserRouter as Router,Route,Switch,Link} from "react-router-dom";
import SaunaLogList from "./pages/home/saunaLogList";
import Navbar from "./components/navbar"
import Register from "./pages/register/Register"
import Login from "./pages/login/login"
import Upload from "./pages/upload/upload"
import { LoginContext } from './components/helper/context';
import Home from "./pages/home/home";


function App() {

  const [logined,setLogined]=useState(false);

  return (
    <LoginContext.Provider value={{logined,setLogined}}>
      <>
   <Navbar/>
    <Router>
        <Route path="/" exact render={()=><Home/>}/>
        <Route path="/register" exact render={()=><Register/>}/>
        <Route path="/about" exact render={()=><Login/>}/>
        <Route path="/upload" exact render={()=><Upload/>}/>
        <Route path="/logs" exact render={()=><SaunaLogList/>}/>

    </Router>
    </>
    </LoginContext.Provider>
  )

}

export default App;
