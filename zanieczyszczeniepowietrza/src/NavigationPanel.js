import React, { useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import FindNearestStation from './FindNearestStation.js';
import CalculateDistance from './CalculateDistance.js';
import Grid from '@material-ui/core/Grid';
import SensorData from './SensorData.js';
import DataBlock from './DataBlock.js'
import LocationPicker from 'react-location-picker';
import Snackbar from '@material-ui/core/Snackbar';
import GPSgif from './GPS.gif'
import Alert from '@material-ui/lab/Alert';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  flexContainer: {
    display: 'flex',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
    alignContent: 'center',
    marginTop: "30px"
  },
}));

function NavigationPanel(props) {
  const [err, setErr] = React.useState(null);
  const [stationID, setStationID] = React.useState(undefined);
  const [stationName, setStationName] = React.useState("");
  //List of sensors
  const [sensors, setSensors] = React.useState("");
  //Distance from position to the nearest station
  const [distance, setDistance] = React.useState("");
  //Position - GPS or selected by user. Default - katowice
  const [position, setPosition] = React.useState({ lat: 50.270908, lng: 19.039993 });
  const [tooltipOpen, setTooltipOpen] = React.useState(false);

  function handleTooltipClose() {
    setTooltipOpen(false);
  }

  function handleLocationChange({ position, address, places }) {
    setPosition(position);
    setErr(null);
  }

  const classes = useStyles();
  //const sensorsUrl = 'https://cors-anywhere.herokuapp.com/http://api.gios.gov.pl/pjp-api/rest/station/sensors/';
  const sensorsUrl = 'https://api.allorigins.win/raw?url=http://api.gios.gov.pl/pjp-api/rest/station/sensors/';

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

  //Set station dat if position changed
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
            setSensors(result);
            setTooltipOpen(true);
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
                  return <SensorData sensorID={element.id} key={element.id} />
                })
                :
                <Typography color='secondary'>
                  Loading...
            </Typography>
              }
            </Grid>
            <Grid item md={6} xs={12} className={classes.flexContainer}>
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

            <Snackbar
              open={tooltipOpen}
              onClose={handleTooltipClose}
            >
              <Alert variant="filled" severity="info">
                Kliknij w pomiar aby wyświetlić szczegółowe informacje
            </Alert>
            </Snackbar>

          </>
          :
          <>
            <Grid item md={6} xs={12} className={classes.flexContainer}>
              <img src={GPSgif} alt="Gif with a satelite" />
            </Grid>
            <Grid item md={6} xs={12} className={classes.flexContainer}>
              {err ?
                <DataBlock
                  description=""
                  data={err}
                />
                : null}
              <LocationPicker
                containerElement={<div style={{ height: '400px', width: "90%" }} />}
                mapElement={<div style={{ height: '400px' }} />}
                defaultPosition={position}
                onChange={handleLocationChange}
              />
            </Grid>
          </>
        }
      </Grid>
    </>
  );
}


export default NavigationPanel;
