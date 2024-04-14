"use client"

import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"

export default function VerifyEmail(){

    // const router = useRouter()
    const [token,setToken] = useState("")
    const [verified, setVerified] = useState(false)
    const [error, setError] = useState(false)

    const verifyUserEmail = async () => {
        try {
            await axios.post("/api/users/verifyEmail",{token})
            setVerified(true)
        } catch (error:any) {
            setError(error.response.data)
            console.log(error)
        }
    }
    useEffect(() => {
        setError(false)
        const urlToken = window.location.search.split("=")[1]
        setToken(urlToken || "")

        // next js utilization of extracting the token form the url
        // const {query} = router
        // const urlTokenTwo = query.token
        // setToken(urlToken || "")
    },[])

    useEffect(() => {
        setError(false)
        if (token.length > 0) {
            verifyUserEmail()
        }
    },[token])

    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl">Verify Email</h1>
            <h2 className="p-2 bg-orange-500 text-black">
                {token ? `${token}` : "no token"}
            </h2>
            {verified && (
                <div>
                    <h2>Verified</h2>
                    <Link className="text-blue-500 hover:text-blue-700" href="/login"> Go To Login page</Link>
                </div>
            )}
            {error && (
                <div>
                    <h2>Got Error</h2>
                </div>
            )}
        </div>
    )
}