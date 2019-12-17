import React, {Component} from 'react';
import {Link, Redirect} from "react-router-dom";

class RecruiterHeader extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            username: sessionStorage.getItem("username"),
            fullname: sessionStorage.getItem("fullname")

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
        this.setState({isLoggedIn: true});
        // this.props.history.push('/jobportal/login');
    }

    refresh() {
        window.location.reload();
    }

    render() {
        if (this.state.isLoggedIn) {
            return (<Redirect to={'/jobportal/login'}/>);
        }

        return (
            <div>
                <div className="header">
                    <label className="label label-primary"><Link to={"/jobportal/home"}>JOB Portal</Link></label>
                    <label className="label label-primary"> <Link to={"/jobportal/postJobs"}>Post Jobs</Link></label>
                    <label className="label label-primary"> <Link to={"/jobportal/report"}>Job List</Link></label>
                    <label className="label label-primary"><Link to={"/jobportal/profile"}>Profile</Link></label>
                    <label className="label label-primary">{this.state.fullname}</label>
                    <label className="label label-primary"><Link to={"/jobportal/change_password"}>Change
                        Password</Link></label>
                    <label className="label label-primary" onClick={this.logout}>Logout</label>
                </div>
            </div>
        )
            ;
    }
}

export default RecruiterHeader