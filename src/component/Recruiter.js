import React, {Component} from 'react';
import {Redirect} from "react-router";
import RecruiterHeader from "./RecruiterHeader";

class Recruiter extends React.Component {

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
        alert("output" + this.state.userType);
        if (this.state.redirectToReferrer) {
            return (<Redirect to={'/login'}/>);
        }

        if (this.state.userType != 'R') {
            return (<Redirect to={'/login'}/>);
        }

        return (
            <div>
                <RecruiterHeader/>
            </div>
        );
    }

    componentWillMount() {
        if (sessionStorage.getItem("userData")) {
            console.log("in Recruiter")
        } else {
            alert(1);
            this.setState({redirectToReferrer: true});
        }
    }

    logout() {
        sessionStorage.setItem("userData", "");
        sessionStorage.clear();
    }
}

export default Recruiter