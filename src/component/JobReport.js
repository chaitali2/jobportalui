import React, {Component} from 'react';
import RecruiterHeader from "./recruiter/RecruiterHeader";
import ApiService from "./service/ApiService";
import RecruiterJobReport from "./recruiter/RecruiterJobReport";
import JobSeekerReport from "./jobseeker/JobSeekerReport";
import JobSeekerHeader from "./jobseeker/JobSeekerHeader";


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
            jobstatus: false
        }
    };


    componentWillMount() {
        alert(this.state.userType);
        let jobListURL = "";
        if (this.state.userType == 'R') {

            ApiService.getJobDetail(this.state.user_id).then(response => {
                console.log(response);
                if (response.data.statusCodeValue == 200) {
                    this.setState({rows: response.data.body})
                    this.setState({rowslength: response.data.body.length})
                } else if (response.data.statusCodeValue == 500) {
                    alert(response.data.body.errorMessage);
                    this.setState({error: response.data.body.errorMessage})
                }
            }).catch(error => {
                console.log("error==" + error);
            })
        } else {
            ApiService.getJobDetail('').then(response => {
                console.log(response);
                if (response.data.statusCodeValue == 200) {
                    this.setState({rows: response.data.body})
                    this.setState({rowslength: response.data.body.length})
                } else if (response.data.statusCodeValue == 500) {
                    alert(response.data.body.errorMessage);
                    this.setState({error: response.data.body.errorMessage})
                }
            }).catch(error => {
                console.log("error==" + error);
            })
        }

    }


    render() {
        alert(this.state.userType);
        if (this.state.userType == 'R') {
            if (this.state.rowslength == 0) {
                return (
                    <div>
                        <RecruiterHeader/>
                        <div className="maindiv">
                            <input type="button" className="button" value="Report"/>
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
                            <input type="button" className="button" value="Report"/>
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