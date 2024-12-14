import axios from "axios"
const baseDomain = "https://api-trials.x5.com.au"
const baseURL = `${baseDomain}`

export default axios.create({
    baseURL,
    headers: {
        "Content-type": "application/json"
    }
})