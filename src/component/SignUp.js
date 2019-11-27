import React from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
import HomeHeader from "./HomeHeader";
// import DatePicker from "react-datepicker";
// import {onSignIn} from './Home';
import ApiService from "./ApiService";

class SignUp extends React.Component {
    constructor() {
        super();
        this.state = {
            firstname: "",
            lastname: "",
            dob: "",
            emailid: "",
            mobno: "",
            password: "",
            confpassword: "",
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
            "confpassword": this.state.confpassword
        }

        ApiService.postUserDetail(userdetail)
            .then(response => {
                console.log(response);
                if (response.status === 200) {
                    alert(response.data)
                    this.props.history.push('/login')
                }
            }).catch(error => {
            console.log(error)
        })


    }

    // validateForm() {
    //
    //     let fields = this.state.fields;
    //     let errors = {};
    //     let formIsValid = true;
    //
    //     if (!fields["firstname"]) {
    //         formIsValid = false;
    //         errors["firstname"] = "*Please enter your First Name.";
    //     }
    //
    //     if (typeof fields["firstname"] !== "undefined") {
    //         if (!fields["firstname"].match(/^[a-zA-Z ]*$/)) {
    //             formIsValid = false;
    //             errors["firstname"] = "*Please enter alphabet characters only.";
    //         }
    //     }
    //
    //
    //     if (!fields["lastname"]) {
    //         formIsValid = false;
    //         errors["lastname"] = "*Please enter your Last Name.";
    //     }
    //
    //     if (typeof fields["lastname"] !== "undefined") {
    //         if (!fields["lastname"].match(/^[a-zA-Z ]*$/)) {
    //             formIsValid = false;
    //             errors["lastname"] = "*Please enter alphabet characters only.";
    //         }
    //     }
    //
    //     if (!fields["emailid"]) {
    //         formIsValid = false;
    //         errors["emailid"] = "*Please enter your email-ID.";
    //     }
    //
    //     if (typeof fields["emailid"] !== "undefined") {
    //         //regular expression for email validation
    //         var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    //         if (!pattern.test(fields["emailid"])) {
    //             formIsValid = false;
    //             errors["emailid"] = "*Please enter valid email-ID.";
    //         }
    //     }
    //
    //     if (!fields["mobno"]) {
    //         formIsValid = false;
    //         errors["mobno"] = "*Please enter your mobile no.";
    //     }
    //
    //     if (typeof fields["mobno"] !== "undefined") {
    //         if (!fields["mobno"].match(/^[0-9]{10}$/)) {
    //             formIsValid = false;
    //             errors["mobno"] = "*Please enter valid mobile no.";
    //         }
    //     }
    //
    //     if (!fields["password"]) {
    //         formIsValid = false;
    //         errors["password"] = "*Please enter your password.";
    //     }
    //
    //     if (typeof fields["password"] !== "undefined") {
    //         if (!fields["password"].match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
    //             formIsValid = false;
    //             errors["password"] = "*Please enter secure and strong password.";
    //         }
    //     }
    //
    //     if (!fields["confpassword"]) {
    //         formIsValid = false;
    //         errors["confpassword"] = "*Please enter your confirm password.";
    //     }
    //
    //     if (typeof fields["confpassword"] !== "undefined") {
    //         if (!fields["confpassword"].match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
    //             formIsValid = false;
    //             errors["confpassword"] = "*Please enter secure and strong confirm password.";
    //         }
    //     }
    //
    //     this.setState({
    //         errors: errors
    //     });
    //     return formIsValid;
    //
    //
    // }
    //


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

                        <label>Last Name :</label>
                        <input type="text" name="lastname"
                               onChange={this.handleChange}/>


                        <label>DOB :</label>
                        <input type="text" name="dob" onChange={this.handleChange}/>


                        <label>Email ID :</label>
                        <input type="text" name="emailid"
                               onChange={this.handleChange}/>

                        <label>Mobile No :</label>
                        <input type="text" name="mobno" onChange={this.handleChange}/>

                        <label>Password</label>
                        <input type="password" name="password"
                               onChange={this.handleChange}/>

                        <label>Confirm Password :</label>
                        <input type="password" name="confpassword"
                               onChange={this.handleChange}/>

                        <label>Type of User :</label>
                        <select name="typeOfUser" onChange={this.handleChange}>
                            <option value="J">JobSeeker</option>
                            <option value="R">Recruiter</option>
                        </select>

                        <input type="submit" className="button" value="Register"/>

                    </form>
                    <Link to={"/login"}>Login</Link>

                </div>
            </div>

        );
    }


}

export default SignUp
