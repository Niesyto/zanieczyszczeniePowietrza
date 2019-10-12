import React, {useState}  from 'react';
import MenuBar from './MenuBar.js';
import TabPanel from './TabPanel.js';
import NavigationPanel from './NavigationPanel.js';
import Typography from '@material-ui/core/Typography';


function App() {
  const [mode, setMode] = React.useState(0);
  const [crd, setCrd] = React.useState(0);
  const [err, setErr] = React.useState(0);


  function success(pos) {
    setCrd(pos.coords);

    console.log('Your current position is:');
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);

  }

  function error(err) {
    setErr(err.code)
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  navigator.geolocation.getCurrentPosition(success,error);


  return (
    <>
      <MenuBar
        mode={mode}
        setMode={setMode}
      />

      <TabPanel value={mode} index={0}>
        <NavigationPanel coords={crd} error={err}/>
      </TabPanel>
      <TabPanel value={mode} index={1}>
          {mode}
      </TabPanel>    

    </>
  );
}

export default App;
