import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom'
import HomeHeader from "./HomeHeader";
import ApiService from "./ApiService";

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
                    console.log(response);
                    console.log("response.status==" + response.status);

                    if (response.data.statusCodeValue == 200) {
                        let userdata = response.data.body;
                        // sessionStorage.setItem('userData', JSON.stringify(userdata));
                        sessionStorage.setItem('username', response.data.body.username);
                        sessionStorage.setItem('id', response.data.body.id);
                        sessionStorage.setItem('token', response.data.body.token);
                        sessionStorage.setItem('userType', response.data.body.typeOfUser);
                        this.setState({isLoggedIn: true});

                        if (userdata.typeOfUser == 'R') {
                            this.props.history.push('/recruiter')
                            window.location.reload();
                        } else if (userdata.typeOfUser == 'J') {
                            this.props.history.push('/jobseeker')
                            window.location.reload();
                        }
                    } else if (response.data.statusCodeValue == 500) {
                        alert(response.data.body.errorMessage);
                    }

                })
                .catch(error => {
                    console.log(error)
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

                        <input type="submit" value="Login"/>
                    </form>
                    <Link activeStyle={{color: 'green'}} to={"/registration"}>Registrartion</Link>
                </div>
            </div>
        );
    }
}

export default Login