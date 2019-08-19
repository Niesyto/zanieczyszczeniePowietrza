import React from 'react';
import MenuBar from './MenuBar.js';
import Typography from '@material-ui/core/Typography';

import gif from './GPS.gif'

function App() {
  const [mode, setMode] = React.useState(0);

  return (
    <>
      <MenuBar
        mode={mode}
        setMode={setMode}
      />

      <Typography color='secondary'>
        example project
      </Typography>

      <img src={gif} alt="Gif with a satelite"/>
    </>
  );
}

export default App;
