import React, {Component} from 'react';
import {Redirect} from "react-router";
import RecruiterHeader from "./RecruiterHeader";
import JobSeekerHeader from "./JobSeekerHeader";

class JobSeeker extends React.Component {

    constructor() {
        super();
        this.state = {
            redirectToReferrer: false,
            username: sessionStorage.getItem("username"),
            token: sessionStorage.getItem("token"),
            userType: sessionStorage.getItem("userType"),
            id: sessionStorage.getItem("id")
        };

        // this.logout = this.logout().bind(this);
    }

    render() {
        if (this.state.redirectToReferrer) {
            return (<Redirect to={'/login'}/>);
        }

        if (this.state.userType != 'J') {
            return (<Redirect to={'/login'}/>);
        }

        return (
            <div>
                <JobSeekerHeader/>
            </div>
        );
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
}

export default JobSeeker