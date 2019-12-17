import React, {Component} from 'react';
import RecruiterHeader from "./recruiter/RecruiterHeader";
import ApiService from "./service/ApiService";
import RecruiterJobReport from "./recruiter/RecruiterJobReport";
import JobSeekerReport from "./jobseeker/JobSeekerReport";
import JobSeekerHeader from "./jobseeker/JobSeekerHeader";

const config = {
    headers: {
        'token': sessionStorage.getItem('token'),
        'username': sessionStorage.getItem('username')
    }
};

class JobReport extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: sessionStorage.getItem("username"),
            token: sessionStorage.getItem("token"),
            userType: sessionStorage.getItem("userType"),
            user_id: sessionStorage.getItem("id"),
            rows: [],
            rowslength: 0,
            job_id: '',
            file: null,
            jobstatus: false,
            isView: false
        }
    };


    componentWillMount() {
        let jobListURL = "";
        if (this.state.userType == 'R') {
            const user_id = {
                "user_id": this.state.user_id
            }
            this.loadJobdetail(user_id);
        } else {
            this.loadJobdetail();
        }

    }

    componentDidMount() {
        this.setState({isView: false})
    }

    loadJobdetail(data) {
        ApiService.getJobDetail(data, config).then(response => {
            if (response.status == 200) {
                this.setState({rows: response.data.body})
                this.setState({rowslength: response.data.body.length})
            }
        }).catch(error => {
            if (error.response.status == 400) {
                if (error.response.data.errorMessage) {
                    alert(error.response.data.errorMessage);
                } else {
                    alert(error.response.data);
                }
            }
            if (error.response.status == 500) {
                alert(error.response.data.errorMessage);
            }
        })
    }


    render() {
        if (this.state.userType == 'R') {
            if (this.state.rowslength == 0) {
                return (
                    <div>
                        <RecruiterHeader/>
                        <div className="maindiv">
                            <h3>No Record Found !!</h3>
                        </div>
                    </div>
                );
            } else {
                return (
                    <div>
                        <RecruiterJobReport rows_length={this.state.rowslength} rows={this.state.rows}/>
                    </div>
                );
            }
        } else if (this.state.userType == 'J') {

            if (this.state.rowslength == 0) {
                return (
                    <div>
                        <JobSeekerHeader/>
                        <div className="maindiv">
                            <h3>No Record Found !!</h3>
                        </div>
                    </div>

                );
            } else {
                return (
                    <div>
                        <JobSeekerReport rows_length={this.state.rowslength} rows={this.state.rows}/>
                    </div>
                )
            }
        }
    }

}


export default JobReport