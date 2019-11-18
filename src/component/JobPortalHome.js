import React, {Component} from 'react';
import {Redirect} from "react-router";

class JobPortalHome extends React.Component {
    constructor() {
        super();
        this.state = {
            redirectToReferrer: false
        };

        // this.logout = this.logout().bind(this);
    }

    componentWillMount() {
        if (sessionStorage.getItem("userData")) {
            console.log("call user feed");
        } else {
            this.setState({redirectToReferrer: true});
        }
    }


    logout() {
        // this.setState({redirectToReferrer:true});
        sessionStorage.setItem("userData", "");
        sessionStorage.clear();
    }

    render() {
        if (this.state.redirectToReferrer) {
            return (<Redirect to={'/login'}/>);
        }
        return (
            <div className="row" id="Body">
                <h1> hello welcome !!</h1>
                <input type="button" className="button"  value="logout" onClick={this.logout}/>
            </div>

        );
    }
}

export default JobPortalHome