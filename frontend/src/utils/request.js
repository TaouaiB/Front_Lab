import axios from "axios";


// To avoid typing it each time !!
const request = axios.create({
    baseURL: "http://localhost:8000"
});


export default request;