import React ,{useEffect,useState}from 'react';
import Axios from"axios"
import CustomizedDialogs from "../../components/helper/dialog/dialog"
import Chart from"../../components/chart"
import "./home.css"
import InsetList from "../../components/rank"
import ContainedButtons from"../../components/button"
import {useHistory,withRouter,MemoryRouter} from "react-router-dom";

const Home = () => {

    const[list,setList]=useState([]);
    const username = localStorage.getItem("username");
    const[totaltotonoi,setTotaltotonoi]=useState(0);
    let rank={};
    let totonoi={};
    const[ranking,setRanking]=useState([])
    const[totalrate,setTotalrate]=useState([])
    const history = useHistory();


    useEffect(()=>{
        Axios.get("https://saunalogs.herokuapp.com/upload",{params:username}
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
            res.data.map((val)=>{
                console.log(val)
                if(rank[val.sauna]==null){
                    const sauna = val.sauna;
                    rank[sauna]=1
                    if(val.totonotta==1){
                        totonoi[sauna]=1
                        return
                    }else{
                        totonoi[sauna]=0
                        return
                    }
                }else if(rank[val.sauna]){
                    const count = rank[val.sauna]
                    rank[val.sauna] = count+1
                    if(val.totonotta==1){
                        totonoi[val.sauna]+=1
                        return
                    }else return
                }
            })
            const arr = Object.keys(rank).map((e)=>({ key: e, value: rank[e], totonoi:totonoi[e]}));
            arr.sort(function(a,b){
                if( a.value > b.value ) return -1;
                if( a.value < b.value ) return 1;
                return 0;
        });
            setRanking(...ranking,arr)
            console.log(ranking)

            console.log(list);

            const a = res.data.sort(function(a,b){
                if(Number(a.saunaroomrate)+Number(a.waterbathrate)+Number(a.windrate) > 
                Number(b.saunaroomrate)+Number(b.waterbathrate)+Number(b.windrate)) return -1;
                if(Number(a.saunaroomrate)+Number(a.waterbathrate)+Number(a.windrate) < 
                Number(b.saunaroomrate)+Number(b.waterbathrate)+Number(b.windrate) )return 1;
                return 0;
            });
                setTotalrate(...totalrate,a);
            
        })


    },[]);


    return (
        
        <div className="home">
            {localStorage.getItem("login")?
            <>
            <CustomizedDialogs setList={setList}/>
            <h1>{localStorage.getItem("username")}さんのサウナデータ</h1>
          <div className="test">
          <Chart totaltotonoi={totaltotonoi}/>
          
          <div className="rank">
          <InsetList ranking={ranking} totalrate={totalrate} />
          </div>
        </div>
            </>
            :
            <>
            <h2>サログとは</h2>
            <h3>サ室の熱さの感じ方や水風呂との相性は人それぞれ。<br/>口コミや人気のサウナにとらわれず<br className="sp"/>あなただけの「ととのい」を見つけよう。</h3>
            <ContainedButtons text="ログインはこちら" func={()=>{history.push("/login")}}/>
            <ContainedButtons text="新規登録はこちら" func={()=>{history.push("/register")}}/>
            </>}
          
    
        </div>
    );
};
export default Home;