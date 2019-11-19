import React, {Component} from 'react';
import {Redirect} from "react-router";

class JobSeeker extends React.Component {

    constructor() {
        super();
        this.state = {
            redirectToReferrer: false,
            username: sessionStorage.getItem("username"),
            token: sessionStorage.getItem("token"),
            userType: sessionStorage.getItem("userType")
        };

        // this.logout = this.logout().bind(this);
    }

    componentWillMount() {
        if (sessionStorage.getItem("userData")) {
            console.log("in job seeker")
        } else {
            this.setState({redirectToReferrer: true});
        }
    }

    render() {
        alert("output"+this.state.userType);
        if (this.state.redirectToReferrer) {
            return (<Redirect to={'/login'}/>);
        }

        if (this.state.userType != 'J') {
            return (<Redirect to={'/login'}/>);
        }

        return (
            <div>
                <div className="header">
                    <label className="label label-primary">JOB Portal</label>
                    <label className="label label-primary">JOB List</label>
                    <label className="label label-primary">Profile</label>
                    <label className="label label-primary">username</label>
                    <label className="label label-primary" onClick={this.logout}>Logout</label>
                </div>
            </div>
        );
    }


    logout() {
        sessionStorage.setItem("userData", "");
        sessionStorage.clear();
    }
}

export default JobSeeker