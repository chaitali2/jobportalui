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
            console.log("componentWillMount");
            // this.setState({username: sessionStorage.getItem("username")});
            // this.setState({token: sessionStorage.getItem("token")});

            console.log("this.state==" + this.state);
            // axios.post("http://10.234.4.106:8080/authentication/home?name=" + this.state.username + "&token=" + this.state.token, this.state)
            // axios.post("http://10.234.4.106:8080/authentication/home", this.state)
            //     .then(response => {
            //         console.log("Status code==" + response.data.statusCode);
            //
            //         if (response.data.statusCode == 'OK') {
            //             this.setState({error: false});
            //
            //             let userdata = response.data.body;
            //         }
            //     }).catch(error => {
            //     console.log("error==" + error)
            // })
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