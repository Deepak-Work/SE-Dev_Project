import { useState } from 'react';
import '../index.css';
import FormTextElement from './UI/FormElement';

const Login = () => {
    const [form, setForm] = useState({
        'password': '',
        'username': '',
    });



    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
  <div className="max-w-md w-full space-y-8">
    <div>
      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Login
      </h2>
    </div>
    <form className="mt-8 space-y-6" action="#" method="POST">
      <input type="hidden" name="remember" value="true" />
      <div className="rounded-md shadow-sm -space-y-px">
        <FormTextElement onChange={(e) => setForm({...form, username: e.currentTarget.value})} type="username" id="exampleFormControlInput1" placeholder="Enter username" label={''} className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-black-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"/>
        <FormTextElement onChange={(e) => setForm({...form, password: e.currentTarget.value})} type="password" id="exampleFormControlInput1" placeholder="Enter Password" label={''} className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-black-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"/>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input id="remember" name="remember" type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
          <label htmlFor="remember" className="ml-2 block text-sm text-gray-900">
            Remember me
          </label>
        </div>
      </div>

      <div>
        <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Login
        </button>
      </div>
    </form>
    <p className="mt-2 text-center text-sm text-gray-600">
      Don't have an account? <a href="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
        Register
      </a>
    </p>
  </div>
</div>

    )
}

export default Login;