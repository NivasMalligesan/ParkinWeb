import React, { useState } from 'react'

const Login = () => {
  const [state,setState] = useState('Sign Up');
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [name,setName] = useState('')

  const onSumbitHandler = async(event) =>{
    event.preventDefault()
  }

  return (
    <form action="" className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96  rounded-xl text-zinc-600 text-sm shadow-lg'>
        <p className='text-2xl font-semibold'>{state === 'Sign Up' ? "Create Account" : "Login"}</p>
        <p className=''>Please {state === 'Sign Up' ? "Sign Up" : "Log in"} to Book Your Slot </p>
        {
          state === "Sign Up" && 
        <div className='w-full'>
          <p>Full Name</p>
          <input type="text" className='border border-zinc-300 rounded w-full p-2 mt-1'  required onChange={(e) => setName} value={name}/>
        </div>
        
        }
        <div className='w-full'>
          <p>Email</p>
          <input type="email" className='border border-zinc-300 rounded w-full p-2 mt-1' required onChange={(e) => setEmail} value={email}/>
        </div>
        <div className='w-full'>
          <p>Password</p>
          <input type="password" className='border border-zinc-300 rounded w-full p-2 mt-1' required onChange={(e) => setPassword} value={password}/>
        </div>
        <button className='bg-primary text-white w-full py-2 rounded-md text-base '>{state === 'Sign Up' ? "Create Account" : "Log in"}</button>
        <p>{state === 'Sign Up' ? 
         <p>Already Have An Account ? <span className='text-primary cursor-pointer underline' onClick={()=>setState('Login')} > Login Here</span></p>    
        :<p>Create An New Account ? <span className='text-primary cursor-pointer underline' onClick={()=>setState('Sign Up')} >Click Here</span> </p>    
      }</p>
      </div>

    </form>
  )
}

export default Login