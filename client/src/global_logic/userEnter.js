import axios from "axios";

export const getJWT = () => localStorage.getItem("jwt_token") ?? "";
export const setJWT = token => localStorage.setItem("jwt_token", token);
export const resetJWT = () => localStorage.setItem("jwt_token", "");

export const getUserData = (callback, errorHandler = () => {}) => axios.get("http://localhost:5000/api/v1/user/primary_data", {
    params: { jwtToken: getJWT() },
}).then(res => callback(res.data)).catch(errorHandler);