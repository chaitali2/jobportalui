import React, {Component} from 'react';
import RecruiterHeader from "./RecruiterHeader";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class PostJobs extends React.Component {
    constructor() {
        super();
        this.state = {
            category:'',
            company:'',
            skills:[],
            job_type:'',
            experience:'',
            salary_offer:'',
            street_add:'',
            city:'',
            state:'',
            pincode:'',
            // job_opening_date:'',
            description:'',
            posted_by_id: sessionStorage.getItem("id"),
            job_opening_date: new Date()

        }

        this.handleChange = this.handleChange.bind(this);
        this.handleChangeMultiSelect = this.handleChangeMultiSelect.bind(this);
        this.savePostedJobDetail = this.savePostedJobDetail.bind(this);

    };

    savePostedJobDetail(){

        axios.post("http://10.234.4.106:8080/recruiter/post_jobs",this.state).then(response => {
        }).catch(error=>{
            console.log("error=="+error);
        })
    }

    handleChangeMultiSelect(e){
        var options = e.target.options;
        var value = [];
        let l = options.length;
        for (var i = 0; i < l; i++) {
            if (options[i].selected) {
                value.push(options[i].value);
            }
        }
        this.setState({skills:value});
    }

    handleChangedate = date => {
        this.setState({
            job_opening_date: date
        });
    };



    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }
    render() {
        return (
            <div>
                <RecruiterHeader/>
                <div id="main-registration-container">
                    <div id="register">
                        <h3>Add Job Posts</h3>

                        <label>Company :</label>
                        <input type="text" name="company" onChange={this.handleChange}/>

                        <label>Category :</label>
                        <select name="category"  onChange={this.handleChange}>
                            <option value="devloper">Developer</option>
                            <option value="fe_developer">Front End Developer</option>
                            <option value="dba">DBA</option>
                            <option value="testing">Tester</option>
                        </select>

                        <label>Skills :</label>
                        <select name="skills" multiple={true} onChange={this.handleChangeMultiSelect}>
                            <option value="java">Java</option>
                            <option value="spring">Spring</option>
                            <option value="hibernate">Hibernate</option>
                            <option value="mysql">My SQL</option>
                            <option value="oracle">Oracle</option>
                            <option value="css">CSS</option>
                            <option value="bootStrap">Bootstrap</option>
                            <option value="react">React JS</option>
                            <option value="selenium">Selenium</option>
                        </select>

                        <label>Job Type :</label>
                        <select name="job_type"  onChange={this.handleChange}>
                            <option value="P">Permanent</option>
                            <option value="C">Contract</option>
                        </select>

                        <label>Experience :</label>
                        <input type="text" name="experience" onChange={this.handleChange}/>

                        <label> Offer Salary :</label>
                        <input type="text" name="salary_offer" onChange={this.handleChange}/>

                        <label>Street Address :</label>
                        <input type="text" name="street_add" onChange={this.handleChange}/>

                        <label>City :</label>
                        <input type="text" name="city" onChange={this.handleChange}/>

                        <label>State :</label>
                        <input type="text" name="state" onChange={this.handleChange}/>

                        <label>Pin Code :</label>
                        <input type="text" maxLength={6} name="pincode" onChange={this.handleChange}/>

                        <label>Job Opening Date :</label>
                        {/*<input type="text" name="job_opening_date" onChange={this.handleChange}/>*/}
                        <DatePicker
                            selected={this.state.job_opening_date}
                            onChange={this.handleChangedate}
                            dateFormat="d-MM-yyyy"

                        />

                        <label>Description :</label>
                        <input type="textarea" name="description" onChange={this.handleChange}/>

                        <input type="button" className="button" value="Submit" onClick={this.savePostedJobDetail}/>

                    </div>
                </div>
            </div>
        );
    }
}

export default PostJobs