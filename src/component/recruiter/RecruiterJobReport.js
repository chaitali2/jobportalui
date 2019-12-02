import React, {Component} from 'react';
import ReactDataGrid from "react-data-grid";
import RecruiterHeader from "./RecruiterHeader";
import ApiService from "../service/ApiService";


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
    {key: "skills", name: "Skills", editable: true},
    {key: "view", name: "View", editable: true},
    {key: "update", name: "Update", editable: true},
    {key: "delete", name: "Delete", editable: true}
]

class RecruiterJobReport extends React.Component {


    constructor(props) {
        super(props);
        this.state =
            {
                isView: false,
                data:""
            }
        this.getCellActionOnRecruiter = this.getCellActionOnRecruiter.bind(this);

    };

    getCellActionOnRecruiter(column, row) {
        const cellActions = {
            view: [{
                icon: <input type="button" className="button" value="View"/>,
                callback: () => {
                    alert("view")
                    // this.props.history.push('/applyjoblist');

                    ApiService.loadJobsApplied(row.id).then(response => {
                        console.log("response==" + response);
                        this.setState({isView: true});
                        this.setState({data: response.data.body});


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

    render() {
        return (
            <div>
                <RecruiterHeader/>
                <div className="maindiv">
                    {/*<input type="button" className="button" value="Report" onClick={this.generateReport}/>*/}
                    {this.state.isView?
                        <div>{this.state.data}</div>                         :
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