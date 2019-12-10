import React, {Component} from 'react';
import ReactDataGrid from "react-data-grid";
import JobSeekerHeader from "./JobSeekerHeader";
import ApiService from "../service/ApiService";


const columnsjobseeker = [
    {key: "id", name: "JOB ID", width: 0},
    {key: "company", name: "Company", width: 150},
    {key: "category_name", name: "Category"},
    {key: "job_type", name: "Job Type"},
    {key: "experience", name: "Experience"},
    {key: "salary_offer", name: "Salary"},
    {key: "street_add", name: "Road no/Area", width: 250},
    {key: "city", name: "City"},
    {key: "state", name: "State"},
    {key: "pincode", name: "Pincode"},
    {key: "job_opening_date", name: "Opening Date"},
    {key: "description", name: "Description", width: 300},
    {key: "skills", name: "Skills"},
    {key: "apply", name: "Apply"}
]


class JobSeekerReport extends React.Component {
    constructor(props) {
        super(props);
        this.state =
            {
                isApplyJob: false,
                jobdesc: "",
                job_id: "",
                user_id: sessionStorage.getItem("id"),
                file: null
            }
        this.getCellActionsOnJobSeeker = this.getCellActionsOnJobSeeker.bind(this);
        this.applyForJob = this.applyForJob.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);


    };

    getCellActionsOnJobSeeker(column, row) {
        const cellActions = {
            apply: [{
                icon: <input type="button" className="button" value="Apply Job"/>,
                callback: () => {
                    const config = {
                        headers: {
                            'token': sessionStorage.getItem('token'),
                            'username': sessionStorage.getItem('username')
                        }
                    };
                    const job_id = {
                        "job_id": row.id
                    }
                    ApiService.getJobDetailOfCompany(job_id, config).then(response => {
                        console.log("response==" + response);
                        this.setState({jobdesc: response.data.body});
                        this.setState({isApplyJob: true});
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


    onChangeHandler(event) {
        console.log(event.target.files[0]);
        this.setState({file: event.target.files[0]})
    }

    applyForJob() {

        var formData = new FormData();
        formData.append('file', this.state.file);
        formData.append('job_id', this.state.job_id);
        formData.append('user_id', this.state.user_id);

        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                'token': sessionStorage.getItem('token'),
                'username': sessionStorage.getItem('username')
            }
        };

        ApiService.applyforjob(formData, config).then(response => {
            if (response.status == 200) {
            }
        }).catch(error => {
            if (error.response.status == 400) {
                alert(error.response.data.errorMessage);
            }
            if (error.response.status == 500) {
                alert(error.response.data.errorMessage);
            }
        })
    }

    render() {
        return (
            <div>
                <JobSeekerHeader/>
                <div className="maindiv">

                    {this.state.isApplyJob ?
                        <div id="main-registration-container">
                            <div id="register">
                                <h3>Job Detail</h3>
                                <label>Company :</label>
                                <label>{this.state.jobdesc.company}</label>
                                <label>Category :</label>
                                <label>{this.state.jobdesc.category_name}</label>
                                <label>Experience :</label>
                                <label>{this.state.jobdesc.experience}</label>
                                <label>Salary Offer :</label>
                                <label>{this.state.jobdesc.salary_offer}</label>
                                <label>Address :</label>
                                <label>{this.state.jobdesc.street_add},{this.state.jobdesc.city},{this.state.jobdesc.state}</label>
                                <label>Description :</label>
                                <label>{this.state.jobdesc.description}</label>
                                <label>Job Opening Date :</label><label>{this.state.jobdesc.job_opening_date}</label>
                                <label>Resume :</label><input type="file" onChange={this.onChangeHandler}/>
                                <input type="button" className="button" value="Apply" onClick={this.applyForJob}/>

                            </div>
                        </div> :
                        <div>
                            <div>
                                <ReactDataGrid
                                    columns={columnsjobseeker}
                                    rowGetter={i => this.props.rows[i]}
                                    rowsCount={this.props.rows_length}
                                    onGridRowsUpdated={this.onGridRowsUpdated}
                                    enableCellSelect={true}
                                    getCellActions={this.getCellActionsOnJobSeeker}
                                />
                            </div>
                        </div>
                    }
                </div>
            </div>
        )
    }

}

export default JobSeekerReport