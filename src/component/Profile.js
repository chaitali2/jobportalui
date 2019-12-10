import React, {Component} from 'react';
import axios from "axios";
import RecruiterHeader from "./recruiter/RecruiterHeader";
import JobSeekerHeader from "./jobseeker/JobSeekerHeader";
import ApiService from "./service/ApiService";

const config = {
    headers: {
        'token': sessionStorage.getItem('token'),
        'username': sessionStorage.getItem('username')
    }
};

class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            redirectToReferrer: false,
            userID: sessionStorage.getItem("id"),
            userdetails: '',
            userType: sessionStorage.getItem("userType"),
            firstname: "",
            lastname: "",
            mobno: "",
            street_add: "",
            city: "",
            state: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.saveProfileDetail = this.saveProfileDetail.bind(this);

    }

    componentWillMount() {
        this.profile()
    }

    profile() {
        const user_id = {
            "user_id": this.state.userID
        }
        ApiService.loadProfileDetails(user_id, config).then(response => {
            this.setState({userdetails: response.data.body})
            this.setState({firstname: response.data.body.firstname})
            this.setState({lastname: response.data.body.lastname})
            this.setState({mobno: response.data.body.mobno})
        }).catch(error => {
            console.log(error);
        })
    }

    saveProfileDetail() {
        const userdetail = {
            "firstname": this.state.firstname,
            "lastname": this.state.lastname,
            "mobno": this.state.mobno,
            "street_add": this.state.street_add,
            "city": this.state.city,
            "state": this.state.state,
            "experience": this.state.experience,
            "highest_degree": this.state.highest_degree,
            "percentage": this.state.percentage,
            "passing_year": this.state.passing_year,
            "expected_salary": this.state.expected_salary,
            "userID": sessionStorage.getItem("id")
        }

        if (this.validateForm()) {
            ApiService.saveProfileDetails(userdetail, config).then(response => {
                if (response.status == 200) {
                    this.setState({userdetails: response.data.body})
                }
            }).catch(error => {
                if (error.response.status == 400) {
                    alert(error.response.data.errorMessage);
                }
                if (error.response.status == 500) {
                    alert(error.response.data.errorMessage);
                }
            })
        }
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
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

        if (!this.state.mobno) {
            formIsValid = false;
            errors["mobno"] = "*Please enter valid mobile no.";
        }

        if (!this.state.mobno.match(/^[0-9]{10}$/)) {
            formIsValid = false;
            errors["mobno"] = "*Please enter valid mobile no.";
        }

        this.setState({
            errors: errors
        });

        return formIsValid;

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

                            <label>Mobile No :</label>
                            <input type="text" name="mobno" value={this.state.userdetails.mobno}
                                   onChange={this.handleChange}/>

                            <label>Street Address :</label>
                            <input type="text" name="street_add" value={this.state.userdetails.street_add}
                                   onChange={this.handleChange}/>

                            <label>City :</label>
                            <input type="text" name="city" value={this.state.userdetails.city}
                                   onChange={this.handleChange}/>

                            <label>State :</label>
                            <input type="text" name="state" value={this.state.userdetails.state}
                                   onChange={this.handleChange}/>

                            <input type="button" className="button" value="Submit" onClick={this.saveProfileDetail}/>


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

                            <label>Mobile No :</label>
                            <input type="text" name="mobno" value={this.state.userdetails.mobno}
                                   onChange={this.handleChange}/>

                            <label>Street Address :</label>
                            <input type="text" name="street_add" value={this.state.userdetails.street_add}
                                   onChange={this.handleChange}/>

                            <label>City :</label>
                            <input type="text" name="city" value={this.state.userdetails.city}
                                   onChange={this.handleChange}/>

                            <label>State :</label>
                            <input type="text" name="state" value={this.state.userdetails.state}
                                   onChange={this.handleChange}/>

                            <label>Experience :</label>
                            <input type="text" name="experience" value={this.state.userdetails.experience}
                                   onChange={this.handleChange}/>

                            <label>Highest Degree :</label>
                            <input type="text" name="highest_degree" value={this.state.userdetails.highest_degree}
                                   onChange={this.handleChange}/>

                            <label>Percentage :</label>
                            <input type="text" name="percentage" value={this.state.userdetails.percentage}
                                   onChange={this.handleChange}/>

                            <label>Passing Year :</label>
                            <input type="text" name="passing_year" value={this.state.userdetails.passing_year}
                                   onChange={this.handleChange}/>

                            <label>Expected Salary :</label>
                            <input type="text" name="expected_salary" value={this.state.userdetails.expected_salary}
                                   onChange={this.handleChange}/>

                            {/*<label>Skills :</label>*/}
                            {/*<input type="text" name="state" value=""*/}
                            {/*       onChange={this.handleChange}/>*/}

                            <input type="button" className="button" value="Submit" onClick={this.saveProfileDetail}/>

                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default Profile