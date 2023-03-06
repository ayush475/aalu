import React, { useEffect, useState } from "react";
// import Header from "components/Header";
import { Select, Space } from "antd";

import { Button, notification } from "antd";

import L from "leaflet";
import {
  Map,
  TileLayer,
  FeatureGroup,
  MapContainer,
  Marker,
  Polyline,
} from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import osm from "./osm-providers";
import { useRef } from "react";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import useGeoLocation from "../../hooks/useGeolocation";
import { myGeoLocationIcon } from "./markers";
import {
  createRoute,
  getAllRoutes,
  getRouteDetails,
} from "../../../controllers/routes";
import { getAllDevices, updateDeviceRoute } from "../../../controllers/device";
import { parseLatAndLong } from "../../../utils/gpsUtils";

// import ExternalInfo from "components/ExternalInfo";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png",
});
let routes = [];
let currentLeafLetId = null;
const AdminMap = () => {
  const [allRoutes, setAllRoutes] = useState();
  const [allDevices, setAllDevices] = useState();
  const [selectedRouteId, setSelectedRouteId] = useState();
  const [selectedDeviceId, setSelectedDeviceId] = useState();
  const [selectedRouteLocations, setSelectedRouteLocations] = useState([]);
  const selectedRouteIdRef = useRef(null);
  const [center, setCenter] = useState({ lat: 24.4539, lng: 54.3773 });
  const ZOOM_LEVEL = 18;
  const mapRef = useRef();
  //   const layerRef=useRef();

  const _created = (e) => {
    console.log(process.env.REACT_APP_SERVER_URL);
    // console.log(e);
    // console.log(e.layer._leaflet_id );

    routes = [...routes, ...e.layer._latlngs];
    // console.log(e.layer);
    currentLeafLetId = e.layer._leaflet_id;
  };

  const _edited = (e) => {
    // console.log(e.layers);
    //  console.log(currentLeafLetId);
    //  console.log(e.layers._layers);
    const layers = e.layers._layers;

    //  Object.entries(layers)
    for (const [key, value] of Object.entries(layers)) {
      console.log(`${key}: ${value}`);
      if (key == currentLeafLetId) {
        routes = layers[key]._latlngs;
        console.log(layers[key]._latlngs);
        break;
      }
    }
    // routes=e.layers._layers._latlngs;
  };

  const _deleted = (e) => {
    console.log(e);
    routes = [];
  };

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

  const onCreateRouteClick = () => {
    console.log(routes);
    if (routes.length == 0) {
      notification.error({
        message: "Error",
        description: `Route locations cannot be empty`,
        style: {
          width: 600,
          marginLeft: 335 - 600,
        },
      });
    } else {
      createRoute(routes).then((data) => {
        console.log(data);
        if (data.sucess) {
          notification.success({
            message: "Route Created",
            description: `${data.message}`,
            style: {
              width: 600,
              marginLeft: 335 - 600,
            },
          });
        } else {
          notification.error({
            message: `Error in creating routing`,
            description: `${data.error}`,
            style: {
              width: 600,
              marginLeft: 335 - 600,
              zIndex: 1000,
            },
          });
        }
      });
    }

    // console.log(mapRef);
  };

  const onUpdateDeviceRouteClick = () => {
    if (!selectedDeviceId || !selectedRouteId) {
      notification.error({
        message: `Error updating`,
        description: `device id or route id is empty`,
        style: {
          width: 600,
          marginLeft: 335 - 600,
          zIndex: 1000,
        },
      });
      return;
    }
    // console.log(selectedDeviceId);
    // console.log(selectedRouteId);
    updateDeviceRoute(selectedDeviceId, selectedRouteId).then((data) => {
      if (data.sucess) {
        notification.success({
          message: "Device route updated sucessfully",
          description: `${data.message}`,
          style: {
            width: 600,
            marginLeft: 335 - 600,
          },
        });
      } else {
        notification.error({
          message: `Error in updating device route`,
          description: `${data.error}`,
          style: {
            width: 600,
            marginLeft: 335 - 600,
            zIndex: 1000,
          },
        });
      }
    });
  };

  useEffect(() => {
    // console.log(routes);

    getAllRoutes().then((data) => {
      if (data.sucess) {
        setAllRoutes(data.routes);
      }
    });

    getAllDevices().then((data) => {
      if (data.sucess) {
        setAllDevices(data.devices);
      }
    });
  }, []);
  const polyline = [
    [51.505, -0.09],
    [51.51, -0.1],
    [51.51, -0.12],
  ];
  useEffect(() => {
    // if(selectedRouteId ){
    //   getRouteDetails(selectedRouteId).then((data) => {
    //     if (data.sucess) {
    //       setSelectedRouteLocations(data.route.nodes.locations);
    //     } else {
    //       notification.error({
    //         message: `Error in creating routing`,
    //         description: `${data.error}`,
    //         style: {
    //           width: 600,
    //           marginLeft: 335 - 600,
    //           zIndex: 1000,
    //         },
    //       });
    //     }
    //   });
    // }

    if (allRoutes) {
      // console.log(allRoutes);
      // const filterRoute = allRoutes.map((route) => {
      //   // console.log(route);
      //   if (route.id == selectedRouteId) {
      //     console.log(route.nodes.locations);
      //     return route.nodes.locations;
      //   }else{

      //   }
      // });
// for parsing nodes
      const filterRoute = allRoutes.filter((route) => {
        if (route.id == selectedRouteId) {
          // console.log(route.nodes.locations);
          return route;
        }
        // console.log(route);
      });
      console.log(filterRoute);

      let drawLocations = filterRoute[0].nodes.locations.map((location) => {
       console.log(location);
//         let data=parseLatAndLong(location);
// console.log(data);
          return [location.lat, location.lng];
      });

      console.log(drawLocations);
      setSelectedRouteLocations(drawLocations);
    }

    // var bounds = selectedRouteIdRef?.current?.getBounds()
    // // Fit the map to the polygon bounds
    // mapRef?.current?.fitBounds(bounds)
    // Or center on the polygon
    // var center = bounds?.getCenter()
    // mapRef.current.panTo(center)
  }, [selectedRouteId]);

  useEffect(() => {
    console.log(selectedRouteLocations);
    if(selectedRouteLocations.length>0){
      var bounds = selectedRouteIdRef?.current?.getBounds();
      // Fit the map to the polygon bounds
      mapRef?.current?.fitBounds(bounds);
    }
    
  }, [selectedRouteLocations]);

  console.log(allRoutes);
  return (
    <>
      {/* <Header title="React Leaflet - Draw polygon, circle, rectangle on map" /> */}

      {/* <ExternalInfo page="leafletDraw" /> */}
      <button onClick={onCreateRouteClick}>Create Route</button>

      <div className="row">
        <div className="col text-center">
          <div>
            <button onClick={showMyLocation}>Locate Me</button>
          </div>
          {/* // form for posting device route */}
          <div>
            {/* select route and device id to update */}
            <Space>
              {" "}
              <div>
                <span>Route</span>
                <Select
                  value={selectedRouteId}
                  style={{
                    width: 120,
                  }}
                  onChange={(value) => {
                    // console.log(value);
                    setSelectedRouteId(value);
                  }}

                  
                  // allowClear
                  // options={[
                  //   {
                  //     value: "lucy",
                  //     label: "Lucy",
                  //   },
                  // ]}

                  options={allRoutes?.map((route) => {
                    return {
                      value: route.id,
                      label: route.id,
                    };
                  })}
                />
              </div>
              <div>
                <span>DeviceId</span>
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
                  options={allDevices?.map((route) => {
                    return {
                      value: route.id,
                      label: route.id,
                    };
                  })}
                />
              </div>
              <button onClick={onUpdateDeviceRouteClick}>
                Update device Route
              </button>
            </Space>
          </div>

          <h2>React-leaflet - Draw shapes on map</h2>
          <div className="col">
            <MapContainer
              center={center}
              style={{ height: "600px" }}
              zoom={ZOOM_LEVEL}
              ref={mapRef}
            >
              <FeatureGroup
              //    ref={layerRef}
              >
                <EditControl
                  position="topright"
                  onCreated={_created}
                  onDeleted={_deleted}
                  onEdited={_edited}
                  draw={{
                    rectangle: false,
                    circle: false,
                    circlemarker: false,
                    marker: false,
                    polygon: false,
                    // polyline: false,
                  }}
                />
              </FeatureGroup>
              {/* for myGeoLocationIcon portion */}
              {location.loaded && !location.error && (
                <Marker
                  // icon={myGeoLocationIcon}
                  position={[
                    location.coordinates.lat,
                    location.coordinates.lng,
                  ]}
                ></Marker>
              )}

              <Polyline
              pathOptions={{color:"red"}}
              
              positions={selectedRouteLocations} ref={selectedRouteIdRef} />

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

export default AdminMap;
