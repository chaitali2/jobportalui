import React, {Component} from 'react';
import axios from "axios";
import ReactDataGrid from "react-data-grid";
import RecruiterHeader from "./RecruiterHeader";
import {Redirect} from "react-router";
import JobSeekerHeader from "./JobSeekerHeader";

const columns = [
    {key: "id", name: "JOB ID", editable: true},
    {key: "company", name: "Company", editable: true},
    {key: "category", name: "Category", editable: true},
    {key: "job_type", name: "Type Of Job", editable: true},
    {key: "experience", name: "Experience", editable: true},
    {key: "salary_offer", name: "Salary", editable: true},
    {key: "street_add", name: "Road no/Area", editable: true},
    {key: "city", name: "City", editable: true},
    {key: "state", name: "State", editable: true},
    {key: "pincode", name: "Pincode", editable: true},
    {key: "job_opening_date", name: "Opening Date", editable: true},
    {key: "description", name: "Description", editable: true}
]

class JobReport extends React.Component {
    constructor() {
        super();
        this.state = {
            redirectToReferrer: false,
            username: sessionStorage.getItem("username"),
            token: sessionStorage.getItem("token"),
            userType: sessionStorage.getItem("userType"),
            user_id: sessionStorage.getItem("id"),
            rows: [],
            rowslength: 0
        }
        this.generateReport = this.generateReport.bind(this);
    };

    componentWillMount() {
        let jobListURL = "";
        alert(this.state.userType);
        if (this.state.userType == 'R') {
            axios.post("http://10.234.4.106:8080/recruiter/jobDetails", this.state.user_id).then(response => {
                console.log(response);
                this.setState({rows: response.data.body})
                this.setState({rowslength: response.data.body.length})
            }).catch(error => {
                console.log("error==" + error);
            })
        } else {

            axios.post("http://10.234.4.106:8080/recruiter/jobDetails", '').then(response => {
                console.log(response);
                this.setState({rows: response.data.body})
                this.setState({rowslength: response.data.body.length})
            }).catch(error => {
                console.log("error==" + error);
            })
        }
    }

    generateReport() {
        if (this.state.userType = 'R') {

            axios.post("http://10.234.4.106:8080/recruiter/jobDetails", this.state.user_id).then(response => {
                console.log(response);
                this.setState({rows: response.data.body})
                this.setState({rowslength: response.data.body.length})
            }).catch(error => {
                console.log("error==" + error);
            })
        } else {

            axios.post("http://10.234.4.106:8080/recruiter/jobDetails", '').then(response => {
                console.log(response);
                this.setState({rows: response.data.body})
                this.setState({rowslength: response.data.body.length})
            }).catch(error => {
                console.log("error==" + error);
            })
        }
    }

    render() {
        if (this.state.userType == 'R') {

            return (

                <div>
                    <RecruiterHeader/>
                    <div className="maindiv">
                        <input type="button" className="button" value="Report" onClick={this.generateReport}/>
                        <div>
                            <ReactDataGrid
                                columns={columns}
                                rowGetter={i => this.state.rows[i]}
                                rowsCount={this.state.rowslength}
                                onGridRowsUpdated={this.onGridRowsUpdated}
                                enableCellSelect={true}
                            />
                        </div>
                    </div>
                </div>
            );
        } else {
            return (

                <div>
                    <JobSeekerHeader/>
                    <div className="maindiv">
                        <input type="button" className="button" value="Report" onClick={this.generateReport}/>
                        <div>
                            <ReactDataGrid
                                columns={columns}
                                rowGetter={i => this.state.rows[i]}
                                rowsCount={this.state.rowslength}
                                onGridRowsUpdated={this.onGridRowsUpdated}
                                enableCellSelect={true}
                                
                            />
                        </div>
                    </div>
                </div>
            );
        }

    }
}

export default JobReport