import React ,{useEffect,useState}from 'react';
import "./saunaLogList.css";
import Axios from"axios"
import CustomizedDialogs from "../../components/helper/dialog/dialog"
import AlignItemsList from"../../components/list"




const SaunaLogList = () => {

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
                <div>
            <CustomizedDialogs username={username} setList={setList} list={list}/>
                </div>
                <div className="list">
            <AlignItemsList list={list} setList={setList} display="flex"/>
            </div>
            <div>
        
          
            </div>
             </div>
        </div>
    );
};
export default SaunaLogList;