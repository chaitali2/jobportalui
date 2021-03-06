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
            oldPassword: "",
            newPassword: "",
            confirmPassword: ""

        };
        this.handleChange = this.handleChange.bind(this);
        this.changePassword = this.changePassword.bind(this);
    }

    changePassword(event) {
        event.preventDefault();
        const pwd_deatil = {
            "oldPassword": this.state.oldPassword,
            "newPassword": this.state.newPassword,
            "confirmPassword": this.state.confirmPassword,
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
            if (error.response.status == 500) {
                alert(error.response.data.errorMessage);
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
                        <input type="password" name="oldPassword"
                               onChange={this.handleChange}/>

                        <label>New Password :</label>
                        <input type="password" name="newPassword"
                               onChange={this.handleChange}/>

                        <label>Confirm Password :</label>
                        <input type="password" name="confirmPassword"
                               onChange={this.handleChange}/>

                        <input type="submit" className="button" value="submit"/>
                    </form>

                </div>

            </div>
        );
    }

}

export default ChangePassword