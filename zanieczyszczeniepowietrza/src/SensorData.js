import React, {useEffect} from 'react';
import Typography from '@material-ui/core/Typography';


function SensorData(props) {
    const sensorDataUrl='https://cors-anywhere.herokuapp.com/http://api.gios.gov.pl/pjp-api/rest/data/getData/';
    const [sensorData, setSensorData] = React.useState(null);
    const [latestIndex,setLatestIndex] = React.useState(0);
   
    //Fetching sensor data
      useEffect(() => { 
          fetch(sensorDataUrl+props.sensorID,{ mode: 'cors', origin:"*" })
          .then(res => res.json())
          .then(
            (result) => {
                setSensorData(result)
                return;
            })
      },[props.sensorID])
 
      /*
      Finding latest measurement with correct value. API sometimes sends null values
      */
      useEffect(() => { 
       if(sensorData!==null){
        for(let i=0;i<sensorData.values.length;i++)
        {
          if(sensorData.values[i].value!==null){
            setLatestIndex(i);
            break;
          } 
        }
       }
    },[sensorData])

    

  return (
    <>
      
        {sensorData ? 
        //If sensor data is fetched, display id
        <Typography color='secondary'>
          {sensorData.key} <br/>
          {sensorData.values[latestIndex].date}<br/>
          {sensorData.values[latestIndex].value}
        </Typography> 
        :
        //If not, display 'loading'
        <Typography color='secondary'> Loading...   </Typography> 
        }  
    </>
  );
}


export default SensorData;