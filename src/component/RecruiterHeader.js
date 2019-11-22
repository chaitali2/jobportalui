import React, {Component} from 'react';
import {Link, Redirect} from "react-router-dom";

class RecruiterHeader extends React.Component {


    constructor() {
        super();
        this.state = {
            redirectToReferrer: false,
            username: sessionStorage.getItem("username"),
        };
    }

    componentWillMount() {
        if (sessionStorage.getItem("userData")) {
        } else {
            this.setState({redirectToReferrer: true});
        }
    }

    logout() {
        sessionStorage.setItem("userData", "");
        sessionStorage.clear();
    }

    render() {
        if (this.state.redirectToReferrer) {
            return (<Redirect to={'/login'}/>);
        }

        return (
        <div>
            <div className="header">
                <label className="label label-primary">JOB Portal</label>
                <label className="label label-primary"> <Link to={"/postJobs"}>Post Jobs</Link></label>
                <label className="label label-primary"> <Link to={"/jobReport"}>Job List</Link></label>
                <label className="label label-primary">Apply Job List</label>
                <label className="label label-primary"><Link to={"/profile"}>Profile</Link></label>
                <label className="label label-primary">{this.state.username}</label>
                <label className="label label-primary" onClick={this.logout}>Logout</label>
            </div>
        </div>
    )
        ;
    }
}

export default RecruiterHeader