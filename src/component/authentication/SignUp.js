import React from 'react';
import {Link} from "react-router-dom";
import HomeHeader from "./HomeHeader";
import ApiService from "../service/ApiService";
import DatePicker from "react-datepicker";

class SignUp extends React.Component {
    constructor() {
        super();
        this.state = {
            firstname: "",
            lastName: "",
            emailId: "",
            mobileNo: "",
            password: "",
            confirmPassword: "",
            userType: "",
            errors: {},
            dateOfbirth: new Date()

        }

        this.handleChange = this.handleChange.bind(this);
        this.registration = this.registration.bind(this);

    };

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    registration(event) {
        event.preventDefault();
        const userdetail = {
            "firstname": this.state.firstname,
            "lastName": this.state.lastName,
            "dateOfbirth": this.state.dob,
            "emailId": this.state.emailId,
            "mobileNo": this.state.mobileNo,
            "password": this.state.password,
            "confirmPassword": this.state.confirmPassword,
            "userType": this.state.userType
        }

        if (this.validateForm()) {
            ApiService.signup(userdetail)
                .then(response => {
                    if (response.status === 200) {
                        this.props.history.push('/jobportal/login')
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


    }

    validateForm() {
        let errors = {};
        let formIsValid = true;

        if (!this.state.firstname) {
            formIsValid = false;
            errors["firstname"] = "*Please enter your First Name.";
        }

        if (!this.state.firstname.match(/^[a-zA-Z ]*$/)) {
            formIsValid = false;
            errors["firstname"] = "*Please enter alphabet characters only.";
        }

        if (!this.state.lastName) {
            formIsValid = false;
            errors["lastName"] = "*Please enter your Last Name.";
        }

        if (!this.state.lastName.match(/^[a-zA-Z ]*$/)) {
            formIsValid = false;
            errors["lastName"] = "*Please enter alphabet characters only.";
        }

        if (!this.state.emailId) {
            formIsValid = false;
            errors["emailId"] = "*Please enter your email-ID.";
        }

        if (!this.state.mobileNo) {
            formIsValid = false;
            errors["mobileNo"] = "*Please enter valid mobile no.";
        }

        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if (!pattern.test(this.state.emailId)) {
            formIsValid = false;
            errors["emailId"] = "*Please enter valid email-ID.";
        }


        if (!this.state.mobileNo.match(/^[0-9]{10}$/)) {
            formIsValid = false;
            errors["mobileNo"] = "*Please enter valid mobile no.";
        }

        if (!this.state.password) {
            formIsValid = false;
            errors["password"] = "*Please enter your password.";
        }
        //
        if (!this.state.password.match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
            formIsValid = false;
            errors["password"] = "*Please enter secure and strong password.";
        }

        if (!this.state.confirmPassword) {
            formIsValid = false;
            errors["confirmPassword"] = "*Please enter your confirm password.";
        }
        //
        if (!this.state.confpassword.match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
            formIsValid = false;
            errors["confirmPassword"] = "*Please enter secure and strong confirm password.";
        }

        if (!this.state.userType) {
            formIsValid = false;
            errors["userType"] = "*Please select User Type";
        }

        this.setState({
            errors: errors
        });

        return formIsValid;
    }


    handleChangedate = date => {
        this.setState({
            dob: date
        });
    };

    render() {
        return (
            <div id="main-registration-container">
                <HomeHeader/>

                <div id="register">
                    <h3>Registration page</h3>
                    <form onSubmit={(event) => this.registration(event)}>
                        <label>First Name :</label>
                        <input type="text" name="firstname"
                               onChange={this.handleChange}/>
                        <span style={{color: "red"}}>{this.state.errors["firstname"]}</span>


                        <label>Last Name :</label>
                        <input type="text" name="lastName"
                               onChange={this.handleChange}/>
                        <span style={{color: "red"}}>{this.state.errors["lastName"]}</span>


                        <label>DOB :</label>
                        <DatePicker
                            selected={this.state.dateOfbirth}
                            onChange={this.handleChangedate}
                            dateFormat="dd-MM-yyyy"

                        />

                        <label>Email ID :</label>
                        <input type="text" name="emailId"
                               onChange={this.handleChange}/>
                        <span style={{color: "red"}}>{this.state.errors["emailId"]}</span>


                        <label>Mobile No :</label>
                        <input type="text" name="mobileNo" onChange={this.handleChange}/>
                        <span style={{color: "red"}}>{this.state.errors["mobileNo"]}</span>


                        <label>Password</label>
                        <input type="password" name="password"
                               onChange={this.handleChange}/>
                        <span style={{color: "red"}}>{this.state.errors["password"]}</span>


                        <label>Confirm Password :</label>
                        <input type="password" name="confirmPassword"
                               onChange={this.handleChange}/>
                        <span style={{color: "red"}}>{this.state.errors["confirmPassword"]}</span>

                        <label>Type of User :</label>
                        <select name="userType" onChange={this.handleChange}>
                            <option value="">Select User Type</option>
                            <option value="J">JobSeeker</option>
                            <option value="R">Recruiter</option>
                        </select>
                        <span style={{color: "red"}}>{this.state.errors["userType"]}</span>

                        <input type="submit" className="button" value="Register"/>

                    </form>
                    <Link to={"/jobportal/login"}>Login</Link>

                </div>
            </div>

        );
    }


}

export default SignUp
