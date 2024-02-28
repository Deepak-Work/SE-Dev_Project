import { useState } from "react";
import FormTextElement from "./UI/FormElement";
import { useNavigate } from "react-router-dom";
// import Cookies from "js-cookie";


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

    const navigate = useNavigate();

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
                navigate("/login");
                console.log("Registration successful");
            } else {
                console.log("Registration failed");
            }
        }
    }

    return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-2">
    <div className="p-6 space-y-8 bg-white rounded shadow-md w-96">
        <h1 className="text-2xl font-bold text-center">Register Page</h1>
        <form method="POST" className="space-y-5">
            <FormTextElement onChange={(e) => setForm({...form, email: e.currentTarget.value})} type="email" id="exampleFormControlInput1" placeholder="Enter Email" label="Email" className="w-full p-2 border border-gray-300 rounded"/>
            <FormTextElement onChange={(e) => setForm({...form, password: e.currentTarget.value})} type="password" id="exampleFormControlInput2" placeholder="Enter Password" label="Password" className="w-full p-2 border border-gray-300 rounded"/>
            <FormTextElement onChange={(e) => setForm({...form, username: e.currentTarget.value})} type="username" id="exampleFormControlInput3" placeholder="Enter Username" label="Username" className="w-full p-2 border border-gray-300 rounded"/>
            <FormTextElement onChange={(e) => setForm({...form, first_name: e.currentTarget.value})} type="firstname" id="exampleFormControlInput4" placeholder="Enter Firstname" label="Firstname" className="w-full p-2 border border-gray-300 rounded"/>
            <FormTextElement onChange={(e) => setForm({...form, last_name: e.currentTarget.value})} type="lastname" id="exampleFormControlInput5" placeholder="Enter Lastname" label="Lastname" className="w-full p-2 border border-gray-300 rounded"/>
            <input type="submit" value="Submit" onClick={handleSubmit} className="w-full p-2 text-white bg-blue-600 rounded hover:bg-blue-700">
            </input>
        </form>
    </div>
</div>

    );
}

export default Register;