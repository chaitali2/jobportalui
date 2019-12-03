import React, {Component} from 'react';
import ReactDataGrid from "react-data-grid";
import RecruiterHeader from "./RecruiterHeader";
import ApiService from "../service/ApiService";


const columnsrecruiter = [
    {key: "id", name: "JOB ID",width:0},
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