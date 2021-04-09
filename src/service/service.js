import axios from "axios"
const PORT = process.env.PORT | 8088
const HOST =  process.env.REACT_APP_NODE_ENV == "production"
    ? "http://api-projetovamos-com.umbler.net"
    :"http://api-projetotesti-com.umbler.net"

const PATH = "sistema"
export const API_ADDRESS = `${HOST}/${PATH}`
export const STATIC_SERVER_ADDRESS = `${HOST}/`
//url base
export const api = axios.create({ baseURL: API_ADDRESS })

console.log("ENVIROMENT", process.env.REACT_APP_NODE_ENV);

export default api
