import React, {Component} from 'react';

class JobSeekerHeader extends React.Component {
    render() {
        return (
            <div>
                <div className="header">
                    <label className="label label-primary">JOB Portal</label>
                    <label className="label label-primary">JOB List</label>
                    <label className="label label-primary">Profile</label>
                    <label className="label label-primary">username</label>
                    <label className="label label-primary" onClick={this.logout}>Logout</label>
                </div>
            </div>
        );
    }
}

export default JobSeekerHeader