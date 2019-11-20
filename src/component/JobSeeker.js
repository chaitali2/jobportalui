import React, {Component} from 'react';
import {Redirect} from "react-router";
import JobSeekerHeader from "./JobSeekerHeader";

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
           <JobSeekerHeader/>
            </div>
        );
    }


    logout() {
        sessionStorage.setItem("userData", "");
        sessionStorage.clear();
    }
}

export default JobSeeker