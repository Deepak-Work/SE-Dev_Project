import { useState } from 'react';
import '../index.css';
import FormTextElement from './UI/FormElement';

const Login = () => {
    const [form, setForm] = useState({
        'password': '',
        'username': '',
    });



    return (
        <div className="cointainer">
            <h2 className='flex-block text-4xl text-white font-bold m-1.5'>Login</h2>
            <form className='min-w-md'>
                <FormTextElement onChange={(e) => setForm({...form, username: e.currentTarget.value})} type="username" id="exampleFormControlInput1" placeholder="Enter username" label={''}/>
                <FormTextElement onChange={(e) => setForm({...form, password: e.currentTarget.value})} type="password" id="exampleFormControlInput1" placeholder="Enter Password" label={''}/>
                <div className="flex items-center justify-between">
                    <div className='flex items-center h-5'>
                        <input id="remember" type='checkbox' className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" />
                    </div>
                    <label htmlFor="remember" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
                    </div>
                    < button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Login</button>
            </form>
            <p className="text-sm text-gray-500 dark:text-gray-300">Don't have an account? <a href="/register">Register</a></p>
        </div>
    )
}

export default Login;