import axios from "axios";
// import SessionService from "./SessionService";


const APIService = {
    get: async function (url, cb) {
        const response = await axios.get(url);
        cb(response.data);
    },
    post: async function (url, param, cb) {
        const response = await axios.post(url, param, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        cb(response.data);
    }
}

export default APIService;