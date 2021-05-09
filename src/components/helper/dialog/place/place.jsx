import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { CompassCalibrationOutlined } from '@material-ui/icons';

const google = window.google;

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default  function ContainedButtons(props) {
  const classes = useStyles();
  
 async function getNearSauna(e){
    let lat;
    let lng
    await navigator.geolocation.getCurrentPosition((res)=>{
      lat=res.coords.latitude
      lng=res.coords.longitude
      let map;
      let service;
      console.log(lat)
      console.log(lng)
      const pyrmont = new google.maps.LatLng(lat,lng);
      const request ={
        location:pyrmont,
        radius: '500',
        keyword:"サウナ"
      }
      map = new google.maps.Map(document.getElementById('map'))
      service = new google.maps.places.PlacesService(map);
      function callback(results, status) {
          if (status == google.maps.places.PlacesServiceStatus.OK) {
              props.setsauna(results[0].name)}else{props.setsauna("近くにサウナが見つかりませんでした。")}
          
        }
      service.nearbySearch(request,callback)
})


    };



  return (
    <div className={classes.root}>
      
      <Button variant="contained" color="primary" onClick={getNearSauna}>
         今いるサウナ
      </Button>
      
    </div>
  );
}
