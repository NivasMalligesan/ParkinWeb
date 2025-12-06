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
  const [isLoading, setIsLoading] = useState(false);
  
  const { token, setToken, backendUrl } = useContext(AppContext);
  const navigate = useNavigate()

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    
    try {
      if (state === 'Sign Up') {
        const { data } = await axios.post(`${backendUrl}/api/user/register`, {
          name, email, password
        });

        if (data.success) {
          localStorage.setItem('token', data.token);
          setToken(data.token);
          toast.success("Account created successfully!");
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(`${backendUrl}/api/user/login`, {
          email, password
        });

        if (data.success) {
          localStorage.setItem('token', data.token);
          setToken(data.token);
          toast.success("Login successful!");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      console.error("Login/Register error:", error);
      toast.error(error.response?.data?.message || error.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token])

  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 rounded-xl text-zinc-600 text-sm shadow-lg'>
        <p className='text-2xl font-semibold'>{state === 'Sign Up' ? "Create Account" : "Login"}</p>
        <p>Please {state === 'Sign Up' ? "Sign Up" : "Log in"} to Book Your Slot</p>
        
        {state === "Sign Up" &&
          <div className='w-full'>
            <p>Full Name</p>
            <input 
              type="text" 
              className='border border-zinc-300 rounded w-full p-2 mt-1' 
              required 
              onChange={(e) => setName(e.target.value)} 
              value={name} 
              disabled={isLoading}
            />
          </div>
        }
        
        <div className='w-full'>
          <p>Email</p>
          <input 
            type="email" 
            className='border border-zinc-300 rounded w-full p-2 mt-1' 
            required 
            onChange={(e) => setEmail(e.target.value)} 
            value={email} 
            disabled={isLoading}
          />
        </div>
        
        <div className='w-full'>
          <p>Password</p>
          <input 
            type="password" 
            className='border border-zinc-300 rounded w-full p-2 mt-1' 
            required 
            onChange={(e) => setPassword(e.target.value)} 
            value={password} 
            disabled={isLoading}
            minLength="8"
          />
          <p className='text-xs text-gray-500 mt-1'>Password must be at least 8 characters</p>
        </div>
        
        <button 
          type='submit' 
          className='bg-primary cursor-pointer text-white w-full py-2 rounded-md text-base disabled:opacity-50'
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
              </svg>
              Processing...
            </span>
          ) : (
            state === 'Sign Up' ? "Create Account" : "Log in"
          )}
        </button>
        
        <p className='text-center w-full'>
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