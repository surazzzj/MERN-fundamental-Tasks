import React, { useContext, useState } from 'react';
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const LoginSignup = () => {
  const { setToken, setUser, backendUrl, setShowLogin } = useContext(AppContext);

  const [state, setState] = useState('Login');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const url = state === 'Login' ? '/login' : '/register';
      const payload = state === 'Login' ? {
        email: formData.email,
        password: formData.password
      } : {
        name: formData.name,
        email: formData.email,
        password: formData.password
      };

      const response = await axios.post(`${backendUrl}/api/user${url}`, payload);
      const data = response.data;
      console.log(data);

      if (data.success) {
        localStorage.setItem('token', data.token);
        setToken(data.token);
        setUser(data.user);
        setShowLogin(false);
        navigate('/about');
      } else {
        alert(data.message || 'Authentication failed');
      }

    } catch (error) {
      console.error('Error:', error.response?.data || error.message);
    }
  };

  return (
    <div className='h-screen w-full bg-gray-900 flex justify-center items-center'>
      <form onSubmit={submitHandler} className='h-[45%] md:h-[55%] max-sm:h-[60%] w-90 border border-amber-50 text-white rounded-md flex flex-col justify-center items-center gap-5 px-10'>
        <div onClick={() => navigate('/')} className='absolute text-xl top-5 right-8 cursor-pointer'>x</div>

        <h1 className='font-medium text-3xl mb-4'>{state}</h1>

        {state === 'Signup' && (
          <input
            onChange={onChangeHandler}
            value={formData.name}
            className="py-3 w-full text-black px-6 rounded-md outline-none bg-gray-300"
            type="text"
            name="name"
            placeholder="Enter your name"
          />
        )}

        <input onChange={onChangeHandler} value={formData.email} className='py-3 w-full text-black px-6 rounded-md outline-none bg-gray-300 ' type="email" name='email' placeholder='Enter email' />
        <input onChange={onChangeHandler} value={formData.password} className='py-3 w-full text-black px-6 rounded-md outline-none bg-gray-300 ' type="password" name='password' placeholder='Enter password' />

        <button className='py-3 w-full mt-2 font-medium rounded-md outline-none text-white bg-blue-500 cursor-pointer'>
          {state}
        </button>

        <p onClick={() => setState(state === 'Login' ? 'Signup' : 'Login')} className='text-sm -mt-2 cursor-pointer'>
          {
            state === 'Login' ?
              <p className='cursor-pointer' onClick={() => setState('Signup')}>create new account? <span className='text-blue-400 font-medium'>Sign up</span></p> :
              <p className='cursor-pointer' onClick={() => setState('Login')}>do you have account? <span className='text-blue-400 font-medium'>Login</span></p>
          }
        </p>
      </form>
    </div>
  );
}

export default LoginSignup;
