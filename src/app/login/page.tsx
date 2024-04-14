"use client"
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

export default function SignupPage() {
  const router = useRouter()
  const [user, setUser] = useState({
    email : "",
    password:""
  })
  const [buttonDisable, setButtonDisable] = useState(false)

  const [loading, setLoading] = useState(false)

  const onLogin = async () => {
    try {
      setLoading(true)
      const response = await axios.post("/api/users/login",user)
      console.log('signup success',response.data)
      router.push('/profile')
      
    } catch (error:any) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisable(false)
    }else{
      setButtonDisable(true)
    }
  },[user])

  return (
    <div className='flex flex-col items-center justify-center py-2 min-h-screen '> 
    <div className=" flex flex-col items-center justify-center border-2 border-green-300 p-4">
      <button className=' bg-green-400 mb-10 px-8 py-2 rounded-md'>{loading ? "Processing" : "Fill the form"}</button>
     <div className=' flex flex-col space-y-4 justify-center items-center w-auto'>
     <div className='space-x-3'>
     <label htmlFor="userName">Email</label>
      <input 
       className="appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      id='userName'
      value={user.email}
      onChange={(e) => setUser({...user, email:e.target.value})}
      placeholder='Email'
      type="text" />
     </div>
     <div className='space-x-3'>
     <label htmlFor="userName">Password</label>
      <input 
       className="appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      id='userName'
      value={user.password}
      onChange={(e) => setUser({...user, password:e.target.value})}
      placeholder='Password'
      type="password" />
     </div>
     <button onClick={onLogin} className='bg-green-400 mb-10 px-8 py-2 rounded-md'>
      {buttonDisable ? "can't Login" : "Login"}
     </button>
     <Link className="text-blue-500 hover:text-blue-700" href={'/login'}>Visit to signup page</Link>
     </div>
     </div>
    


    </div>
  )
}