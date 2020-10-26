import axios from "axios"

//const SCHEME: string = "http"
//const HOST: string = "192.168.1.25"
//const PORT: number = 5000
//const PATH: string = "/api"
const SCHEME: string = "https"
const HOST: string = "deco3801-the-snails.uqcloud.net"
const PORT: number = 443
const PATH: string = "/api"

const BASE_URL = `${SCHEME}://${HOST}:${PORT}${PATH}`

export const axios_ = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
})
axios_.defaults.headers.common['Authorization'] = 'Bearer '
axios_.defaults.headers.post['Content-Type'] = 'application/json'