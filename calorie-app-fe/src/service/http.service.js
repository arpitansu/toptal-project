import axios from 'axios';

const AXIOS = axios.create({
    baseURL : process.env.REACT_APP_API_BASE_URL
})

AXIOS.defaults.headers.common['Authorization'] = `Bearer ${process.env.REACT_APP_USER_AUTH_TOKEN}`;


export function get(url){
    return AXIOS.get(url);
}

export function post(url, payload){
    return AXIOS.post(url, payload)
}

export function put(url, payload){
    return AXIOS.put(url, payload)
}

export function dlt(url, payload){
    return AXIOS.delete(url, payload)
}