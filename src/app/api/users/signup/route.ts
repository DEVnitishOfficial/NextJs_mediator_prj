
import { connectToDb } from "@/dbConnection/dbConnection";
import User from "@/models/user.model"
import { NextRequest, NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'
import { sendEmail } from "@/helpers/mailer";

connectToDb()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        console.log('reqBody', reqBody)
        const { userName, email, password } = reqBody
        // validation
        const user = await User.findOne({ email })
        if (user) {
            return NextResponse.json({ error: "User already exist" }, { status: 400 })
        }
        const salt = await bcryptjs.genSaltSync(10)
        const hashedPassword = await bcryptjs.hash(password, salt)
        const newUser = new User({
            userName,
            email,
            password: hashedPassword
        })
        const savedUser = await newUser.save()
        console.log('savedUser', savedUser)

        // send verification email
        await sendEmail({email, emailType:'VERIFY',userId:savedUser._id})

        return NextResponse.json({
            message:"user registered successfully",
            success:true,
            savedUser
        })



    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}