import axios from "axios";

export const getJWT = () => localStorage.getItem("jwt_token") ?? "";
export const setJWT = token => localStorage.setItem("jwt_token", token);

export const getUserData = (callback, errorHandler = () => {}) => axios.post("http://localhost:5000/user_data", {
    jwtToken: getJWT(),
}).then(res => callback(res.data)).catch(errorHandler);