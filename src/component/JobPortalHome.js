import React, {Component} from 'react';
import {Redirect} from "react-router";
import axios from "axios";

class JobPortalHome extends React.Component {
    constructor() {
        super();
        this.state = {
            redirectToReferrer: false,
            username: sessionStorage.getItem("username"),
            token: sessionStorage.getItem("token")
        };

        // this.logout = this.logout().bind(this);
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
            <div className="row" id="Body">
                <h1> hello welcome !! {this.state.username}</h1>
                <input type="text" name="username" value={this.state.username}/>
                <input type="button" className="button" value="logout" onClick={this.logout}/>
            </div>

        );
    }
}


export default JobPortalHome