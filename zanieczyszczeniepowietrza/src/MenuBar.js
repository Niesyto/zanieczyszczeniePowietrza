import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};




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
      <TabPanel value={props.mode} index={0}>
        {props.mode}
      </TabPanel>
      <TabPanel value={props.mode} index={1}>
        aaaa
      </TabPanel>
      
    </div>
    );
}

export default MenuBar;
