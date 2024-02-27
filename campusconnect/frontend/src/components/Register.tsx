import { useState } from "react";
import FormTextElement from "./UI/FormElement";
//import { useNavigate } from "react-router-dom";

import Cookies from 'js-cookie';

interface Form {
    email: string;
    password: string;
    username: string;
    first_name: string;
    last_name: string;
}

function validateForm(form: Form): boolean {    
    /* TODO:
    1) Validate email - is it a valid NYU email?
    2) Validate password - Use regex
    */
    
    if (form.username.length < 10) {
        return false;
    }
    return true;
}

const Register = () => {

    const [form, setForm] = useState<Form>({
        email: '',
        password: '',
        username: '',
        first_name: '',
        last_name: ''
    });

    const handleSubmit = async(e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        // Prevent default behavior for forms. We need this other some browsers (like Firefox) blocks the request.
        e.preventDefault();

        if (validateForm(form)) {
            const headers = {
                'Content-Type': 'application/json',
                'X-CSRFToken': Cookies.get('csrftoken') || '',
            }

            const response: Response = await fetch('api/authentication/register', {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(form)
            })

            if (response.ok) {
                console.log("Registration successful");
            } else {
                console.log("Registration failed");
            }
        }
    }
    
    return (
        <div>
            <h1>Register Page</h1>
            <form>
                <FormTextElement onChange={(e) => setForm({...form, email: e.currentTarget.value})} type="email" id="exampleFormControlInput1" placeholder="Enter Email" label="Email"/>
                <FormTextElement onChange={(e) => setForm({...form, password: e.currentTarget.value})} type="password" id="exampleFormControlInput1" placeholder="Enter Password" label="password"/>
                <FormTextElement onChange={(e) => setForm({...form, username: e.currentTarget.value})} type="username" id="exampleFormControlInput1" placeholder="Enter Username" label="username"/>
                <FormTextElement onChange={(e) => setForm({...form, first_name: e.currentTarget.value})} type="firstname" id="exampleFormControlInput1" placeholder="Enter Firstname" label="Firstname"/>
                <FormTextElement onChange={(e) => setForm({...form, last_name: e.currentTarget.value})} type="lastname" id="exampleFormControlInput1" placeholder="Enter Lastname" label="Lastname"/>
                <input type="submit" value="Submit" onClick={(e) => handleSubmit(e)}/>
            </form>
        </div>
    );
}

export default Register;