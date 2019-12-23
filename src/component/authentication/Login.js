import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom'
import HomeHeader from "./HomeHeader";
import ApiService from "../service/ApiService";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isLoggedIn: false,
            errors: {}
        }

        this.login = this.login.bind(this);
        this.onChange = this.onChange.bind(this);
    }


    componentWillMount() {
        if (sessionStorage.getItem("token")) {
            if (sessionStorage.getItem("userType") == 'R') {
                this.props.history.push('/jobportal/recruiter')
                window.location.reload();
            } else if (sessionStorage.getItem("userType") == 'J') {
                this.props.history.push('/jobportal/jobseeker')
                window.location.reload();
            }
        } else {
            this.setState({isLoggedIn: true});
        }
    }

    validateForm() {
        let errors = {};
        let formIsValid = true;

        if (!this.state.username) {
            formIsValid = false;
            errors["username"] = "*Please enter your User Name.";
        }
        if (!this.state.password) {
            formIsValid = false;
            errors["password"] = "*Please enter your Password.";
        }
        this.setState({
            errors: errors
        });

        return formIsValid;
    }


    login(event) {
        event.preventDefault();

        var credential = {
            "username": this.state.username,
            "password": this.state.password
        }
        if (this.validateForm()) {
            ApiService.fetchByUserName(credential)
                .then(response => {
                    if (response.status == 200) {
                        let userdata = response.data.body;
                        sessionStorage.setItem('username', response.data.body.username);
                        sessionStorage.setItem('fullname', response.data.body.firstName + " " + response.data.body.lastName);
                        sessionStorage.setItem('id', response.data.body.id);
                        sessionStorage.setItem('token', response.data.body.token);
                        sessionStorage.setItem('userType', response.data.body.userType);
                        this.setState({isLoggedIn: true});

                        if (userdata.userType == 'R') {
                            this.props.history.push('/jobportal/recruiter')
                            window.location.reload();
                        } else if (userdata.userType == 'J') {
                            this.props.history.push('/jobportal/jobseeker')
                            window.location.reload();
                        }
                    }

                })
                .catch(error => {
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

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    render() {
        return (
            <div id="main-registration-container">
                <HomeHeader/>
                <div id="login">
                    <h4>Login</h4>
                    <form onSubmit={(event) => this.login(event)}>
                        <label>Username</label>
                        <input type="text" name="username" onChange={this.onChange}/>
                        <span style={{color: "red"}}>{this.state.errors["username"]}</span>

                        <label>Password</label>
                        <input type="password" name="password" onChange={this.onChange}/>
                        <span style={{color: "red"}}>{this.state.errors["password"]}</span>

                        <input type="submit" className="button" value="Login"/>
                    </form>
                    <Link activeStyle={{color: 'green'}} to={"/jobportal/signup"}>Registrartion</Link>
                </div>
            </div>
        );
    }
}

export default Login