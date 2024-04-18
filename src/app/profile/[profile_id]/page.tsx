

import React from 'react'

export default function page({params}:any) {
  return (
    <div className='flex flex-col justify-center items-center min-h-screen py-2'>
        <h1>Profile page</h1>
        <h2 className='bg-green-500 rounded text-4xl px-2 py-2'>{params.profile_id}</h2>
    </div>
  )
}