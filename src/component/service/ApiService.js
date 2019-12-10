import axios from 'axios';

const USER_API_BASE_URL = 'http://192.168.1.14:8090/api/jobportal/';

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

    postJobDetail(data, config) {
        return axios.post(USER_API_BASE_URL + "recruiter/addjob_posts", data, config)
    }

    getJobDetail(data, config) {
        return axios.post(USER_API_BASE_URL + "jobDetails", data, config)
    }

    deleteJobPost(data,config) {
        return axios.post(USER_API_BASE_URL + "recruiter/removejobpost", data,config)
    }

    getJobDetailOfCompany(data, config) {
        return axios.post(USER_API_BASE_URL + "jobseeker/jobdetailofcompany", data, config);
    }

    getcategories(config) {
        return axios.get(USER_API_BASE_URL + "recruiter/loadCategory", config);
    }

    getSkill(data, config) {
        return axios.post(USER_API_BASE_URL + "recruiter/loadskill", data, config);
    }

    applyforjob(data, config) {
        return axios.post(USER_API_BASE_URL + "jobseeker/applyforjob", data, config);
    }

    loadJobsApplied(data, config) {
        return axios.post(USER_API_BASE_URL + "recruiter/viewJobsApplied", data, config);
    }

    loadProfileDetails(data, config) {
        return axios.post(USER_API_BASE_URL + "userdetails", data, config);
    }

    saveProfileDetails(data, config) {
        return axios.post(USER_API_BASE_URL + "saveProfileDetail", data, config);
    }

    downloadPDF(data,config) {
        return axios.post(USER_API_BASE_URL + "recruiter/download/pdf",data, config);
    }

    updatePassoword(data,config) {
        return axios.post(USER_API_BASE_URL + "changePassword", data,config);
    }

}

export default new ApiService();