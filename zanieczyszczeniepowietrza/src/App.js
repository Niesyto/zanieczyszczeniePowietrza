import React, {useEffect}  from 'react';
import MenuBar from './MenuBar.js';
import TabPanel from './TabPanel.js';
import NavigationPanel from './NavigationPanel.js';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root:{
    minHeight:'100vh'
  },
  flexContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    minHeight:'90vh'
  },
  flexContainerHidden:{
    display:'none'
  }
}));



function App() {
  const [mode, setMode] = React.useState(0);
  const [stations, setStations] = React.useState(null);
  const stationsUrl='https://cors-anywhere.herokuapp.com/http://api.gios.gov.pl/pjp-api/rest/station/findAll';

  const classes = useStyles();

  useEffect(() => {
  fetch(stationsUrl,{ mode: 'cors', origin:"*" })
    .then(res => res.json())
    .then(
      (result) => {
        setStations(result)
          return;
      })},[])

  return (
    <div className={classes.root}>
      <MenuBar
        mode={mode}
        setMode={setMode}
      />
      <TabPanel value={mode} index={0} className={mode ? classes.flexContainerHidden  : classes.flexContainer}>
        <NavigationPanel stations={stations}/>
      </TabPanel>
      <TabPanel value={mode} index={1} className={!mode ? classes.flexContainerHidden  : classes.flexContainer}>
          {mode}
      </TabPanel>    
    </div>
  );
}

export default App;
