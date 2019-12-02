import React, {Component} from 'react';
import {Link, Redirect} from "react-router-dom";

class RecruiterHeader extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            username: sessionStorage.getItem("username"),
        };

        this.logout = this.logout.bind(this);

    }

    componentWillMount() {
        if (sessionStorage.getItem("token")) {
        } else {
            this.setState({isLoggedIn: true});
        }
    }

    logout() {
        sessionStorage.setItem("token", "");
        sessionStorage.clear();
        // this.props.history.push('/login')
    }

    render() {
        if (this.state.isLoggedIn) {
            return (<Redirect to={'/login'}/>);
        }

        return (
        <div>
            <div className="header">
                <label className="label label-primary">JOB Portal</label>
                <label className="label label-primary"> <Link to={"/jobportal/postJobs"}>Post Jobs</Link></label>
                <label className="label label-primary" onClick={this.JobReport}> <Link to={"/jobReport"}>Job List</Link></label>
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