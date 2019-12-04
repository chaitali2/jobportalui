import React, {Component} from 'react';
import RecruiterHeader from "./recruiter/RecruiterHeader";
import JobSeekerHeader from "./jobseeker/JobSeekerHeader";
import ApiService from "./service/ApiService";

const config = {
    headers: {
        'token': sessionStorage.getItem('token'),
        'username': sessionStorage.getItem('username')
    }

};

class ChangePassword extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: sessionStorage.getItem("username"),
            userType: sessionStorage.getItem("userType"),
            token: sessionStorage.getItem("token"),
            old_password: "",
            new_password: "",
            confirm_password: ""

        };
        this.handleChange = this.handleChange.bind(this);
        this.changePassword = this.changePassword.bind(this);


    }

    changePassword(event) {
        event.preventDefault();
        const pwd_deatil = {
            "old_password": this.state.old_password,
            "new_password": this.state.new_password,
            "confirm_password": this.state.confirm_password,
            "username": this.state.username
        }
        ApiService.updatePassoword(pwd_deatil, config)
            .then(response => {
                if (response.status === 200) {
                    alert("Password updated successfully");
                    window.location.reload();
                }
            }).catch(error => {

            if (error.response.status == 400) {
                if (error.response.data.errorMessage) {
                    alert(error.response.data.errorMessage);
                } else {
                    alert(error.response.data);
                }
            }
        })
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    render() {
        return (
            <div>
                {this.state.userType == 'R' ? <RecruiterHeader/> : <JobSeekerHeader/>
                }
                <div id="register">
                    <h3>Change Password</h3>

                    <form onSubmit={(event) => this.changePassword(event)}>
                        <label>Old Password :</label>
                        <input type="text" name="old_password"
                               onChange={this.handleChange}/>

                        <label>New Password :</label>
                        <input type="text" name="new_password"
                               onChange={this.handleChange}/>

                        <label>Confirm Password :</label>
                        <input type="text" name="confirm_password"
                               onChange={this.handleChange}/>

                        <input type="submit" className="button" value="submit"/>

                    </form>

                </div>

            </div>
        );
    }

}

export default ChangePassword