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
            lastname: "",
            emailid: "",
            mobno: "",
            password: "",
            confpassword: "",
            usertype: "",
            errors: {},
            dob: new Date()

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
            "lastname": this.state.lastname,
            "dob": this.state.dob,
            "emailid": this.state.emailid,
            "mobno": this.state.mobno,
            "password": this.state.password,
            "confpassword": this.state.confpassword,
            "usertype": this.state.usertype
        }

        if (this.validateForm()) {

            ApiService.signup(userdetail)
                .then(response => {
                    console.log(response);
                    console.log("response.status==" + response.status);
                    if (response.status === 200) {
                        alert(response.data)
                        this.props.history.push('/jobportal/login')
                    }
                }).catch(error => {

                alert(error.response.status);

                if (error.response.status == 400) {
                    if (error.response.data.errorMessage) {
                        alert(error.response.data.errorMessage);
                    } else {
                        alert(error.response.data);
                    }
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

        if (!this.state.lastname) {
            formIsValid = false;
            errors["lastname"] = "*Please enter your Last Name.";
        }

        if (!this.state.lastname.match(/^[a-zA-Z ]*$/)) {
            formIsValid = false;
            errors["lastname"] = "*Please enter alphabet characters only.";
        }

        if (!this.state.emailid) {
            formIsValid = false;
            errors["emailid"] = "*Please enter your email-ID.";
        }

        if (!this.state.mobno) {
            formIsValid = false;
            errors["mobno"] = "*Please enter valid mobile no.";
        }

        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if (!pattern.test(this.state.emailid)) {
            formIsValid = false;
            errors["emailid"] = "*Please enter valid email-ID.";
        }


        if (!this.state.mobno.match(/^[0-9]{10}$/)) {
            formIsValid = false;
            errors["mobno"] = "*Please enter valid mobile no.";
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

        if (!this.state.confpassword) {
            formIsValid = false;
            errors["confpassword"] = "*Please enter your confirm password.";
        }
        //
        if (!this.state.confpassword.match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
            formIsValid = false;
            errors["confpassword"] = "*Please enter secure and strong confirm password.";
        }

        if (!this.state.usertype) {
            formIsValid = false;
            errors["usertype"] = "*Please select User Type";
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
                        <input type="text" name="lastname"
                               onChange={this.handleChange}/>
                        <span style={{color: "red"}}>{this.state.errors["lastname"]}</span>


                        <label>DOB :</label>
                        <DatePicker
                            selected={this.state.dob}
                            onChange={this.handleChangedate}
                            dateFormat="dd-MM-yyyy"

                        />

                        <label>Email ID :</label>
                        <input type="text" name="emailid"
                               onChange={this.handleChange}/>
                        <span style={{color: "red"}}>{this.state.errors["emailid"]}</span>


                        <label>Mobile No :</label>
                        <input type="text" name="mobno" onChange={this.handleChange}/>
                        <span style={{color: "red"}}>{this.state.errors["mobno"]}</span>


                        <label>Password</label>
                        <input type="password" name="password"
                               onChange={this.handleChange}/>
                        <span style={{color: "red"}}>{this.state.errors["password"]}</span>


                        <label>Confirm Password :</label>
                        <input type="password" name="confpassword"
                               onChange={this.handleChange}/>
                        <span style={{color: "red"}}>{this.state.errors["confpassword"]}</span>

                        <label>Type of User :</label>
                        <select name="usertype" onChange={this.handleChange}>
                            <option value="">Select User Type</option>
                            <option value="J">JobSeeker</option>
                            <option value="R">Recruiter</option>
                        </select>
                        <span style={{color: "red"}}>{this.state.errors["usertype"]}</span>

                        <input type="submit" className="button" value="Register"/>

                    </form>
                    <Link to={"/login"}>Login</Link>

                </div>
            </div>

        );
    }


}

export default SignUp
