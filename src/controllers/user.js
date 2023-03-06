import axios from "axios";

export const getAllUsers=async()=>{
    return  axios.get(`${process.env.REACT_APP_API_URI}/users`).then(response=>{
        console.log(response);
       return response.data;
    }).catch(err=>{
        console.log(err.response.data);
        return err.response.data;
    })
}