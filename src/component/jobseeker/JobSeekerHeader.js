import React, {Component} from 'react';
import {Redirect} from "react-router";
import {Link} from "react-router-dom";

class JobSeekerHeader extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            username: sessionStorage.getItem("username"),
        };
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
    }

    render() {
        if (this.state.isLoggedIn) {
            return (<Redirect to={'/jobportal/login'}/>);
        }
        return (
            <div>

                <div className="header">
                    <label className="label label-primary">JOB Portal</label>
                    <label className="label label-primary" > <Link to={"/jobportal/report"}>Job List</Link></label>
                    <label className="label label-primary"><Link to={"/jobportal/profile"}>Profile</Link></label>
                    <label className="label label-primary">{this.state.username}</label>
                    <label className="label label-primary" onClick={this.logout}>Logout</label>
                </div>
            </div>
        );
    }
}

export default JobSeekerHeader