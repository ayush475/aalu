import axios from "axios";

export const getAllDevices=async()=>{
    return  axios.get(`${process.env.REACT_APP_API_URI}/devices`).then(response=>{
        console.log(response);
       return response.data;
    }).catch(err=>{
        console.log(err.response.data);
        return err.response.data;
    })
}

export const updateDeviceRoute=async (deviceId,routeId)=>{
    const updateData={
        routeId:routeId
    }
    // console.log(routes);
    try {
        const response = await axios
            .put(
                `${process.env.REACT_APP_API_URI}/update/route/device/${deviceId}`,
                updateData,
                {
                    header: {
                        contentType: "application/json",
                    },
                    withCredentials: true,
                }
            );
        console.log(response);
        return response.data;
    } catch (err) {
        console.log(err.response.data);
        return err.response.data;
    }
}



