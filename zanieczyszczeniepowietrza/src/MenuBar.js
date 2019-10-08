import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';


function MenuBar(props) {


  function handleChange(event, newValue) {
    props.setMode(newValue);
  }

    return (
      <div>
      <AppBar position="static">
        <Tabs centered={true} value={props.mode} variant='fullWidth' onChange={handleChange} textColor='secondary'>
          <Tab label="GPS"  />
          <Tab label="Wybierz miasto"  />
        </Tabs>
      </AppBar>   
    </div>
    );
}

export default MenuBar;
