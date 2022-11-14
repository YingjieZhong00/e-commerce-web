import axios from "axios"

const BASE_URL = "http://localhost:5000/api/";

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMTZhMDAzMjE1YmUyZDMwNTJkNGQ4MSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY2ODM3NjQ0OSwiZXhwIjoxNjcwOTY4NDQ5fQ.NTeDz7GkgCWS_BYXT1RLg59rM_enfp5XQjtKQ7rWJRQ"

//JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.accessToken


export const publicRequest = axios.create({
    baseURL: BASE_URL,
})

//Investigate which part of the code is calling userRequest on lanuch. 

export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers: {token: `Bearer ${TOKEN}`}
})