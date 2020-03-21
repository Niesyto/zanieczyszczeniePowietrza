import React, { useEffect } from 'react';
import InfoPaper from './InfoPaper.js'
import DataBlock from './DataBlock.js'


function SensorData(props) {
  const sensorDataUrl = 'https://api.allorigins.win/raw?url=http://api.gios.gov.pl/pjp-api/rest/data/getData/';
  //const sensorDataUrl = 'https://cors-anywhere.herokuapp.com/http://api.gios.gov.pl/pjp-api/rest/data/getData/';
  const [sensorData, setSensorData] = React.useState(null);
  const [latestIndex, setLatestIndex] = React.useState(0);
  const [infoDisplayCSS, setInfoDisplayCSS] = React.useState("none");

  function handleMouseEnter() {
    setInfoDisplayCSS("block");
  }
  function handleMouseLeave() {
    setInfoDisplayCSS("none");
  }


  //Fetching sensor data
  useEffect(() => {
    fetch(sensorDataUrl + props.sensorID, { mode: 'cors', origin: "*" })
      .then(res => res.json())
      .then(
        (result) => {
          setSensorData(result)
          return;
        })
  }, [props.sensorID])

  /*
  Finding latest measurement with correct value. API sometimes sends null values
  */
  useEffect(() => {
    if (sensorData !== null) {
      for (let i = 0; i < sensorData.values.length; i++) {
        if (sensorData.values[i].value !== null) {
          setLatestIndex(i);
          break;
        }
      }
    }
  }, [sensorData])

  if (sensorData) //If sensor data is fetched, display it
    if (sensorData.values[latestIndex].value)
      return (
        <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} style={{display:"flex", justifyContent:"center"}}>
          <DataBlock
            description={sensorData.key}
            data={sensorData.values[latestIndex].value.toFixed(3) + " µg/m3"}
            info={"Data: " + sensorData.values[latestIndex].date.substring(0, sensorData.values[latestIndex].date.length - 3)}    
            />
            <InfoPaper display={infoDisplayCSS} pollutant={sensorData.key}></InfoPaper>
        </div>
      )
  //If not, display 'WCZYTYWANIE'
  return (
    <>
      <DataBlock
        description=""
        data="WCZYTYWANIE"
        info="" />
    </>
  )

}

export default SensorData;
