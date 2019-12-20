import React, {Component} from 'react';
import RecruiterHeader from "./RecruiterHeader";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ApiService from "../service/ApiService";

const config = {
    headers: {
        'token': sessionStorage.getItem('token'),
        'username': sessionStorage.getItem('username')
    }
};

class PostJobs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            skillvalue: [],

            categoryId: 0,
            company: '',
            skills: [],
            jobType: '',
            experience: 0.0,
            salaryOffer: 0,
            street: '',
            city: '',
            state: '',
            pincode: 0,
            description: '',
            jobOpeningDate: new Date(),

            postedById: sessionStorage.getItem("id"),
            value: "select",
            out: "",
            errors: {}

        }

        this.handleChange = this.handleChange.bind(this);
        this.handleChangeMultiSelect = this.handleChangeMultiSelect.bind(this);
        this.savePostedJobDetail = this.savePostedJobDetail.bind(this);
        this.loadSkill = this.loadSkill.bind(this);

    };

    componentWillMount() {


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

    validateForm() {
        let errors = {};
        let formIsValid = true;

        if (!this.state.categoryId) {
            formIsValid = false;
            errors["category"] = "*Please select category";
        }


        if (!this.state.company) {
            formIsValid = false;
            errors["company"] = "*Please enter your company.";
        }

        // if (this.state.skills.length<1) {
        //     formIsValid = false;
        //     errors["skills"] = "*Please select skills";
        // }

        if (!this.state.jobType) {
            formIsValid = false;
            errors["jobType"] = "*Please select type of job";
        }

        if (!this.state.experience) {
            formIsValid = false;
            errors["experience"] = "*Please enter your experience";
        }

        if (!this.state.salaryOffer) {
            formIsValid = false;
            errors["salaryOffer"] = "*Please enter offered salary";
        }

        if (!this.state.street) {
            formIsValid = false;
            errors["street"] = "*Please enter street address";
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

        if (!this.state.jobOpeningDate) {
            formIsValid = false;
            errors["jobOpeningDate"] = "*Please select job opening date";
        }


        this.setState({
            errors: errors
        });

        return formIsValid;
    }

    savePostedJobDetail() {
        const jobdetail = {
            "categoryId": this.state.categoryId,
            "company": this.state.company,
            "skills": this.state.skills,
            "jobType": this.state.jobType,
            "experience": this.state.experience,
            "salaryOffer": this.state.salaryOffer,
            "street": this.state.street,
            "city": this.state.city,
            "state": this.state.state,
            "pincode": this.state.pincode,
            "description": this.state.description,
            "postedById": this.state.postedById,
            "jobOpeningDate": this.state.jobOpeningDate
        }

        if (this.validateForm()) {
            ApiService.postJobDetail(jobdetail, config)
                .then(response => {
                    if (response.status == 200) {
                        window.location.reload();
                    }
                }).catch(error => {
                if (error.response.status == 400) {
                    if(error.response.data.errorMessage){
                        alert(error.response.data.errorMessage);
                    }else{
                        alert(error.response.data);
                    }
                }
                if (error.response.status == 500) {
                    alert(error.response.data.errorMessage);
                }
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
            jobOpeningDate: date
        });
    };


    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    loadSkill(e) {
        this.setState({[e.target.name]: e.target.value});
        this.setState({value: e.target.value});
        const category = {
            "categoryId": e.target.value
        }
        ApiService.getSkill(category, config)
            .then(response => {
                if (response.status == 200) {
                    this.setState({skillvalue: response.data.body})
                }
            }).catch(error => {
            if (error.response.status == 400) {
                alert(error.response.data.errorMessage);
            }
            if (error.response.status == 500) {
                alert(error.response.data.errorMessage);
            }
        })
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
                        <span style={{color: "red"}}>{this.state.errors["company"]}</span>

                        <label>Category :</label>
                        <select name="categoryId" onChange={this.loadSkill}>
                            <option value="">Select Category</option>
                            {this.state.categories.map(o => <option key={o.categoryId}
                                                                    value={o.categoryId}>{o.categoryName}</option>)}
                        </select>
                        <span style={{color: "red"}}>{this.state.errors["category"]}</span>

                        <label>Skills :</label>
                        <select name="skills" multiple={true} onChange={this.handleChangeMultiSelect}>
                            {this.state.skillvalue.map(o => <option key={o.skill_id}
                                                                    value={o.skill_id}>{o.skill_name}</option>)}
                        </select>
                        <span style={{color: "red"}}>{this.state.errors["skills"]}</span>


                        <label>Job Type :</label>
                        <select name="jobType" onChange={this.handleChange}>
                            <option value="">Select Job Type</option>
                            <option value="P">Permanent</option>
                            <option value="C">Contract</option>
                        </select>
                        <span style={{color: "red"}}>{this.state.errors["jobType"]}</span>


                        <label>Experience :</label>
                        <input type="text" placeholder="YEARS" name="experience" onChange={this.handleChange}/>
                        <span style={{color: "red"}}>{this.state.errors["experience"]}</span>


                        <label> Offer Salary :</label>
                        <input type="text" name="salaryOffer" placeholder="LPA" onChange={this.handleChange}/>
                        <span style={{color: "red"}}>{this.state.errors["salaryOffer"]}</span>


                        <label>Street Address :</label>
                        <input type="text" name="street" onChange={this.handleChange}/>
                        <span style={{color: "red"}}>{this.state.errors["street"]}</span>


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
                            selected={this.state.jobOpeningDate}
                            onChange={this.handleChangedate}
                            dateFormat="dd-MM-yyyy"

                        />
                        <span style={{color: "red"}}>{this.state.errors["jobOpeningDate"]}</span>


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