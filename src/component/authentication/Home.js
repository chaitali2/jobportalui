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
                    <div>Welcome to Job Portal Management</div>
                </div>
            );

        } else if (this.state.userType == 'J') {
            return (
                <div>
                    <JobSeekerHeader/>
                    <div>Welcome to Job Portal Management</div>
                </div>
            );
        } else {
            return (
                <div>
                    <HomeHeader/>
                    <div>Welcome to Job Portal Management</div>
                </div>
            );
        }

    }
}

export default Home