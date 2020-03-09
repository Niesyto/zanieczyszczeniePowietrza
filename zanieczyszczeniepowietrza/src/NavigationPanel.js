import React, { useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import FindNearestStation from './FindNearestStation.js';
import CalculateDistance from './CalculateDistance.js';
import Grid from '@material-ui/core/Grid';
import SensorData from './SensorData.js';
import DataBlock from './DataBlock.js'
import LocationPicker from 'react-location-picker';

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
  const [err, setErr] = React.useState(null);
  const [stationID, setStationID] = React.useState(undefined);
  const [stationName, setStationName] = React.useState("");
  const [sensors, setSensors] = React.useState("");
  const [distance, setDistance] = React.useState("");
  const [position, setPosition] = React.useState({ lat: 50.270908, lng: 19.039993 });

  function handleLocationChange({ position, address, places }) {
    setPosition(position);
  }

  const classes = useStyles();
  const sensorsUrl = 'https://cors-anywhere.herokuapp.com/http://api.gios.gov.pl/pjp-api/rest/station/sensors/';

  function successCallback(pos) {
    setPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude })
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

    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  //Find closest station and set state to correct data
  function setStationData() {
    let nearestIndex = FindNearestStation(position.lat, position.lng, props.stations);
    setDistance(CalculateDistance(position.lat, props.stations[nearestIndex].gegrLat, position.lng, props.stations[nearestIndex].gegrLon));
    setStationID(props.stations[nearestIndex].id);
    setStationName(props.stations[nearestIndex].stationName);
  }

  //Find user geolocation
  useEffect(() => {
    if (props.stations !== null) {
      navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
      setStationData();
    }
  }, [props.stations])

  useEffect(() => {
    if (props.stations)
      setStationData();
  }, [position])

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
      <Grid container >
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
                data={position.lat.toPrecision(7)}
              />
              <DataBlock
                description="Długość"
                data={position.lng.toPrecision(7)}
              />
              <DataBlock
                description="Najbliższa stacja"
                data={stationName}
                info={"Odległość: " + distance + " km"}
              />
              <LocationPicker
                containerElement={<div style={{ height: '400px', width: "90%" }} />}
                mapElement={<div style={{ height: '400px' }} />}
                defaultPosition={position}
                onChange={handleLocationChange}
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
