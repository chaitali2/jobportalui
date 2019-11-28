import React, {Component} from 'react';
import axios from "axios";
import ReactDataGrid from "react-data-grid";
import RecruiterHeader from "./RecruiterHeader";
import ReactDOM from "react-dom";
import JobSeekerHeader from "./JobSeekerHeader";
import {Redirect} from "react-router";
import ApiService from "./ApiService";

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
    {key: "description", name: "Description", editable: true},
    // {key: "skills", name: "Skills", editable: true},
    {key: "apply", name: "Apply", editable: true}
]


const columnsrecruiter = [
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
    {key: "description", name: "Description", editable: true},
    // {key: "skills", name: "Skills", editable: true},
    {key: "view", name: "View", editable: true},
    {key: "update", name: "Update", editable: true},
    {key: "delete", name: "Delete", editable: true}
]

function NorecordFound() {
    return (
        <div>
            <RecruiterHeader/>
            <div className="maindiv">
                <input type="button" className="button" value="Report" onClick={this.generateReport}/>
                <h3>No Record Found !!</h3>
            </div>
        </div>
    );
}

function RecruiterJobReport() {
    return (
        <div>
            <RecruiterHeader/>
            <div className="maindiv">
                <input type="button" className="button" value="Report" onClick={this.generateReport}/>
                <div>
                    <ReactDataGrid
                        columns={columnsrecruiter}
                        rowGetter={i => this.state.rows[i]}
                        rowsCount={this.state.rowslength}
                        onGridRowsUpdated={this.onGridRowsUpdated}
                        enableCellSelect={true}
                        getCellActions={this.getCellActionOnRecruiter}
                    />
                </div>
            </div>
        </div>
    );
}


function JobSeekerReport() {
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
                        getCellActions={this.getCellActionsOnJobSeeker}
                        onCellSelected={this.onCellSelected}
                    />
                </div>
            </div>
        </div>
    );

}

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
        this.getCellActionsOnJobSeeker = this.getCellActionsOnJobSeeker.bind(this);
        this.getCellActionOnRecruiter = this.getCellActionOnRecruiter.bind(this);
        // this.applyForJob = this.applyForJob.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
    };

    componentWillMount() {
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


    getCellActionsOnJobSeeker(column, row) {
        const cellActions = {
            apply: [{
                icon: <input type="button" className="button" value="Apply Job"/>,
                callback: () => {
                    ApiService.getJobDetailOfCompany(row.id).then(response => {
                        console.log("response==" + response);
                        this.setState({jobdesc: response.data.body});
                        this.setState({applyJob: true});
                        this.setState({job_id: response.data.body.id});
                    }).catch(error => {
                        console.log("error==" + error);
                    })
                }
            }
            ]
        };
        return cellActions[column.key];
    }


    getCellActionOnRecruiter(column, row) {
        const cellActions = {
            view: [{
                icon: <input type="button" className="button" value="View"/>,
                callback: () => {
                    alert("view")
                    window.localStorage.setItem("jobId", row.id);
                    // this.props.history.push('/applyjoblist');

                    this.setState({jobstatus: true});
                    // axios.post("http://10.234.4.106:8080/recruiter/appliedJobs", row.id).then(response => {
                    //     console.log("response==" + response);
                    //
                    //     return (<Redirect to={'/jobseeker'}/>);
                    //
                    //
                    // }).catch(error => {
                    //     console.log("error==" + error);
                    // })
                }
            }
            ], update: [{
                icon: <input type="button" className="button" value="Update"/>,
                callback: () => {
                    alert("updated")
                }
            }
            ],
            delete: [{
                icon: <input type="button" className="button" value="Delete"/>,
                callback: () => {
                    ApiService.deleteJobPost(row.id)
                        .then(response => {
                            console.log("response==" + response);

                            if (response.data.statusCodeValue == 200) {
                                alert(response.data.body);
                                window.location.reload();
                            } else if (response.data.statusCodeValue == 500) {
                                alert(response.data.body.errorMessage);
                            }

                        }).catch(error => {
                        console.log("error==" + error);
                    })
                }
            }]
        };
        return cellActions[column.key];
    }

    onChangeHandler = event => {
        console.log(event.target.files[0]);
        this.setState({file: event.target.files[0]})
    }

    // applyForJob() {
    //     alert(document.getElementById("jobid").value);
    //     alert(this.state.job_id);
    //
    //     var formData = new FormData();
    //     // formData.append('file', this.state.file);
    //     formData.append('job_id', this.state.job_id);
    //     formData.append('user_id', this.state.user_id);
    //
    //     const config = {
    //         headers: {
    //             'content-type': 'multipart/form-data'
    //         }
    //     };
    //
    //     axios.post("http://10.234.4.106:8080/recruiter/applyforjob", this.state).then(response => {
    //         console.log("response==" + response);
    //         if (response.data.body.errorMessage) {
    //             alert(response.data.body.errorMessage);
    //         } else {
    //             alert(response.data.body);
    //         }
    //     }).catch(error => {
    //         console.log("error==" + error);
    //     })
    // }


    render() {
        if (this.state.userType == 'R') {
            if (this.state.rowslength == 0) {
                return (
                    <div>

                        <NorecordFound/>
                    </div>
                );
            } else {
                return (
                    <div>
                        <RecruiterJobReport/>
                    </div>
                );
            }
        } else if (this.state.userType == 'J') {
            return (
                <div>
                    <JobSeekerReport/>
                </div>
            )
        }

    }
}

export default JobReport