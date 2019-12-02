import axios from 'axios';

const USER_API_BASE_URL = 'http://10.234.4.106:8080/api/jobportal/';

class ApiService {

    fetchJobById(jobId) {
        return axios.post(USER_API_BASE_URL + "recruiter/appliedJobs", jobId);
    }

    fetchByUserName(data) {
        return axios.post(USER_API_BASE_URL + "login", data);
    }

    signup(data) {
        return axios.post(USER_API_BASE_URL + "signup", data)
    }

    postJobDetail(data) {
        return axios.post(USER_API_BASE_URL + "recruiter/addjob_posts", data)
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

    getcategories(config) {
        return axios.get(USER_API_BASE_URL + "recruiter/loadCategory",config);
    }

    getSkill(data) {
        return axios.post(USER_API_BASE_URL + "recruiter/loadskill",data);
    }

    applyforjob(data,config) {
        return axios.post(USER_API_BASE_URL + "recruiter/applyforjob",data,config);
    }

    loadJobsApplied(data) {
        return axios.post(USER_API_BASE_URL + "recruiter/viewJobsApplied",data);
    }

}

export default new ApiService();