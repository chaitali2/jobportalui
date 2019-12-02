import React, {Component} from 'react';
import axios from "axios";
import RecruiterHeader from "./recruiter/RecruiterHeader";
import JobSeekerHeader from "./JobSeekerHeader";


class Profile extends Component {

    constructor() {
        super();
        this.state = {
            redirectToReferrer: false,
            user_id: sessionStorage.getItem("id"),
            userdetails: '',
            userType: sessionStorage.getItem("userType"),
        };
    }

    componentWillMount() {
        axios.post("http://10.234.4.106:8080/recruiter/userdetails", this.state.user_id).then(response => {
            this.setState({userdetails: response.data.body})
        }).catch(error => {
            console.log(error);
        })
    }



        render() {
        if (this.state.userType == 'R') {
            return (
                <div>
                    <RecruiterHeader/>

                    <div id="main-registration-container">
                        <div id="register">
                            <h3>My Profile</h3>
                            <label>First Name :</label>
                            <input type="text" name="firstname" value={this.state.userdetails.firstname}
                                   onChange={this.handleChange}/>

                            <label>Last Name :</label>
                            <input type="text" name="lastname" value={this.state.userdetails.lastname}
                                   onChange={this.handleChange}/>

                            <label>Email ID :</label>
                            <input type="text" name="emailid" value={this.state.userdetails.emailid}
                                   onChange={this.handleChange}/>

                            <label>Mobile No :</label>
                            <input type="text" name="mobno" value={this.state.userdetails.mobno}
                                   onChange={this.handleChange}/>

                            <label>DOB :</label>
                            <input type="text" name="dob" value={this.state.userdetails.dob}
                                   onChange={this.handleChange}/>

                            <label>City :</label>
                            <input type="text" name="city" value={this.state.userdetails.city}
                                   onChange={this.handleChange}/>

                            <label>State :</label>
                            <input type="text" name="state" value={this.state.userdetails.state}
                                   onChange={this.handleChange}/>

                            <label>Experience :</label>
                            <input type="text" name="state" value=""
                                   onChange={this.handleChange}/>

                            <label>Highest Degree :</label>
                            <input type="text" name="state" value=""
                                   onChange={this.handleChange}/>

                            <label>Percentage :</label>
                            <input type="text" name="state" value=""
                                   onChange={this.handleChange}/>

                            <label>Passing Year :</label>
                            <input type="text" name="state" value=""
                                   onChange={this.handleChange}/>

                            <label>Expected Salary :</label>
                            <input type="text" name="state" value=""
                                   onChange={this.handleChange}/>

                            <label>Skills :</label>
                            <input type="text" name="state" value=""
                                   onChange={this.handleChange}/>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    <JobSeekerHeader/>

                    <div id="main-registration-container">
                        <div id="register">
                            <h3>My Profile</h3>
                            <label>First Name :</label>
                            <input type="text" name="firstname" value={this.state.userdetails.firstname}
                                   onChange={this.handleChange}/>

                            <label>Last Name :</label>
                            <input type="text" name="lastname" value={this.state.userdetails.lastname}
                                   onChange={this.handleChange}/>

                            <label>Email ID :</label>
                            <input type="text" name="emailid" value={this.state.userdetails.emailid}
                                   onChange={this.handleChange}/>

                            <label>Mobile No :</label>
                            <input type="text" name="mobno" value={this.state.userdetails.mobno}
                                   onChange={this.handleChange}/>

                            <label>DOB :</label>
                            <input type="text" name="dob" value={this.state.userdetails.dob}
                                   onChange={this.handleChange}/>

                            <label>City :</label>
                            <input type="text" name="city" value={this.state.userdetails.city}
                                   onChange={this.handleChange}/>

                            <label>State :</label>
                            <input type="text" name="state" value={this.state.userdetails.state}
                                   onChange={this.handleChange}/>

                            <label>Experience :</label>
                            <input type="text" name="state" value=""
                                   onChange={this.handleChange}/>

                            <label>Highest Degree :</label>
                            <input type="text" name="state" value=""
                                   onChange={this.handleChange}/>

                            <label>Percentage :</label>
                            <input type="text" name="state" value=""
                                   onChange={this.handleChange}/>

                            <label>Passing Year :</label>
                            <input type="text" name="state" value=""
                                   onChange={this.handleChange}/>

                            <label>Expected Salary :</label>
                            <input type="text" name="state" value=""
                                   onChange={this.handleChange}/>

                            <label>Skills :</label>
                            <input type="text" name="state" value=""
                                   onChange={this.handleChange}/>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default Profile