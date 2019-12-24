import React, {Component} from 'react';
import RecruiterHeader from "./recruiter/RecruiterHeader";
import JobSeekerHeader from "./jobseeker/JobSeekerHeader";
import ApiService from "./service/ApiService";
import {Redirect} from "react-router";
import cookie from 'react-cookies'

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
            firstName: "",
            lastName: "",
            mobileNo: "",
            street: "",
            city: "",
            state: "",
            isLoggedIn: true
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
            console.log(response.headers);
            this.setState({userdetails: response.data.body})
            this.setState({firstName: response.data.body.firstName})
            this.setState({lastName: response.data.body.lastName})
            this.setState({mobileNo: response.data.body.mobileNo})
            this.setState({street: response.data.body.street})
            this.setState({city: response.data.body.city})
            this.setState({state: response.data.body.state})
            this.setState({experience: response.data.body.experience})
            this.setState({highestDegree: response.data.body.highestDegree})
            this.setState({passingYear: response.data.body.passingYear})
            this.setState({expectedSalary: response.data.body.expectedSalary})
        }).catch(error => {
            if (error == "Error: Network Error") {
                this.setState({isLoggedIn: false});
                sessionStorage.setItem("token", "");
                sessionStorage.clear();
            }
            console.log(error);
        })
    }

    saveProfileDetail() {
        const userdetail = {
            "firstName": this.state.firstName,
            "lastName": this.state.lastName,
            "mobileNo": this.state.mobileNo,
            "street": this.state.street,
            "city": this.state.city,
            "state": this.state.state,
            "experience": this.state.experience,
            "highestDegree": this.state.highestDegree,
            "percentage": this.state.percentage,
            "passingYear": this.state.passingYear,
            "expectedSalary": this.state.expectedSalary,
            "userID": sessionStorage.getItem("id")
        }

        if (this.validateForm()) {
            ApiService.saveProfileDetails(userdetail, config).then(response => {
                if (response.status == 200) {
                    this.setState({userdetails: response.data.body})
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

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }


    validateForm() {
        let errors = {};
        let formIsValid = true;

        if (!this.state.firstName) {
            formIsValid = false;
            errors["firstName"] = "*Please enter your First Name.";
        }

        if (!this.state.firstName.match(/^[a-zA-Z ]*$/)) {
            formIsValid = false;
            errors["firstName"] = "*Please enter alphabet characters only.";
        }

        if (!this.state.lastName) {
            formIsValid = false;
            errors["lastName"] = "*Please enter your Last Name.";
        }

        if (!this.state.lastName.match(/^[a-zA-Z ]*$/)) {
            formIsValid = false;
            errors["lastName"] = "*Please enter alphabet characters only.";
        }

        if (!this.state.mobileNo) {
            formIsValid = false;
            errors["mobileNo"] = "*Please enter valid mobile no.";
        }

        if (!this.state.mobileNo.match(/^[0-9]{10}$/)) {
            formIsValid = false;
            errors["mobileNo"] = "*Please enter valid mobile no.";
        }

        this.setState({
            errors: errors
        });

        return formIsValid;

    }

    render() {

        if (!this.state.isLoggedIn) {
            return (<Redirect to={'/jobportal/login'}/>);
        }
        if (this.state.userType == 'R') {
            return (
                <div>
                    <RecruiterHeader/>

                    <div id="main-registration-container">
                        <div id="register">
                            <h3>My Profile</h3>
                            <label>First Name :</label>
                            <input type="text" name="firstName" value={this.state.userdetails.firstName}
                                   onChange={this.handleChange}/>

                            <label>Last Name :</label>
                            <input type="text" name="lastName" value={this.state.userdetails.lastName}
                                   onChange={this.handleChange}/>

                            <label>Mobile No :</label>
                            <input type="text" name="mobielNo" value={this.state.userdetails.mobileNo}
                                   onChange={this.handleChange}/>

                            <label>Street Address :</label>
                            <input type="text" name="street" value={this.state.userdetails.street}
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
                            <input type="text" name="firstName" value={this.state.userdetails.firstName}
                                   onChange={this.handleChange}/>

                            <label>Last Name :</label>
                            <input type="text" name="lastName" value={this.state.userdetails.lastName}
                                   onChange={this.handleChange}/>

                            <label>Mobile No :</label>
                            <input type="text" name="mobileNo" value={this.state.userdetails.mobileNo}
                                   onChange={this.handleChange}/>

                            <label>Street Address :</label>
                            <input type="text" name="street" value={this.state.userdetails.street}
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
                            <input type="text" name="highestDegree" value={this.state.userdetails.highestDegree}
                                   onChange={this.handleChange}/>

                            <label>Percentage :</label>
                            <input type="text" name="percentage" value={this.state.userdetails.percentage}
                                   onChange={this.handleChange}/>

                            <label>Passing Year :</label>
                            <input type="text" name="passingYear" value={this.state.userdetails.passingYear}
                                   onChange={this.handleChange}/>

                            <label>Expected Salary :</label>
                            <input type="text" name="expectedSalary" value={this.state.userdetails.expectedSalary}
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