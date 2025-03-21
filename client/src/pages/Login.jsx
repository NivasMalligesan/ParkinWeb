import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext';
import axios from 'axios'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [state, setState] = useState('Sign Up');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const { token, setToken, backendUrl } = useContext(AppContext);
  const navigate = useNavigate()

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (state === 'Sign Up') {
        const { data } = await axios.post(backendUrl + '/api/user/register', {
          name, email, password
        });

        if (data.success) {
          localStorage.setItem('token', data.token);
          setToken(data.token);
        } else {
          toast.error(data.message);
        }
      } else {
        // Corrected this condition from 'Sign Up' to 'Login'
        if (state === 'Login') {
          const { data } = await axios.post(backendUrl + '/api/user/login', {
            email, password
          });

          if (data.success) {
            localStorage.setItem('token', data.token);
            setToken(data.token);
          } else {
            toast.error(data.message);
          }
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(()=>{
    if(token){
      navigate('/')
    }
  },[token])

  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 rounded-xl text-zinc-600 text-sm shadow-lg'>
        <p className='text-2xl font-semibold'>{state === 'Sign Up' ? "Create Account" : "Login"}</p>
        <p>Please {state === 'Sign Up' ? "Sign Up" : "Log in"} to Book Your Slot</p>
        {state === "Sign Up" &&
          <div className='w-full'>
            <p>Full Name</p>
            <input type="text" className='border border-zinc-300 rounded w-full p-2 mt-1' required onChange={(e) => setName(e.target.value)} value={name} />
          </div>
        }
        <div className='w-full'>
          <p>Email</p>
          <input type="email" className='border border-zinc-300 rounded w-full p-2 mt-1' required onChange={(e) => setEmail(e.target.value)} value={email} />
        </div>
        <div className='w-full'>
          <p>Password</p>
          <input type="password" className='border border-zinc-300 rounded w-full p-2 mt-1' required onChange={(e) => setPassword(e.target.value)} value={password} />
        </div>
        <button type='submit' className='bg-primary cursor-pointer text-white w-full py-2 rounded-md text-base '>
          {state === 'Sign Up' ? "Create Account" : "Log in"}
        </button>
        <p>
          {state === 'Sign Up' ?
            <span>Already Have An Account? <span className='text-primary cursor-pointer underline' onClick={() => setState('Login')}> Login Here</span></span>
            :
            <span>Create A New Account? <span className='text-primary cursor-pointer underline' onClick={() => setState('Sign Up')}>Click Here</span></span>
          }
        </p>
      </div>
    </form>
  );
}

export default Login;
