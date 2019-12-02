import React, {Component} from 'react';
import ReactDataGrid from "react-data-grid";
import JobSeekerHeader from "./JobSeekerHeader";
import ApiService from "./service/ApiService";

const columnsjobseeker = [
    {key: "id", name: "JOB ID", editable: true},
    {key: "company", name: "Company", editable: true},
    {key: "category_name", name: "Category", editable: true},
    {key: "job_type", name: "Type Of Job", editable: true},
    {key: "experience", name: "Experience", editable: true},
    {key: "salary_offer", name: "Salary", editable: true},
    {key: "street_add", name: "Road no/Area", editable: true},
    {key: "city", name: "City", editable: true},
    {key: "state", name: "State", editable: true},
    {key: "pincode", name: "Pincode", editable: true},
    {key: "job_opening_date", name: "Opening Date", editable: true},
    {key: "description", name: "Description", editable: true},
    {key: "skills", name: "Skills", editable: true},
    {key: "apply", name: "Apply", editable: true}
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
                    alert("apply")
                    ApiService.getJobDetailOfCompany(row.id).then(response => {
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
        alert(this.state.job_id);

        var formData = new FormData();
        formData.append('file', this.state.file);
        formData.append('job_id', this.state.job_id);
        formData.append('user_id', this.state.user_id);

        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };

        ApiService.applyforjob(formData, config).then(response => {
            if (response.data.statusCodeValue == 200) {
            } else if (response.data.statusCodeValue == 500) {
                alert(response.data.body.errorMessage);
            }
            window.location.reload();

        }).catch(error => {
            console.log("error==" + error);
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
                            <input type="button" className="button" value="Report"/>
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