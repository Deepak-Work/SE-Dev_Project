import { useState } from "react";
import FormTextElement from "./UI/FormElement";
//import { useNavigate } from "react-router-dom";

const Register = () => {

    // const navigate = useNavigate()

    const [form, setForm] = useState({
        email: '',
        password: '',
        username: '',
        firstname: '',
        lastname: ''
    });

    const headers = {
        'Content-Type': 'application/json',
        // 'X-CSRFToken': Cookies.get('csrftoken') || '',
    }
    
    const handleSubmit = async() => {
        const response = await fetch('http://127.0.0.1:8000/api/authentication/register/', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(form)
        });

        if (response.ok) {
            //navigate('/login');
            console.log("User registered successfully");
        } else {
            // TODO: Show warning
            console.log("User registration failed");
        }
    }
    
    return (
        <div>
            <h1>Register Page</h1>
            <form>
                <FormTextElement onChange={(e) => setForm({...form, email: e.currentTarget.value})} type="email" id="exampleFormControlInput1" placeholder="Enter Email" label="Email"/>
                <FormTextElement onChange={(e) => setForm({...form, password: e.currentTarget.value})} type="password" id="exampleFormControlInput1" placeholder="Enter Password" label="password"/>
                <FormTextElement onChange={(e) => setForm({...form, username: e.currentTarget.value})} type="username" id="exampleFormControlInput1" placeholder="Enter Username" label="username"/>
                <FormTextElement onChange={(e) => setForm({...form, firstname: e.currentTarget.value})} type="firstname" id="exampleFormControlInput1" placeholder="Enter Firstname" label="Firstname"/>
                <FormTextElement onChange={(e) => setForm({...form, lastname: e.currentTarget.value})} type="lastname" id="exampleFormControlInput1" placeholder="Enter Lastname" label="Lastname"/>
                <input type="submit" value="Submit" onClick={handleSubmit}>
                </input>
            </form>
        </div>
    );
}

export default Register;