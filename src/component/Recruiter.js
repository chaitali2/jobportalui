import React, {Component} from 'react';
import {Redirect} from "react-router";
import RecruiterHeader from "./RecruiterHeader";

class Recruiter extends React.Component {

    // constructor() {
    //     super();
    //     this.state = {
    //         isLoggedIn: false,
    //         // username: sessionStorage.getItem("username"),
    //         token: sessionStorage.getItem("token"),
    //         // userType: sessionStorage.getItem("userType"),
    //         // id: sessionStorage.getItem("id")
    //     };
    //
    //     // this.logout = this.logout().bind(this);
    // }

    render() {
        // if (this.state.isLoggedIn) {
        //     return (<Redirect to={'/login'}/>);
        // }

        // if (!this.state.isLoggedIn) {
            return (
                <div>
                    <RecruiterHeader/>
                </div>
            );
        // }
    }

    // componentWillMount() {
    //     if (sessionStorage.getItem("token")) {
    //     }else{
    //         this.setState({isLoggedIn: true});
    //     }
    // }
    //
    // logout() {
    //     sessionStorage.setItem("token", "");
    //     sessionStorage.clear();
    // }
}

export default Recruiter