import { useState } from "react";
import FormTextElement from "./UI/FormElement";
//import { useNavigate } from "react-router-dom";
// import Cookies from "js-cookie";


const Register = () => {

    // const navigate = useNavigate()

    const [form, setForm] = useState({
        email: '',
        password: '',
        username: '',
        firstname: '',
        lastname: ''
    });

    // const csrfToken = Cookies.get('csrftoken');

    const headers = {
        'Content-Type': 'application/json',
        // 'X-CSRFToken': csrfToken || '',
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-2">
    <div className="p-6 space-y-8 bg-white rounded shadow-md w-96">
        <h1 className="text-2xl font-bold text-center">Register Page</h1>
        <form method="POST" className="space-y-5">
            {/* {% csrf_token %} */}
            <FormTextElement onChange={(e) => setForm({...form, email: e.currentTarget.value})} type="email" id="exampleFormControlInput1" placeholder="Enter Email" label="Email" className="w-full p-2 border border-gray-300 rounded"/>
            <FormTextElement onChange={(e) => setForm({...form, password: e.currentTarget.value})} type="password" id="exampleFormControlInput2" placeholder="Enter Password" label="Password" className="w-full p-2 border border-gray-300 rounded"/>
            <FormTextElement onChange={(e) => setForm({...form, username: e.currentTarget.value})} type="username" id="exampleFormControlInput3" placeholder="Enter Username" label="Username" className="w-full p-2 border border-gray-300 rounded"/>
            <FormTextElement onChange={(e) => setForm({...form, firstname: e.currentTarget.value})} type="firstname" id="exampleFormControlInput4" placeholder="Enter Firstname" label="Firstname" className="w-full p-2 border border-gray-300 rounded"/>
            <FormTextElement onChange={(e) => setForm({...form, lastname: e.currentTarget.value})} type="lastname" id="exampleFormControlInput5" placeholder="Enter Lastname" label="Lastname" className="w-full p-2 border border-gray-300 rounded"/>
            <input type="submit" value="Submit" onClick={handleSubmit} className="w-full p-2 text-white bg-blue-600 rounded hover:bg-blue-700">
            </input>
        </form>
    </div>
</div>

    );
}

export default Register;