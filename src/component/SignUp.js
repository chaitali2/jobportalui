import React from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
import HomeHeader from "./HomeHeader";
// import DatePicker from "react-datepicker";
// import {onSignIn} from './Home';

class SignUp extends React.Component {
    constructor() {
        super();
        this.state = {
            fields: {},
            errors: {}
        }

        this.handleChange = this.handleChange.bind(this);
        this.submituserRegistrationForm = this.submituserRegistrationForm.bind(this);

    };

    handleChange(e) {
        let fields = this.state.fields;
        fields[e.target.name] = e.target.value;
        this.setState({
            fields
        });

    }

    submituserRegistrationForm(e) {
        e.preventDefault();
        if (this.validateForm()) {
            axios.post("http://10.234.4.106:8080/registration/registerUserDetail",this.state.fields).then(response => {
                let errors = {};
                if(response.data.body.errorMessage){
                    errors["userexist"] = response.data.body.errorMessage;
                    this.setState({
                        errors: errors
                    });
                }else{
                    alert("Form submitted");
                }
                this.setState({posts:response.data})
            }).catch(error=>{
                console.log(error)
            })
        }

    }

    validateForm() {

        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        if (!fields["firstname"]) {
            formIsValid = false;
            errors["firstname"] = "*Please enter your First Name.";
        }

        if (typeof fields["firstname"] !== "undefined") {
            if (!fields["firstname"].match(/^[a-zA-Z ]*$/)) {
                formIsValid = false;
                errors["firstname"] = "*Please enter alphabet characters only.";
            }
        }


        if (!fields["lastname"]) {
            formIsValid = false;
            errors["lastname"] = "*Please enter your Last Name.";
        }

        if (typeof fields["lastname"] !== "undefined") {
            if (!fields["lastname"].match(/^[a-zA-Z ]*$/)) {
                formIsValid = false;
                errors["lastname"] = "*Please enter alphabet characters only.";
            }
        }

        if (!fields["emailid"]) {
            formIsValid = false;
            errors["emailid"] = "*Please enter your email-ID.";
        }

        if (typeof fields["emailid"] !== "undefined") {
            //regular expression for email validation
            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(fields["emailid"])) {
                formIsValid = false;
                errors["emailid"] = "*Please enter valid email-ID.";
            }
        }

        if (!fields["mobno"]) {
            formIsValid = false;
            errors["mobno"] = "*Please enter your mobile no.";
        }

        if (typeof fields["mobno"] !== "undefined") {
            if (!fields["mobno"].match(/^[0-9]{10}$/)) {
                formIsValid = false;
                errors["mobno"] = "*Please enter valid mobile no.";
            }
        }

        if (!fields["password"]) {
            formIsValid = false;
            errors["password"] = "*Please enter your password.";
        }

        if (typeof fields["password"] !== "undefined") {
            if (!fields["password"].match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
                formIsValid = false;
                errors["password"] = "*Please enter secure and strong password.";
            }
        }

        if (!fields["confpassword"]) {
            formIsValid = false;
            errors["confpassword"] = "*Please enter your confirm password.";
        }

        if (typeof fields["confpassword"] !== "undefined") {
            if (!fields["confpassword"].match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
                formIsValid = false;
                errors["confpassword"] = "*Please enter secure and strong confirm password.";
            }
        }

        this.setState({
            errors: errors
        });
        return formIsValid;


    }



    render() {
        return (
            <div id="main-registration-container">
                <HomeHeader/>

                <div id="register">
                    <h3>Registration page</h3>
                    <form method="post"  name="userRegistrationForm"  onSubmit= {this.submituserRegistrationForm} >
                        <label>First Name :</label>
                        <input type="text" name="firstname" value={this.state.fields.firstname} onChange={this.handleChange} />
                        <div className="errorMsg">{this.state.errors.firstname}</div>
                        <label>Last Name :</label>
                        <input type="text" name="lastname" value={this.state.fields.lastname} onChange={this.handleChange}  />

                        <div className="errorMsg">{this.state.errors.lastname}</div>

                        <label>DOB :</label>
                        <input type="text" name="dob" value={this.state.fields.dob} onChange={this.handleChange}   />
                        {/*<DatePicker*/}
                        {/*    selected={ this.state.startDate }*/}
                        {/*    onChange={ this.handleChange }*/}
                        {/*    name="startDate"*/}
                        {/*    dateFormat="MM/DD/YYYY"*/}
                        {/*/>*/}
                        <div className="errorMsg">{this.state.errors.dob}</div>

                        <label>City :</label>
                        <input type="text" name="city" value={this.state.fields.city} onChange={this.handleChange}   />
                        <div className="errorMsg">{this.state.errors.city}</div>

                        <label>State :</label>
                        <input type="text" name="state" value={this.state.fields.state} onChange={this.handleChange}   />
                        <div className="errorMsg">{this.state.errors.state}</div>

                        <label>Email ID :</label>
                        <input type="text" name="emailid" value={this.state.fields.emailid} onChange={this.handleChange}   />
                        <div className="errorMsg">{this.state.errors.emailid}</div>
                        <label>Mobile No :</label>
                        <input type="text" name="mobno" value={this.state.fields.mobno} onChange={this.handleChange}   />
                        <div className="errorMsg">{this.state.errors.mobno}</div>

                        <label>Password</label>
                        <input type="password" name="password" value={this.state.fields.password} onChange={this.handleChange} />
                        <div className="errorMsg">{this.state.errors.password}</div>

                        <label>Confirm Password :</label>
                        <input type="password" name="confpassword" value={this.state.fields.confpassword} onChange={this.handleChange}   />
                        <div className="errorMsg">{this.state.errors.confpassword}</div>

                        <label>Type of User :</label>
                        <select name="typeOfUser" value={this.state.fields.typeOfUser} onChange={this.handleChange}>
                            <option value="J">JobSeeker</option>
                            <option value="R">Recruiter</option>
                        </select>
                        <input type="submit" className="button"  value="Register"/>
                        <input type="hidden" name="userexist" value={this.state.errors.userexist}/>
                        <div className="errorMsg">{this.state.errors.userexist}</div>

                    </form>
                    <Link to={"/login"}>Login</Link>

                </div>
            </div>

        );
    }


}
export default SignUp
