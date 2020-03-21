import React, { useEffect } from 'react';
import NavigationPanel from './NavigationPanel.js';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: '100vh'
  },
  flexContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    minHeight: '90vh'
  },
  flexContainerHidden: {
    display: 'none'
  }
}));



function App() {
  const [stations, setStations] = React.useState(null);
  //const stationsUrl = 'https://cors-anywhere.herokuapp.com/http://api.gios.gov.pl/pjp-api/rest/station/findAll';
  const stationsUrl = 'https://api.allorigins.win/raw?url=http://api.gios.gov.pl/pjp-api/rest/station/findAll'
  const classes = useStyles();

  useEffect(() => {
    fetch(stationsUrl, { mode: 'cors', origin: "*"})
      .then(res => res.json())
      .then(
        (result) => {
          setStations(result)
          return;
        })
  }, [])

  return (
    <div className={classes.root}>
      <div className={classes.flexContainer}>
        <NavigationPanel stations={stations} />
      </div>
    </div>
  );
}

export default App;
