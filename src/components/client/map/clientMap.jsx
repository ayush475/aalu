import React, { useState, useRef, useEffect } from "react";
import useInterval from "use-interval";
import {
  Map,
  TileLayer,
  Marker,
  Popup,
  MapContainer,
  Polyline,
} from "react-leaflet";
import L from "leaflet";

import "leaflet/dist/leaflet.css";
import osm from "./osm-providers";

// import Header from "components/Header";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useGeoLocation from "../../hooks/useGeolocation";
import {
  getAllTravellingBusDevicesInfo,
  getBusTravelInfoByDeviceId,
} from "../../../controllers/busTravel";
import { getAllDevices } from "../../../controllers/device";
import { notification, Select, Space } from "antd";
import { parseLatAndLong } from "../../../utils/gpsUtils";
import { busLocationIcon } from "./markers";
// import ExternalInfo from "components/ExternalInfo";

const markerIcon = new L.Icon({
  iconUrl: require("../../../assets/myLocation.png"),
  iconSize: [30, 30],
  iconAnchor: [17, 46], //[left/right, top/bottom]
  popupAnchor: [0, -46], //[left/right, top/bottom]
});

const polyline = [
  [51.505, -0.09],
  [51.51, -0.1],
  [51.51, -0.12],
];
const ClientMap = () => {
  const [center, setCenter] = useState({ lat: 13.084622, lng: 80.248357 });
  const [deviceRouteLocations, setDeviceRouteLocations] = useState([]);
  const [currentBusLocation, setCurrentBusLocation] = useState(null);
  const [allDevices, setAllDevices] = useState();
  const [selectedDeviceId, setSelectedDeviceId] = useState();
  const [selectedDeviceVelocity,setSelectedDeviceVelocity]=useState(null);


  const ZOOM_LEVEL = 18;
  const mapRef = useRef();
  const deviceRouteLocationRef = useRef();
  const busMarkerRef = useRef();
  // for interval ref

  const location = useGeoLocation();

  const showMyLocation = () => {
    console.log(mapRef.current);
    if (location.loaded && !location.error) {
      mapRef.current.flyTo(
        [location.coordinates.lat, location.coordinates.lng],
        ZOOM_LEVEL,
        { animate: true }
      );
    } else {
      alert(location.error.message);
    }
  };

  const zoomToBus = () => {
    // console.log(busMarkerRef.current.getLatLng());
    let coordinates = busMarkerRef.current.getLatLng();
    if (busMarkerRef.current) {
      mapRef.current.flyTo([coordinates.lat, coordinates.lng], ZOOM_LEVEL, {
        animate: true,
      });
    } else {
      alert(location.error.message);
    }
  };

  const onClickshowBusLocation = () => {
    getBusTravelInfoByDeviceId(selectedDeviceId).then((data) => {
      console.log(data, "ddddd");
      if (data.sucess) {
        // setDeviceRouteLocations(data.busInfo[0]);
        console.log(data?.busInfo);
        let nodes = data?.busInfo[0]?.routeNodes;
        let currentNodeOfBus =
          data.busInfo[0].busTravelRecentNodes.locationsWithTimeStamp;
        let currentLocationStamp =
          currentNodeOfBus[currentNodeOfBus.length - 1];
        let currentLatLng = parseLatAndLong(currentLocationStamp[0]);
        console.log(currentLatLng, "dddddddddddddddddddddddddddddd");

        setCurrentBusLocation(currentLatLng);
        setSelectedDeviceVelocity(data.busInfo[0].velocity);
        // const filterRoute = data.busInfo[0].filter((route) => {
        //   if (route.id == selectedRouteId) {
        //     // console.log(route.nodes.locations);
        //     return route;
        //   }
        //   // console.log(route);
        // });
        // console.log(filterRoute);
        if (nodes.locations.length == 0) {
          notification.error({
            message: `Warning`,
            description: `Route of this device has not been set up`,
            style: {
              width: 600,
              marginLeft: 335 - 600,
              zIndex: 1000,
            },
          });
        }
        console.log(location);
        let drawLocations = nodes.locations.map((location) => {
          console.log(location);
          // let data = parseLatAndLong(location);
          // console.log(data);
          return [location.lat, location.lng];
        });

        console.log(drawLocations);
        setDeviceRouteLocations(drawLocations);
      }
    });
  };

  useEffect(() => {
    // setDeviceRouteLocations(polyline);
    getAllTravellingBusDevicesInfo().then((data) => {
      console.log(data);
      if (data?.sucess) {
        setAllDevices(data?.busInfo);
      }
    });
  }, []);

  useEffect(() => {}, []);

  useEffect(() => {
    console.log(deviceRouteLocations);
    if (deviceRouteLocations.length > 0) {
      var bounds = deviceRouteLocationRef?.current?.getBounds();
      // Fit the map to the polygon bounds
      mapRef?.current?.fitBounds(bounds);
    }
  }, [deviceRouteLocations]);

  // INTERVAL LOCATION FETCH
  // useEffect(() => {
  //   console.log(process.env.REACT_APP_GPS_FETCH_INTERVAL);
  //   const interval = setInterval(() => {
  //     console.log('Logs every at the given interval minute');

  // if(selectedDeviceId && deviceRouteLocations){
  //   console.log("uner");
  //   getBusTravelInfoByDeviceId(selectedDeviceId).then((data) => {
  //     if (data.sucess) {
  //       // setDeviceRouteLocations(data.busInfo[0]);
  //       console.log(data.busInfo);
  //       let nodes = data.busInfo[0].routeNodes;
  //       let currentNodeOfBus =
  //         data.busInfo[0].busTravelRecentNodes.locationsWithTimeStamp;
  //       let currentLocationStamp =
  //         currentNodeOfBus[currentNodeOfBus.length - 1];
  //       let currentLatLng = parseLatAndLong(currentLocationStamp[0]);
  //       console.log(currentLatLng,"dddddddddddddddddddddddddddddd");

  //       setCurrentBusLocation(currentLatLng);
  //       // const filterRoute = data.busInfo[0].filter((route) => {
  //       //   if (route.id == selectedRouteId) {
  //       //     // console.log(route.nodes.locations);
  //       //     return route;
  //       //   }
  //       //   // console.log(route);
  //       // });
  //       // console.log(filterRoute);
  //       if (nodes.locations.length == 0) {
  //         notification.error({
  //           message: `Warning`,
  //           description: `Route of this device has not been set up`,
  //           style: {
  //             width: 600,
  //             marginLeft: 335 - 600,
  //             zIndex: 1000,
  //           },
  //         });
  //       }

  //       let drawLocations = nodes.locations.map((location) => {
  //         console.log(location);
  //         return [location.lat, location.lng];
  //       });

  //       console.log(drawLocations);
  //       setDeviceRouteLocations(drawLocations);
  //     }
  //   });
  // }

  //   }, process.env.REACT_APP_GPS_FETCH_INTERVAL);

  //   return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  // }, [])

  useInterval(() => {
    console.log("ddfdf");
    if (selectedDeviceId && deviceRouteLocations.length > 0) {
      console.log("uner");
      getBusTravelInfoByDeviceId(selectedDeviceId).then((data) => {
        if (data.sucess) {
          // setDeviceRouteLocations(data.busInfo[0]);
          console.log(data.busInfo);
          let nodes = data.busInfo[0].routeNodes;
          let currentNodeOfBus =
            data.busInfo[0].busTravelRecentNodes.locationsWithTimeStamp;
          let currentLocationStamp =
            currentNodeOfBus[currentNodeOfBus.length - 1];
          let currentLatLng = parseLatAndLong(currentLocationStamp[0]);
          console.log(currentLatLng, "dddddddddddddddddddddddddddddd");

          setCurrentBusLocation(currentLatLng);

          // if (nodes.locations.length == 0) {
          //   notification.error({
          //     message: `Warning`,
          //     description: `Route of this device has not been set up`,
          //     style: {
          //       width: 600,
          //       marginLeft: 335 - 600,
          //       zIndex: 1000,
          //     },
          //   });
          // }

          // let drawLocations = nodes.locations.map((location) => {
          //   console.log(location);
          //   return [location.lat, location.lng];
          // });

          // console.log(drawLocations);
          // setDeviceRouteLocations(drawLocations);
        }
      });
    }
  }, [process.env.REACT_APP_GPS_FETCH_INTERVAL]);

  return (
    <>
      {/* <Header title="React Leaflet Map Example" /> */}

      {/* <ExternalInfo page="leafletCurrentLocation" /> */}
      <div>
        <div>
          <button onClick={showMyLocation}>Locate Me</button>

          <div>
          <div className="user-info">
          <p className="label">Select bus Id to see details</p>
           {
        selectedDeviceVelocity && 
        <p><span className="label">Velocity:</span>{selectedDeviceVelocity}  m/s</p>

           } 
           {
            currentBusLocation && 
        <p><span className="label">CurrentLocation:</span>{currentBusLocation.lat},{currentBusLocation.lng}</p>

           }
        {/* <p><span className="label">Tagid:</span> {tagId}</p>
        <p><span className="label">Remaining-balance:</span> {remainingBalance}</p> */}
        {/* <p><span className='label'>Bus-Routes</span>{BusRoutes}</p> */}
      </div>
            <Space>
              {" "}
              <div>
                <span>Enter bus Id</span>
                <Select
                  value={selectedDeviceId}
                  onChange={(value) => {
                    setSelectedDeviceId(value);
                  }}
                  style={{
                    width: 120,
                  }}
                  // options={[
                  //   {
                  //     value: "lucy",
                  //     label: "Lucy",
                  //   },
                  // ]}
                  options={allDevices?.map((device) => {
                    console.log(device);
                    return {
                      value: device.deviceId,
                      label: device.deviceId,
                    };
                  })}
                />
              </div>
              <button onClick={onClickshowBusLocation}>
                show bus location
              </button>
              <button
                disabled={!selectedDeviceId || !currentBusLocation}
                onClick={zoomToBus}
              >
                Locate and zoom to bus
              </button>
            </Space>
          </div>
        </div>
      </div>

      <div>
        <div>
          <div>
            <MapContainer
              style={{ height: "500px" }}
              center={center}
              zoom={ZOOM_LEVEL}
              ref={mapRef}
            >
              <TileLayer
                url={osm.maptiler.url}
                attribution={osm.maptiler.attribution}
              />

              {location.loaded && !location.error && (
                <Marker
                  // icon={default}
                  
                  position={[
                    location.coordinates.lat,
                    location.coordinates.lng,
                  ]}
                ></Marker>
              )}

              <Polyline
                pathOptions={{ color: "red" }}
                positions={deviceRouteLocations}
                ref={deviceRouteLocationRef}
              />

              {/* this is for livebuslocation marker; */}
              {currentBusLocation && (
                <Marker
                  icon={busLocationIcon}
                  ref={busMarkerRef}
                  position={[currentBusLocation.lat, currentBusLocation.lng]}
                ></Marker>
              )}

              <TileLayer
                url={osm.maptiler.url}
                attribution={osm.maptiler.attribution}
              />
            </MapContainer>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClientMap;
