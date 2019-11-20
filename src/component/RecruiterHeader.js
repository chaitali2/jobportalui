import React, {Component} from 'react';
import {Link} from "react-router-dom";

class RecruiterHeader extends React.Component {


    constructor() {
        super();
        this.state = {
            redirectToReferrer: false,
            username: sessionStorage.getItem("username"),
        };
    }

    render() {
        return (
            <div>
                <div className="header">
                    <label className="label label-primary">JOB Portal</label>
                    <label className="label label-primary"> <Link to={"/postJobs"}>Post Jobs</Link></label>
                    <label className="label label-primary"> <Link to={"/jobReport"}>Job List</Link></label>
                    <label className="label label-primary">Apply Job List</label>
                    <label className="label label-primary">Profile</label>
                    <label className="label label-primary">{this.state.username}</label>
                    <label className="label label-primary" onClick={this.logout}>Logout</label>
                </div>
            </div>
        );
    }
}

export default RecruiterHeader