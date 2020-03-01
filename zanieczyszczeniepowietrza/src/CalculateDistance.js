export default function CalculateDistance(lat1, lat2, lon1, lon2) {
    //Function calculates distance between two geographic locations
    //It uses "haversine" formula, whatever that is
    var R = 6371; // Radius of the earth in km
    var dLat = (lat2 - lat1) * Math.PI / 180;  // deg2rad below
    var dLon = (lon2 - lon1) * Math.PI / 180;
    var a =
        0.5 - Math.cos(dLat) / 2 +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        (1 - Math.cos(dLon)) / 2;

    return (R * 2 * Math.asin(Math.sqrt(a))).toPrecision(4);
}