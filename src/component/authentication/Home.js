import React, {Component} from 'react';
import HomeHeader from "./HomeHeader";
import RecruiterHeader from "../recruiter/RecruiterHeader";
import JobSeekerHeader from "../jobseeker/JobSeekerHeader";


class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userType: sessionStorage.getItem("userType"),
        }
    }

    render() {
        if (this.state.userType == 'R') {
            return (
                <div>
                    <RecruiterHeader/>
                    <div className="title"><h3><center>Welcome to Job Portal Management</center></h3></div>
                </div>
            );

        } else if (this.state.userType == 'J') {
            return (
                <div>
                    <JobSeekerHeader/>
                    <div className="title"><h3><center>Welcome to Job Portal Management</center></h3></div>
                </div>
            );
        } else {
            return (
                <div>
                    <HomeHeader/>
                    <div className="title"><h3><center>Welcome to Job Portal Management</center></h3></div>
                </div>
            );
        }
    }
}

export default Home