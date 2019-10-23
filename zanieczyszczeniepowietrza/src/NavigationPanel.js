import React, {useEffect} from 'react';
import Typography from '@material-ui/core/Typography';
import FindNearestStation from './FindNearestStation.js';


import GPSgif from './GPS.gif'

function NavigationPanel(props) {
    const [long, setLong] = React.useState("");
    const [lat, setLat] = React.useState("");
    const [err, setErr] = React.useState("");
    const [stationID, setStationID] = React.useState("");

    var stationName;
   

    
  function successCallback(pos) { 
    setLong(pos.coords.longitude);
    setLat(pos.coords.latitude);
    setErr(""); 
  }

  function errorCallback(err) {

    if(err===1)
      setErr("Musisz wyrazić zgodę na udostępnienie lokalizacji"); 
    else if(err===2)
      setErr("Nie udało się ustalić lokalizacji"); 
    else if(err===3)
      setErr("Upłynął czas oczekiwania na dane z GPS"); 

      setLong("");
      setLat("");
   
    setErr(err.code)
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  navigator.geolocation.getCurrentPosition(successCallback,errorCallback);

    useEffect(() => {
        setStationID(FindNearestStation(lat,long,props.stations));
      },[props.stations])

      if(stationID)
        stationName=props.stations[stationID].stationName;
 
     

  return (
    <>
        <img src={GPSgif} alt="Gif with a satelite"/>
        <Typography color='secondary'>    
        {err}   
        {lat}  
        <br/>
        {long}
        <br/>
        {stationName}
        </Typography>

    </>
  );
}


export default NavigationPanel;
