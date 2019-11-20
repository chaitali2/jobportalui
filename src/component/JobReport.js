import React, {Component} from 'react';
import axios from "axios";
class JobReport extends React.Component {

    constructor() {
        super();
        this.state = {
            redirectToReferrer: false,
            username: sessionStorage.getItem("username"),
            token: sessionStorage.getItem("token"),
            userType: sessionStorage.getItem("userType"),
            recruiter_id: sessionStorage.getItem("id")
        };

        // this.logout = this.logout().bind(this);
    }


    componentWillMount() {
        axios.post("http://10.234.4.106:8080/recruiter/fetchJobDetails",this.state.recruiter_id).then(response => {
            console.log(response);
        }).catch(error=>{
            console.log("error=="+error);
        })
    }

    render() {

        return(
            <div>hello</div>
        )
    }


}

export default JobReport