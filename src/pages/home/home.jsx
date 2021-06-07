import React ,{useEffect,useState}from 'react';
import "./saunaLogList.css";
import{Image}from"cloudinary-react"
import Axios from"axios"
import CustomizedDialogs from "../../components/helper/dialog/dialog"
import AlignItemsList from"../../components/list"
import Chart from"../../components/chart"




const Home = () => {

    const[list,setList]=useState([]);
    const username = localStorage.getItem("username");
    const[totaltotonoi,setTotaltotonoi]=useState(0);

    useEffect(()=>{
        Axios.get("http://localhost:3001/upload",{params:username}
        ).then((res)=>{
            setList(res.data);
            console.log(res.data)
            const dt = new Date();
            const y = dt.getFullYear();
            res.data.map((val)=>{
                console.log(val)
                const year = val.date.substr( 0, 4 )
                if(year==y){
                    setTotaltotonoi(prev => prev + 1)
                    console.log(totaltotonoi)
                }else{
                    return
                }
            })
               
        })
    },[]);


    return (
        
        <div>
          <Chart totaltotonoi={totaltotonoi}/>
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