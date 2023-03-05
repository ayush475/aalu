import axios from "axios";

export const getBusTravelInfoByDeviceId=async(deviceId)=>{
    return  axios.get(`${process.env.REACT_APP_API_URI}/user/businfo/device/${deviceId}`).then(response=>{
        console.log(response);
       return response.data;
    }).catch(err=>{
        console.log(err.response.data);
        return err.response.data;
    })
}

export const getAllTravellingBusDevicesInfo=async()=>{
    return  axios.get(`${process.env.REACT_APP_API_URI}/user/travelling/busdevices`).then(response=>{
        console.log(response);
       return response.data;
    }).catch(err=>{
        console.log(err.response.data);
        return err.response.data;
    })
}