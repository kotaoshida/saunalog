import React ,{useEffect,useState}from 'react';
import "./saunaLogList.css";
import{Image}from"cloudinary-react"
import Axios from"axios"
import CustomizedDialogs from "../../components/helper/dialog/dialog"
import AlignItemsList from"../../components/list"




const SaunaLogList = () => {

    const[list,setList]=useState([]);
    const username = localStorage.getItem("username");
    
    useEffect(()=>{
        Axios.get("http://localhost:3001/upload",{params:username}
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
export default SaunaLogList;