import React, {Component} from 'react';
import ReactDataGrid from "react-data-grid";
import RecruiterHeader from "./RecruiterHeader";
import ApiService from "../service/ApiService";

const config = {
    headers: {
        'token': sessionStorage.getItem('token'),
        'username': sessionStorage.getItem('username')
    }
};

const columnsrecruiter = [
    {key: "id", name: "JOB ID", width: 0},
    {key: "company", name: "Company"},
    {key: "category_name", name: "Category"},
    {key: "job_type", name: "Type Of Job"},
    {key: "experience", name: "Experience"},
    {key: "salary_offer", name: "Salary"},
    {key: "street_add", name: "Road no/Area"},
    {key: "city", name: "City"},
    {key: "state", name: "State"},
    {key: "pincode", name: "Pincode"},
    {key: "job_opening_date", name: "Opening Date"},
    {key: "description", name: "Description"},
    {key: "skills", name: "Skills"},
    {key: "view", name: "View"},
    {key: "update", name: "Update"},
    {key: "delete", name: "Delete"}
]

const columnsapplyjob = [
    {key: "firstname", name: "First Name"},
    {key: "lastname", name: "Last Name"},
    {key: "company", name: "Company"},
    {key: "description", name: "Description"},
    {key: "applyDate", name: "Apply Date"},
    {key: "fileName", name: "Resume"},
]

class RecruiterJobReport extends React.Component {


    constructor(props) {
        super(props);
        this.state =
            {
                isView: false,
                data: "",
                rows: [],
                rowslength: 0
            }
        this.getCellActionOnRecruiter = this.getCellActionOnRecruiter.bind(this);
        this.getCellActionOnResume = this.getCellActionOnResume.bind(this);

    };

    getCellActionOnResume(column, row) {
        const cellActions = {
            fileName: [{
                icon: <input type="button" className="button" value="View"/>,
                callback: () => {
                    alert("view" + row.fileName);
                    ApiService.downloadPDF(config).then(response => {
                        console.log("response==" + response.data);
                        const url = window.URL.createObjectURL(new Blob([response.data]));
                        const link = document.createElement('a');
                        link.href = url;
                        link.setAttribute('download', 'file.pdf'); //or any other extension
                        document.body.appendChild(link);
                        link.click();
                    }).catch(error => {
                        console.log("error==" + error);
                    })
                }
            }]
        };
        return cellActions[column.key];
    }

    getCellActionOnRecruiter(column, row) {
        const cellActions = {
            view: [{
                icon: <input type="button" className="button" value="View"/>,
                callback: () => {
                    alert("view")
                    // this.props.history.push('/applyjoblist');
                    const job_id = {
                        "job_id": row.id
                    }
                    ApiService.loadJobsApplied(job_id, config).then(response => {
                        console.log("response==" + response);
                        this.setState({isView: true});
                        this.setState({rows: response.data.body})
                        this.setState({rowslength: response.data.body.length})

                    }).catch(error => {
                        console.log("error==" + error);
                    })
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
                    alert("delete");
                    const job_id = {
                        "job_id": row.id
                    }
                    ApiService.deleteJobPost(job_id)
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

    render() {
        return (
            <div>
                <RecruiterHeader/>
                <div className="maindiv">
                    {this.state.isView ?

                        this.state.rowslength == 0 ? <div>
                                <div className="maindiv">
                                    <h3>No Record Found !!</h3>
                                </div>
                            </div> :
                            <div>
                                <ReactDataGrid
                                    columns={columnsapplyjob}
                                    rowGetter={i => this.state.rows[i]}
                                    rowsCount={this.state.rowslength}
                                    enableCellSelect={true}
                                    getCellActions={this.getCellActionOnResume}

                                />
                            </div> :
                        <div>
                            <ReactDataGrid
                                columns={columnsrecruiter}
                                rowGetter={i => this.props.rows[i]}
                                rowsCount={this.props.rows_length}
                                onGridRowsUpdated={this.onGridRowsUpdated}
                                enableCellSelect={true}
                                getCellActions={this.getCellActionOnRecruiter}
                            />
                        </div>
                    }
                </div>
            </div>
        );
    }

}

export default RecruiterJobReport