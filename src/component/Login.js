import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom'
import axios from "axios";
import HomeHeader from "./HomeHeader";

// import './Login.css';
class Login extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            userDetail:'',
            redirectToReferrer: false
        };
        this.login = this.login.bind(this);
        this.onChange = this.onChange.bind(this);
    }


    login() {
        console.log(this.state.redirectToReferrer);
        axios.post("http://10.234.4.106:8080/authentication/login", this.state)
            .then(response => {
                console.log(response);

                if (response.data.statusCode=='OK') {
                    let userdata=response.data.body;
                    sessionStorage.setItem('userData', JSON.stringify(userdata));
                    sessionStorage.setItem('username', response.data.body.username);
                    sessionStorage.setItem('id', response.data.body.id);
                    sessionStorage.setItem('token',response.data.body.token);
                    sessionStorage.setItem('userType',response.data.body.typeOfUser);
                    this.setState({redirectToReferrer: true});
                }
            }).catch(error => {
            console.log(error)
        })

    }


    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }


    render() {

        const {username, password} = this.state

        console.log(this.state.redirectToReferrer + "===" + sessionStorage.getItem('userData'));
        console.log(this.state.username);
        console.log(this.state.id);
        if (this.state.redirectToReferrer ) {
            if (sessionStorage.getItem("userType") == 'J') {
                return (<Redirect to={'/jobseeker'}/>);
            }else  if (sessionStorage.getItem("userType") == 'R') {
                return (<Redirect to={'/recruiter'}/>);
            }
        }
        return (
            <div id="main-registration-container">
            <HomeHeader/>
            <div id="login">
                    <h4>Login</h4>
                    <label>Username</label>
                    <input type="text" name="username" onChange={this.onChange}/>
                    <label>Password</label>
                    <input type="password" name="password" onChange={this.onChange}/>
                    <input type="submit" value="Login" onClick={this.login}/>
                    <Link activeStyle={{color: 'green'}} to={"/registration"}>Registrartion</Link>
                </div>
            </div>
        );
    }
}

export default Login