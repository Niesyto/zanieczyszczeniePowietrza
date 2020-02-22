import React, {useEffect} from 'react';
import Typography from '@material-ui/core/Typography';
import FindNearestStation from './FindNearestStation.js';
import SensorData from './SensorData.js'

import GPSgif from './GPS.gif'

function NavigationPanel(props) {
    const [long, setLong] = React.useState("");
    const [lat, setLat] = React.useState("");
    const [err, setErr] = React.useState("");
    const [stationID, setStationID] = React.useState(undefined);
    const [stationName, setStationName] = React.useState("");
    const [sensors,setSensors] = React.useState("");

    const sensorsUrl='https://cors-anywhere.herokuapp.com/http://api.gios.gov.pl/pjp-api/rest/station/sensors/';
   
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

  //Find user geolocation
  navigator.geolocation.getCurrentPosition(successCallback,errorCallback);

    useEffect(() => {
      if(props.stations!==null){
        let nearestIndex = FindNearestStation(lat,long,props.stations);
        setStationID(props.stations[nearestIndex].id);
        setStationName(props.stations[nearestIndex].stationName);
      }
      },[props.stations])
 
      useEffect(() => { 
        if(stationID!==undefined){
          //Fetching list of sensors for a given station
          fetch(sensorsUrl+stationID,{ mode: 'cors', origin:"*" })
          .then(res => res.json())
          .then(
            (result) => {
              setSensors(result)
                return;
            })}
      },[stationID])
 
     

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
        {sensors ?
        sensors.map((element) => {
          return <SensorData sensorID={element.id}/>
       })
       :
       <Typography color='secondary'>      
        Loading...
      </Typography>
      }
        
    </>
  );
}


export default NavigationPanel;
