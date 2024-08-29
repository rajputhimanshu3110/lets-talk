import APIService from "../APIService";
import Urls from "../Urls";

const UserService = {
    getAll: (cb) => {
        APIService.get(Urls.getAll, cb);
    },


}

export default UserService;