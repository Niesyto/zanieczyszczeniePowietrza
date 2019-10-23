function FindNearestStation(lattitude, longitude, stations) {
   
    var distance;
    var number;
   

    for (var station in stations)
    {
        
        var distanceSquaredLat = (lattitude-stations[station].gegrLat)*(lattitude-stations[station].gegrLat);
        var distanceSquaredLon = (longitude-stations[station].gegrLon)*(longitude-stations[station].gegrLon)
  
        var distanceSquared=distanceSquaredLat+distanceSquaredLon;
       
        if(distanceSquared<distance || distance===undefined)
            {
                
                distance=distanceSquared;
                number=station;
            }
    }


    return number;

}



export default FindNearestStation;
