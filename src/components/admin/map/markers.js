import L from "leaflet";

export const myGeoLocationIcon = new L.Icon({
    iconUrl: require('../../../assets/myLocation.png'),
    iconSize: [10, 10],
    iconAnchor: [17, 46], //[left/right, top/bottom]
    popupAnchor: [0, -46], //[left/right, top/bottom]
  });

  export const busLocationIcon= new L.Icon({
    iconUrl: require('../../../assets/busLocation.png'),
    iconSize: [50, 50],
    iconAnchor: [17, 46], //[left/right, top/bottom]
    popupAnchor: [0, -46], //[left/right, top/bottom]
  });






