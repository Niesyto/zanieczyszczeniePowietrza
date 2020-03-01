import React, { useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import FindNearestStation from './FindNearestStation.js';
import CalculateDistance from './CalculateDistance.js';
import Grid from '@material-ui/core/Grid';
import SensorData from './SensorData.js';
import DataBlock from './DataBlock.js'

import GPSgif from './GPS.gif'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  flexContainer: {
    display: 'flex',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
    alignContent: 'center'
  },
}));

function NavigationPanel(props) {
  const [long, setLong] = React.useState(0);
  const [lat, setLat] = React.useState(0);
  const [err, setErr] = React.useState(null);
  const [stationID, setStationID] = React.useState(undefined);
  const [stationName, setStationName] = React.useState("");
  const [sensors, setSensors] = React.useState("");
  const [distance, setDistance] = React.useState("");

  const classes = useStyles();
  const sensorsUrl = 'https://cors-anywhere.herokuapp.com/http://api.gios.gov.pl/pjp-api/rest/station/sensors/';

  function successCallback(pos) {
    setLong(pos.coords.longitude);
    setLat(pos.coords.latitude);
    setErr(null);
  }

  function errorCallback(err) {
    if (err.code === 1)
      setErr("Musisz wyrazić zgodę na udostępnienie lokalizacji");
    else if (err.code === 2)
      setErr("Nie udało się ustalić lokalizacji");
    else if (err.code === 3)
      setErr("Upłynął czas oczekiwania na dane z GPS");
    else
      setErr("Nieznany błąd");

    setLong("");
    setLat("");

    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  //Find user geolocation


  useEffect(() => {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    if (props.stations !== null) {
      let nearestIndex = FindNearestStation(lat, long, props.stations);
      setDistance(CalculateDistance(lat, props.stations[nearestIndex].gegrLat, long, props.stations[nearestIndex].gegrLon));
      setStationID(props.stations[nearestIndex].id);
      setStationName(props.stations[nearestIndex].stationName);
    }
  }, [props.stations])

  useEffect(() => {
    if (stationID !== undefined) {
      //Fetching list of sensors for a given station
      fetch(sensorsUrl + stationID, { mode: 'cors', origin: "*" })
        .then(res => res.json())
        .then(
          (result) => {
            setSensors(result)
            return;
          })
    }
  }, [stationID])

  return (
    <>
      <Grid container spacing={3} >
        {(props.stations && !err && stationName) ?
          <>
            <Grid item md={6} xs={12} className={classes.flexContainer}>
              {sensors ?
                sensors.map((element) => {
                  return <SensorData sensorID={element.id} />
                })
                :
                <Typography color='secondary'>
                  Loading...
            </Typography>
              }
            </Grid>
            <Grid item md={6} xs={12} className={classes.flexContainer}>
              <DataBlock
                description="Szerokość"
                data={lat.toPrecision(7)}
              />
              <DataBlock
                description="Długość"
                data={long.toPrecision(7)}
              />
              <DataBlock
                description="Najbliższa stacja"
                data={stationName}
                info={"Odległość: " + distance + " km"}
              />
            </Grid>
          </>
          :
          <Grid item md={12} xs={12} className={classes.flexContainer}>
            <img src={GPSgif} alt="Gif with a satelite" />
            {err ?
              <DataBlock
                description=""
                data={err}
              />
              : null}
          </Grid>
        }


      </Grid>
    </>
  );
}


export default NavigationPanel;
