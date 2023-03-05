import axios from "axios";

export const createRoute=async (routes)=>{
    const registerData={
        locations:routes
    }
    console.log(routes);
    try {
        const response = await axios
            .post(
                `${process.env.REACT_APP_API_URI}/create/route`,
                registerData,
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

export const getAllRoutes=async()=>{
    return  axios.get(`${process.env.REACT_APP_API_URI}/routes`).then(response=>{
        console.log(response);
       return response.data;
    }).catch(err=>{
        console.log(err.response.data);
        return err.response.data;
    })
}

export const getRouteDetails=async(routeId)=>{
    return  axios.get(`${process.env.REACT_APP_API_URI}/route/${routeId}`).then(response=>{
        console.log(response);
       return response.data;
    }).catch(err=>{
        console.log(err.response.data);
        return err.response.data;
    })
}