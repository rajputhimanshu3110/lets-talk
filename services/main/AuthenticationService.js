import APIService from "../APIService";
import Urls from "../Urls";

const AuthenticationService = {
    login: (param, cb) => {
        APIService.post(Urls.login, param, cb);
    },
    register: (param, cb) => {
        APIService.post(Urls.register, param, cb);
    },
    uploadProfile: (param, cb) => {
        APIService.post(Urls.upload, param, cb);
    }


}

export default AuthenticationService;