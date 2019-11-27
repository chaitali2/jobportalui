import axios from 'axios';

const USER_API_BASE_URL = 'http://localhost:8080/users';

class ApiService {

    fetchUsers() {
        return axios.get(USER_API_BASE_URL);
    }

    fetchUserById(userId) {
        return axios.get(USER_API_BASE_URL + '/' + userId);
    }

    deleteUser(userId) {
        return axios.delete(USER_API_BASE_URL + '/' + userId);
    }

    addUser(user) {
        return axios.post(""+USER_API_BASE_URL, user);
    }

    editUser(user) {
        return axios.put(USER_API_BASE_URL + '/' + user.id, user);
    }

    fetchJobById(jobId) {
        return axios.post("http://10.234.4.106:8080/recruiter/appliedJobs",jobId);
    }

    fetchByUserName(data) {
        return axios.post("http://10.234.4.106:8080/authentication/login",data);
    }

    postUserDetail(data) {
        return axios.post("http://10.234.4.106:8080/registration/registerUserDetail",data)
    }

    }

export default new ApiService();