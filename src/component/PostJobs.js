import React, {Component} from 'react';
import RecruiterHeader from "./RecruiterHeader";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ApiService from "./ApiService";
import {Redirect} from "react-router";

class PostJobs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            category: '',
            categories: [],
            company: '',
            skills: [],
            job_type: '',
            experience: '',
            salary_offer: '',
            street_add: '',
            city: '',
            state: '',
            pincode: '',
            description: '',
            posted_by_id: sessionStorage.getItem("id"),
            job_opening_date: new Date()
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleChangeMultiSelect = this.handleChangeMultiSelect.bind(this);
        this.savePostedJobDetail = this.savePostedJobDetail.bind(this);

    };

    componentWillMount() {

        ApiService.getcategories()
            .then(response => {
                console.log(response);
                if (response.data.statusCodeValue == 200) {
                    alert(response.data.body);

                    // let categoeryFromApi = response.map(category => { return {value: category, display: category} })
                    // this.setState({ categories: [{value: '', display: '(Select Category)'}].concat(categoeryFromApi) });
                    this.setState({categories:response.data.body})
                }
            }).catch(error => {
            console.log("error==" + error);
        })

    }

    savePostedJobDetail() {

        const jobdetail = {
            "category": this.state.category,
            "company": this.state.company,
            "skills": this.state.skills,
            "job_type": this.state.job_type,
            "experience": this.state.experience,
            "salary_offer": this.state.salary_offer,
            "street_add": this.state.street_add,
            "city": this.state.city,
            "state": this.state.state,
            "pincode": this.state.pincode,
            "description": this.state.description,
            "posted_by_id": this.state.posted_by_id,
            "job_opening_date": this.state.job_opening_date
        }

        ApiService.postJobDetail(jobdetail)
            .then(response => {
                console.log(response);
                if (response.data.statusCodeValue == 200) {
                    alert(response.data.body);
                    window.location.reload();
                }
            }).catch(error => {
            console.log("error==" + error);
        })
    }

    handleChangeMultiSelect(e) {
        var options = e.target.options;
        var value = [];
        let l = options.length;
        for (var i = 0; i < l; i++) {
            if (options[i].selected) {
                value.push(options[i].value);
            }
        }
        this.setState({skills: value});
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
        if (this.state.isLoggedIn) {
            return (<Redirect to={'/login'}/>);
        }
        return (
            <div>
                <RecruiterHeader/>
                <div id="main-registration-container">
                    <div id="register">
                        <h3>Add Job Posts</h3>

                        <label>Company :</label>
                        <input type="text" name="company" onChange={this.handleChange}/>

                        <label>Category :</label>
                        <select>
                            {this.state.categories.map(o => <option key={o.category_id} value={o.category_id}>{o.categoryName}</option>)}
                        </select>


                        {/*<select name="category" onChange={this.handleChange}>*/}
                        {/*    {this.state.categories.map((category) => <option key={category.value} value={category.value}>{category.display}</option>)}*/}
                        {/*</select>*/}



                            {/*    <option value="devloper">Developer</option>*/}
                        {/*    <option value="fe_developer">Front End Developer</option>*/}
                        {/*    <option value="dba">DBA</option>*/}
                        {/*    <option value="testing">Tester</option>*/}
                        {/*</select>*/}

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
                        <select name="job_type" onChange={this.handleChange}>
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