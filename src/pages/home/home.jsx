import React ,{useEffect,useState}from 'react';
import "./home.css";
import{Image}from"cloudinary-react"
import Axios from"axios"
import CustomizedDialogs from "../../components/helper/dialog/dialog"
import AlignItemsList from"../../components/list"




const Home = () => {

    const[list,setList]=useState([]);
    const username = localStorage.getItem("username");
    
    useEffect(()=>{
        Axios.get("https://saunalogs.herokuapp.com/upload",{params:username}
        ).then((res)=>{
            setList(res.data);
        })
    },[]);


    return (
        
        <div>
            <div className="home">
            <CustomizedDialogs username={username} setList={setList} list={list}/>
            <AlignItemsList list={list} setList={setList}/>
            <div>
        
          
            </div>
             </div>
        </div>
    );
};
export default Home;