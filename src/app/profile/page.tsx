'use client'
import React, { useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'

function ProfilePage () {
  const router = useRouter()
  const [data, setData] = useState('nothing')
  console.log('data>>>of profile>>>>', data)

  const getUserDetails = async () => {
    const res = await axios.get('/api/users/profile')
    console.log('res data>>>', res)
    setData(res.data.data._id)
  }
  const logout = async () => {
    try {
      await axios.get('/api/users/logout')
      toast.success('logout successfully')
      router.push('/login')
    } catch (error: any) {
      console.log(error.message)
      toast.error(error.message)
    }
  }
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1>Profile page</h1>
      <hr />
      <h2>
        {data === 'nothing' ? (
          'Noting'
        ) : (
          <Link href={`/profile/${data}`}>{data}</Link>
        )}
      </h2>
      <hr />
      <button
        className='bg-blue-400 mb-10 px-8 py-2 rounded-md'
        onClick={logout}
      >
        Logout
      </button>
      <button
        className='bg-green-400 mb-10 px-8 py-2 rounded-md'
        onClick={getUserDetails}
      >
        User Details
      </button>
    </div>
  )
}

export default ProfilePage
