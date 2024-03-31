
import { connectToDb } from '@/dbConnection/dbConnection'
import User from '@/models/user.model'
import { NextRequest, NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

connectToDb()
export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        console.log('reqBody>>>>', reqBody)
        const { email, password } = reqBody
        // check user exist or not
        const user = await User.findOne({ email })
        if (!user) {
            return NextResponse.json({ error: "User not exist with the given email" }, { status: 400 })
        }
        console.log('check user exist or not>>>>>', user)
        // now check password correct or not
        const validPassword = await bcryptjs.compare(password, user.password)

        if (!validPassword) {
            return NextResponse.json({ error: "Incorrect entered password" }, { status: 400 })
        }

        const payload = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        const token = jwt.sign(payload, process.env.TOKEN_SECRET!, { expiresIn: '1d' })
        const response = NextResponse.json({
            message: "Logged In successfully",
            success: true
        })
        response.cookies.set("token", token, {
            httpOnly: true
        })
        return response

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}