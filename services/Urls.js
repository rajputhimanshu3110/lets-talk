
const base_url = `http://${window.location.hostname}:3000`;


const Urls = {
    login: base_url + "/login",
    register: base_url + '/register',
    getAll: base_url + "/getAll",
    upload: base_url + "/upload",
};

export default Urls;