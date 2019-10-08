import React, {useEffect} from 'react';
import Typography from '@material-ui/core/Typography';

import GPSgif from './GPS.gif'

function NavigationPanel(props) {
    const [long, setLong] = React.useState(0);
    const [lat, setLat] = React.useState(0);
   
    useEffect(() => {
      setLong(props.coords.longitude);
      setLat(props.coords.latitude); 
    },[props]);
    

  return (
    <>
        <img src={GPSgif} alt="Gif with a satelite"/>
        <Typography color='secondary'>        
        {long}
        <br></br>
        {lat}
        </Typography>

    </>
  );
}


export default NavigationPanel;
