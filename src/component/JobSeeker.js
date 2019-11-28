import React, {Component} from 'react';
import {Redirect} from "react-router";
import RecruiterHeader from "./RecruiterHeader";
import JobSeekerHeader from "./JobSeekerHeader";

class JobSeeker extends React.Component {
    render() {
        return (
            <div>
                <JobSeekerHeader/>
            </div>
        );
    }

}

export default JobSeeker