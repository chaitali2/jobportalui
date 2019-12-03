import React, {Component} from 'react'
import ApiService from "../service/ApiService";

class ApplyJobs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
        }
    }

    componentDidMount() {
        this.loadUser();
    }

    loadUser() {
        alert(window.localStorage.getItem("jobId"));
        ApiService.fetchJobById(window.localStorage.getItem("jobId"))
            .then((res) => {
                let user = res.data.body;
                this.setState({
                    firstName: user.firstName,
                })
            });
    }


    render() {
        return (
            <div>
                this.state.firstname
            </div>
        )

    }
}

export default ApplyJobs;
