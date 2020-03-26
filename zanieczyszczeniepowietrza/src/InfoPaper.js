import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import pollutants from './PollutantData.js'


const useStyles = makeStyles({
  root: {
    minWidth: 275,
    display: 'none',
    position: 'absolute'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function InfoPaper(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root} style={{ display: props.display }} variant="outlined">
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {props.pollutant}
        </Typography>
        <Typography variant="h5" component="h2" color="textSecondary">
          {pollutants(props.pollutant).name}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Poziomy zanieczyszczeń:
            </Typography>
        {pollutants(props.pollutant).description.map((element) => {
          return (
            <Typography variant="body2" component="p" color="textSecondary" key={element}>
              {element}
            </Typography>
          )
        })}
      </CardContent>
    </Card>
  );
}