import axios from "axios"
const PORT = 8088
let HOST = ""
switch(process.env.REACT_APP_ENVIRONMENT){
    case 'production':
        HOST = process.env.REACT_APP_API_HOST
        break
    default:
        HOST = `http://localhost:${PORT}`
}

const PATH = "sistema"
export const API_ADDRESS = `${HOST}/${PATH}`
export const STATIC_SERVER_ADDRESS = `${HOST}/`
//url base
export const api = axios.create({ baseURL: API_ADDRESS })

export default api
