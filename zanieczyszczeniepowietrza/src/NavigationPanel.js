import React, {useEffect} from 'react';
import Typography from '@material-ui/core/Typography';

import GPSgif from './GPS.gif'

function NavigationPanel(props) {
    const [long, setLong] = React.useState(0);
    const [lat, setLat] = React.useState(0);
    const [error, setError] = React.useState(0);
   
    useEffect(() => {
      setLong(props.coords.longitude);
      setLat(props.coords.latitude); 
      if(props.error===0)
        setError(""); 
        else if(props.error===1)
        setError("Musisz wyrazić zgodę na udostępnienie lokalizacji"); 
        else if(props.error===2)
        setError("Nie udało się ustalić lokalizacji"); 
        else if(props.error===3)
        setError("Upłynął czas oczekiwania na dane z GPS"); 
    },[props]);
    

  return (
    <>
        <img src={GPSgif} alt="Gif with a satelite"/>
        <Typography color='secondary'>       
        {lat} 
        {error}
        <br/>
        {long}
        </Typography>

    </>
  );
}


export default NavigationPanel;
