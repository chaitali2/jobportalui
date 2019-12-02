import React, {Component} from 'react';
import RecruiterHeader from "./RecruiterHeader";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ApiService from "../service/ApiService";
import {Redirect} from "react-router";

class PostJobs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            category_id:0,
            categories: [],
            company: '',
            skills: [],
            skillvalue: [],
            job_type: '',
            experience: 0.0,
            salary_offer: 0,
            street_add: '',
            city: '',
            state: '',
            pincode: 0,
            description: '',
            posted_by_id: sessionStorage.getItem("id"),
            job_opening_date: new Date(),
            value: "select",
            out: ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleChangeMultiSelect = this.handleChangeMultiSelect.bind(this);
        this.savePostedJobDetail = this.savePostedJobDetail.bind(this);
        this.loadSkill = this.loadSkill.bind(this);

    };

    componentWillMount() {
        const config = {
            headers: {
                'token': sessionStorage.getItem('token'),
                'username': sessionStorage.getItem('username')
            }
        };

        if (this.validateForm()) {
            ApiService.getcategories(config)
                .then(response => {
                    console.log(response);
                    if (response.data.statusCodeValue == 200) {
                        this.setState({categories: response.data.body})
                    }

                }).catch(error => {
                console.log(error);
                this.props.history.push('/login')
            })
        }

    }

    validateForm() {
        let errors = {};
        let formIsValid = true;

        if (!this.state.category) {
            formIsValid = false;
            errors["category"] = "*Please select category";
        }


        if (!this.state.company) {
            formIsValid = false;
            errors["company"] = "*Please enter your company.";
        }

        if (!this.state.skills) {
            formIsValid = false;
            errors["skills"] = "*Please select skills";
        }

        if (!this.state.job_type) {
            formIsValid = false;
            errors["job_type"] = "*Please select type of job";
        }

        if (!this.state.experience) {
            formIsValid = false;
            errors["experience"] = "*Please enter your experience";
        }

        if (!this.state.salary_offer) {
            formIsValid = false;
            errors["salary_offer"] = "*Please enter offered salary";
        }

        if (!this.state.street_add) {
            formIsValid = false;
            errors["street_add"] = "*Please enter street address";
        }

        if (!this.state.city) {
            formIsValid = false;
            errors["city"] = "*Please enter city";
        }

        if (!this.state.state) {
            formIsValid = false;
            errors["state"] = "*Please enter state";
        }

        if (!this.state.pincode) {
            formIsValid = false;
            errors["pincode"] = "*Please enter pincode";
        }

        if (!this.state.description) {
            formIsValid = false;
            errors["description"] = "*Please enter Description";
        }

        if (!this.state.job_opening_date) {
            formIsValid = false;
            errors["job_opening_date"] = "*Please select job opening date";
        }


        this.setState({
            errors: errors
        });

        return formIsValid;
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

        if (this.validateForm) {
            ApiService.postJobDetail(jobdetail)
                .then(response => {
                    console.log(response);
                    if (response.data.status == 200) {
                        window.location.reload();
                    }
                }).catch(error => {
                alert(error.reponse.status);
            })
        }
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

    loadSkill(e) {
        this.setState({[e.target.name]: e.target.value});
        this.setState({value: e.target.value});

        ApiService.getSkill(e.target.value)
            .then(response => {
                console.log(response);
                if (response.data.status == 200) {
                    this.setState({skillvalue: response.data.body})
                }
            }).catch(error => {
            alert("error" + error);
        })
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
                        <span style={{color: "red"}}>{this.state.errors["company"]}</span>

                        <label>Category :</label>
                        <select value={this.state.value} name="category" onChange={this.loadSkill}>
                            <option value="">Select Category</option>
                            {this.state.categories.map(o => <option key={o.category_id}
                                                                    value={o.category_id}>{o.categoryName}</option>)}
                        </select>
                        <span style={{color: "red"}}>{this.state.errors["category"]}</span>

                        <label>Skills :</label>
                        <select name="skills" multiple={true} onChange={this.handleChangeMultiSelect}>
                            {this.state.skillvalue.map(o => <option key={o.skill_id}
                                                                    value={o.skill_id}>{o.skill_name}</option>)}
                        </select>
                        <span style={{color: "red"}}>{this.state.errors["skills"]}</span>


                        <label>Job Type :</label>
                        <select name="job_type" onChange={this.handleChange}>
                            <option value="P">Permanent</option>
                            <option value="C">Contract</option>
                        </select>
                        <span style={{color: "red"}}>{this.state.errors["job_type"]}</span>


                        <label>Experience :</label>
                        <input type="text" placeholder="years" name="experience" onChange={this.handleChange}/>
                        <span style={{color: "red"}}>{this.state.errors["experience"]}</span>


                        <label> Offer Salary :</label>
                        <input type="text" name="salary_offer" placeholder="LPA" onChange={this.handleChange}/>
                        <span style={{color: "red"}}>{this.state.errors["salary_offer"]}</span>


                        <label>Street Address :</label>
                        <input type="text" name="street_add" onChange={this.handleChange}/>
                        <span style={{color: "red"}}>{this.state.errors["street_add"]}</span>


                        <label>City :</label>
                        <input type="text" name="city" onChange={this.handleChange}/>
                        <span style={{color: "red"}}>{this.state.errors["city"]}</span>


                        <label>State :</label>
                        <input type="text" name="state" onChange={this.handleChange}/>
                        <span style={{color: "red"}}>{this.state.errors["state"]}</span>


                        <label>Pin Code :</label>
                        <input type="text" maxLength={6} name="pincode" onChange={this.handleChange}/>
                        <span style={{color: "red"}}>{this.state.errors["pincode"]}</span>


                        <label>Job Opening Date :</label>
                        <DatePicker
                            selected={this.state.job_opening_date}
                            onChange={this.handleChangedate}
                            dateFormat="dd-MM-yyyy"

                        />
                        <span style={{color: "red"}}>{this.state.errors["job_opening_date"]}</span>


                        <label>Description :</label>
                        <input type="textarea" name="description" onChange={this.handleChange}/>
                        <span style={{color: "red"}}>{this.state.errors["description"]}</span>


                        <input type="button" className="button" value="Submit" onClick={this.savePostedJobDetail}/>

                    </div>
                </div>

            </div>
        );
    }
}

export default PostJobs