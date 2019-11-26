import React, {Component} from 'react';
import axios from "axios";
import ReactDataGrid from "react-data-grid";
import RecruiterHeader from "./RecruiterHeader";
import ReactDOM from "react-dom";
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
            rowslength: 0,
            applyJob: false,
            job_id: '',
            file:null
        }
        this.generateReport = this.generateReport.bind(this);
        this.getCellActions = this.getCellActions.bind(this);
        this.applyForJob = this.applyForJob.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
    };

    componentWillMount() {

        let jobListURL = "";
        if (this.state.userType == 'R') {
            axios.post("http://10.234.4.106:8080/recruiter/jobDetails", this.state.user_id).then(response => {
                console.log("response====>" + response);
                this.setState({rows: response.data.body})
                this.setState({rowslength: response.data.body.length})
            }).catch(error => {
                console.log("error==" + error);
            })
        } else {
            axios.post("http://10.234.4.106:8080/recruiter/jobDetails", '').then(response => {
                console.log("response====>" + response);
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
                this.setState({rows: response.data.body})
                this.setState({rowslength: response.data.body.length})
            }).catch(error => {
                console.log("error==" + error);
            })
        } else {

            axios.post("http://10.234.4.106:8080/recruiter/jobDetails", '').then(response => {
                this.setState({rows: response.data.body})
                this.setState({rowslength: response.data.body.length})
            }).catch(error => {
                console.log("error==" + error);
            })
        }
    }

    componentDidMount() {
        this.setState({applyJob: false});
    }

    getCellActions(column, row) {
        const cellActions = {
            apply: [{
                icon: <input type="button" className="button" value="Apply Job"/>,
                callback: () => {
                    let jobid = row.id;
                    axios.post("http://10.234.4.106:8080/recruiter/jobdetailofcompany", row.id).then(response => {
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

    getCellActionOnupdate(column, row) {
        const cellActions = {
            view: [{
                icon: <input type="button" className="button" value="View"/>,
                callback: () => {
                    alert("view")

                    axios.post("http://10.234.4.106:8080/recruiter/appliedJobs", row.id).then(response => {
                        console.log("response==" + response);
                    }).catch(error => {
                        console.log("error==" + error);
                    })
                }
            }
            ] ,update: [{
                icon: <input type="button" className="button" value="Update"/>,
                callback: () => {
                    alert("updated")
                }
            }
            ],
            delete: [{
                icon: <input type="button" className="button" value="Delete"/>,
                callback: () => {
                    alert("removed")

                    axios.post("http://10.234.4.106:8080/recruiter/removejobpost", row.id).then(response => {
                        console.log("response==" + response);
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
        this.setState({file:event.target.files[0]})
    }

    applyForJob() {
        alert(document.getElementById("jobid").value);
        alert(this.state.job_id);

        var formData = new FormData();
        // formData.append('file', this.state.file);
        formData.append('job_id', this.state.job_id);
        formData.append('user_id', this.state.user_id);

        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };

        axios.post("http://10.234.4.106:8080/recruiter/applyforjob", this.state).then(response => {
            console.log("response==" + response);
            if(response.data.body.errorMessage){
                alert(response.data.body.errorMessage);
            }else{
                alert(response.data.body);
            }
        }).catch(error => {
            console.log("error==" + error);
        })
    }

    render() {
        if (this.state.applyJob) {
            return (
                <div>
                    <JobSeekerHeader/>
                    <div id="main-registration-container">
                        <div id="register">
                            <h3>Job Detail</h3>
                            <input type="hidden" id="jobid" value={this.state.jobdesc.id}/>
                            <label> Company :</label>
                            <label>{this.state.jobdesc.company}</label>

                            <label> Category :</label>
                            <label>{this.state.jobdesc.category}</label>

                            <label> Experience :</label>
                            <label>{this.state.jobdesc.experience}</label>

                            <label> Offer Salary :</label>
                            <label> {this.state.jobdesc.salary_offer}</label>

                            <label> Skills :</label>
                            <label>{this.state.jobdesc.skills.length}</label>

                            <label> Address :</label>
                            <label>{this.state.jobdesc.street_add} , {this.state.jobdesc.city} , {this.state.jobdesc.state} - {this.state.jobdesc.pincode}</label>

                            <label> Description :</label>
                            <label>{this.state.jobdesc.description}</label>

                            <label> Resume :</label>
                            <input type="file" onChange={this.onChangeHandler}/>

                            <input type="button" className="button" value="Apply" onClick={this.applyForJob}/>

                        </div>
                    </div>

                </div>
            );
        }
        if (this.state.userType == 'R') {
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
                                getCellActions={this.getCellActionOnupdate}
                            />
                        </div>
                    </div>
                </div>
            );
        } else if (this.state.userType == 'J' && !this.state.applyJob) {
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
                                getCellActions={this.getCellActions}
                                onCellSelected={this.onCellSelected}
                            />
                        </div>
                    </div>
                </div>
            );
        }

    }
}

export default JobReport