import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom'
import axios from "axios";
import HomeHeader from "./HomeHeader";
import ApiService from "./ApiService";

// import './Login.css';
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            userDetail: '',
            redirectToReferrer: false
        }

        this.login = this.login.bind(this);
        this.onChange = this.onChange.bind(this);
    }


    login(event) {
        event.preventDefault();
        console.log(this.state.redirectToReferrer);

        var credential = {
            "username": this.state.username,
            "password": this.state.password
        }

        ApiService.fetchByUserName(credential)
            .then(response => {
                console.log(response);
                if (response.data.status == 200) {
                    let userdata = response.data.body;
                    sessionStorage.setItem('userData', JSON.stringify(userdata));
                    sessionStorage.setItem('username', response.data.body.username);
                    sessionStorage.setItem('id', response.data.body.id);
                    sessionStorage.setItem('token', response.data.body.token);
                    sessionStorage.setItem('userType', response.data.body.typeOfUser);
                    this.setState({redirectToReferrer: true});

                    if (userdata.typeOfUser == 'R') {
                        this.props.history.push('/recruiter')
                        window.location.reload();
                    } else if (userdata.typeOfUser == 'J') {
                        this.props.history.push('/jobseeker')
                        window.location.reload();
                    }
                }
            })
            .catch(error => {
            console.log(error)
            if (error.response.status === 500) {
                alert(error.response.data);
            }
        })

    }


    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }


    render() {

        const {username, password} = this.state

        // if (this.state.redirectToReferrer) {
        //     if (sessionStorage.getItem("userType") == 'J') {
        //         return (<Redirect to={'/jobseeker'}/>);
        //     } else if (sessionStorage.getItem("userType") == 'R') {
        //         return (<Redirect to={'/recruiter'}/>);
        //     }
        // }
        return (
            <div id="main-registration-container">
                <HomeHeader/>
                <div id="login">
                    <h4>Login</h4>
                    <form onSubmit={(event) => this.login(event)}>

                        <label>Username</label>
                        <input type="text" name="username" onChange={this.onChange}/>

                        <label>Password</label>
                        <input type="password" name="password" onChange={this.onChange}/>

                        <input type="submit" value="Login"/>
                    </form>
                    <Link activeStyle={{color: 'green'}} to={"/registration"}>Registrartion</Link>
                </div>
            </div>
        );
    }
}

export default Login