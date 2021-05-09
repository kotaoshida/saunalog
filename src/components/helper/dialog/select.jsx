import React ,{useEffect,useState}from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Axios from"axios";
import "./select.css";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(2),
    minWidth: 200,
    display:"flex",
    flexDirection:"row"

  },
}));

const google = window.google;

export default  function GroupedSelect(props) {

    const [city,setCity]= useState([]);
    const [prefucture,setPrefucture]=useState([]);
    const [cityForSearch,setCityForSearch]=useState("");
    const [saunaList,setSaunaList]=useState(["a"]);

    useEffect(() => {
    　Axios.get("https://opendata.resas-portal.go.jp/api/v1/prefectures",{
            headers:{"X-API-KEY":"JZ6Nzmm6F54YU3FD7RvDEZ1qUU9RgpbGF1GdkObS"}}).then((res)=>{
                const result=res.data.result
                result.map((val)=>{
                   setPrefucture(prev=>[...prev,val])})
                })            
        },[]);

  const classes = useStyles();

  const getCity=(code)=>{
    Axios.get(`https://opendata.resas-portal.go.jp/api/v1/cities?prefCode=${code}`,{
        headers:{"X-API-KEY":"JZ6Nzmm6F54YU3FD7RvDEZ1qUU9RgpbGF1GdkObS"}}).then((res)=>{
            const result=res.data.result
            setCity([]);
            result.map((val)=>{
                setCity(prev=>[...prev,val])})
        })
                     };

    const getSaunaList=(e)=>{
        
        let map;
        let service;
        const word = "サウナ"+e.target.value;
        console.log(word)
        map = new google.maps.Map(document.getElementById('map'))
        service = new google.maps.places.PlacesService(map);
        function callback(results, status) {
            if (status == google.maps.places.PlacesServiceStatus.OK) {
                results.map((val)=>{
                    setSaunaList(prev=>[...prev,val])
                    console.log(val)
              })}
            
          }
        service.textSearch({query:word},callback)
        setSaunaList([])
        };

  return (
    
    <div className="form">
    <div>
      <FormControl className={classes.formControl} >
        <InputLabel htmlFor="grouped-native-select1" minWidth="2000">都道府県</InputLabel>
        <Select native defaultValue="" id="grouped-native-select1" onChange={(e)=>{getCity(e.target.value)}} minWidth="200">
          <option aria-label="None" value="" />
          <optgroup label="都道府県">
                {prefucture.map((val)=>{
                    return(
                    <option value={val.prefCode}>{val.prefName}</option>)
                })}
          </optgroup>
          </Select>
          </FormControl>
     </div>     
     <div>
          <FormControl className={classes.formControl}>
          <InputLabel htmlFor="grouped-native-select2">市区町村</InputLabel>
          <Select native defaultValue="" id="grouped-native-select2" onChange={(e)=>{getSaunaList(e)}} >
          <option aria-label="None"/>
          <optgroup label="市区町村">
                {city.map((val)=>{
                    return(
                    <option >{val.cityName}</option>)
                })}
          </optgroup>
          </Select>
          </FormControl>

        </div>
    <div>
          <FormControl className={classes.formControl}>
          <InputLabel htmlFor="grouped-native-select3">サウナ</InputLabel>
          <Select native defaultValue="" id="grouped-native-select3" onChange={(e)=>{props.setsauna(e.target.value)}}>
          <option aria-label="None"/>
          <optgroup label= "サウナ">
                {saunaList.map((val)=>{
                    return(
                    <option >{val.name}</option>)
                })}
          </optgroup>
          </Select>
      </FormControl>
      
    </div>
    </div>
  );
    }