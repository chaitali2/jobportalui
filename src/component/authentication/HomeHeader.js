import React, {Component} from 'react';
import {Link} from "react-router-dom";

class HomeHeader extends Component {
    render() {
        return (
            <div>
                <div className="header">
                    <label className="label label-primary"> <Link to={"/welcome"}>JOB PORTAL</Link></label>
                    <label className="label label-primary "> <Link to={"/jobportal/login"}>Login</Link></label>
                    <label className="label label-primary"><Link to={"/jobportal/signup"}>Sign Up</Link></label>
                </div>
            </div>
        );
    }
}

export default HomeHeader