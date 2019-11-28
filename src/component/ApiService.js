import axios from 'axios';

const USER_API_BASE_URL = 'http://10.234.4.106:8080/';

class ApiService {

    fetchJobById(jobId) {
        return axios.post(USER_API_BASE_URL + "recruiter/appliedJobs", jobId);
    }

    fetchByUserName(data) {
        return axios.post(USER_API_BASE_URL + "authentication/login", data);
    }

    postUserDetail(data) {
        return axios.post(USER_API_BASE_URL + "registration/registerUserDetail", data)
    }

    postJobDetail(data) {
        return axios.post(USER_API_BASE_URL + "recruiter/post_jobs", data)
    }

    getJobDetail(data) {
        return axios.post(USER_API_BASE_URL + "recruiter/jobDetails", data)
    }

    deleteJobPost(data) {
        return axios.post(USER_API_BASE_URL + "recruiter/removejobpost", data)
    }

    getJobDetailOfCompany(data) {
        return axios.post(USER_API_BASE_URL + "recruiter/jobdetailofcompany", data);
    }

    getcategories() {
        return axios.get(USER_API_BASE_URL + "recruiter/categories");
    }

}

export default new ApiService();