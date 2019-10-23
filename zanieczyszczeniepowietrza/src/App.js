import React, {useEffect}  from 'react';
import MenuBar from './MenuBar.js';
import TabPanel from './TabPanel.js';
import NavigationPanel from './NavigationPanel.js';
import Typography from '@material-ui/core/Typography';


function App() {
  const [mode, setMode] = React.useState(0);
  
  const [stations, setStations] = React.useState({});
  var url="https://cors-anywhere.herokuapp.com/http://api.gios.gov.pl/pjp-api/rest/station/findAll";


  useEffect(() => {
  fetch(url,{ mode: 'cors', origin:"*" })
    .then(res => res.json())
    .then(
      (result) => {
        setStations(result)
          return;
      })},[])



  return (
    <>
      <MenuBar
        mode={mode}
        setMode={setMode}
      />

      <TabPanel value={mode} index={0}>
        <NavigationPanel stations={stations}/>
      </TabPanel>
      <TabPanel value={mode} index={1}>
          {mode}
      </TabPanel>    

    </>
  );
}

export default App;
