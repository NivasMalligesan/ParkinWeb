import React, { useContext, useState, useEffect } from 'react'
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
      // Create axios instance with CORS headers
      const axiosInstance = axios.create({
        baseURL: backendUrl,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      });

      if (state === 'Sign Up') {
        const { data } = await axiosInstance.post('/api/user/register', {
          name: name.trim(),
          email: email.toLowerCase().trim(),
          password: password
        });

        if (data.success) {
          localStorage.setItem('token', data.token);
          setToken(data.token);
          toast.success("🎉 Account created successfully!");
          // Store user data if returned
          if (data.user) {
            localStorage.setItem('userData', JSON.stringify(data.user));
          }
        } else {
          toast.error(data.message || "Registration failed");
        }
      } else {
        const { data } = await axiosInstance.post('/api/user/login', {
          email: email.toLowerCase().trim(),
          password: password
        });

        if (data.success) {
          localStorage.setItem('token', data.token);
          setToken(data.token);
          toast.success("✅ Login successful!");
        } else {
          toast.error(data.message || "Login failed");
        }
      }
    } catch (error) {
      console.error("API Error Details:", error);
      
      // Enhanced error handling
      let errorMessage = "Something went wrong. Please try again.";
      
      if (error.response) {
        // The request was made and the server responded with a status code
        console.log("Error Response Data:", error.response.data);
        console.log("Error Status:", error.response.status);
        
        if (error.response.status === 400) {
          errorMessage = error.response.data?.message || "Invalid input data";
        } else if (error.response.status === 401) {
          errorMessage = "Invalid email or password";
        } else if (error.response.status === 404) {
          errorMessage = "API endpoint not found. Please check backend server.";
        } else if (error.response.status === 409) {
          errorMessage = error.response.data?.message || "User already exists";
        } else if (error.response.status === 500) {
          errorMessage = "Server error. Please try again later.";
        } else {
          errorMessage = error.response.data?.message || `Error ${error.response.status}`;
        }
      } else if (error.request) {
        // The request was made but no response was received
        console.log("Error Request:", error.request);
        errorMessage = "Network error. Please check your internet connection and backend server.";
      } else {
        // Something happened in setting up the request
        errorMessage = error.message || "Request configuration error";
      }
      
      toast.error(`❌ ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token, navigate]);

  // Clear form when switching between login/register
  const handleStateChange = (newState) => {
    setState(newState);
    setName('');
    setEmail('');
    setPassword('');
  };

  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col gap-4 m-auto items-start p-8 min-w-[340px] sm:min-w-96 rounded-xl text-zinc-600 text-sm shadow-lg bg-white'>
        <div className='w-full text-center'>
          <h1 className='text-3xl font-bold text-gray-800 mb-2'>PARKin</h1>
          <p className='text-2xl font-semibold text-gray-700'>{state === 'Sign Up' ? "Create Account" : "Welcome Back"}</p>
          <p className='text-gray-500 mt-1'>Please {state === 'Sign Up' ? "Sign Up" : "Log in"} to Book Your Slot</p>
        </div>
        
        {state === "Sign Up" && (
          <div className='w-full'>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Full Name</label>
            <input 
              type="text" 
              className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all' 
              required 
              onChange={(e) => setName(e.target.value)} 
              value={name} 
              disabled={isLoading}
              placeholder="Enter your full name"
              minLength="2"
              maxLength="50"
            />
          </div>
        )}
        
        <div className='w-full'>
          <label className='block text-sm font-medium text-gray-700 mb-1'>Email Address</label>
          <input 
            type="email" 
            className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all' 
            required 
            onChange={(e) => setEmail(e.target.value)} 
            value={email} 
            disabled={isLoading}
            placeholder="Enter your email"
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
          />
        </div>
        
        <div className='w-full'>
          <label className='block text-sm font-medium text-gray-700 mb-1'>Password</label>
          <input 
            type="password" 
            className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all' 
            required 
            onChange={(e) => setPassword(e.target.value)} 
            value={password} 
            disabled={isLoading}
            placeholder="Enter your password"
            minLength="8"
          />
          <p className='text-xs text-gray-500 mt-2'>
            Password must be at least 8 characters long
            {state === 'Sign Up' && ', containing letters and numbers'}
          </p>
        </div>
        
        <button 
          type='submit' 
          className='w-full bg-primary hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-2'
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
              </svg>
              {state === 'Sign Up' ? "Creating Account..." : "Logging in..."}
            </span>
          ) : (
            state === 'Sign Up' ? "Create Account" : "Log in"
          )}
        </button>
        
        <div className='w-full text-center pt-4 border-t border-gray-200'>
          <p className='text-gray-600'>
            {state === 'Sign Up' ? (
              <span>
                Already have an account?{' '}
                <button 
                  type="button"
                  className='text-primary font-semibold hover:underline focus:outline-none'
                  onClick={() => handleStateChange('Login')}
                  disabled={isLoading}
                >
                  Login Here
                </button>
              </span>
            ) : (
              <span>
                Don't have an account?{' '}
                <button 
                  type="button"
                  className='text-primary font-semibold hover:underline focus:outline-none'
                  onClick={() => handleStateChange('Sign Up')}
                  disabled={isLoading}
                >
                  Sign Up Here
                </button>
              </span>
            )}
          </p>
        </div>

        {/* Debug info - remove in production */}
        <div className='w-full text-xs text-gray-400 mt-4 p-2 bg-gray-50 rounded'>
          <p>Backend URL: {backendUrl}</p>
          <p>API Endpoint: {state === 'Sign Up' ? '/api/user/register' : '/api/user/login'}</p>
        </div>
      </div>
    </form>
  );
}

export default Login;