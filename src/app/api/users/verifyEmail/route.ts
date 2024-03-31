
import { connectToDb } from '@/dbConnection/dbConnection'
import User from '@/models/user.model'
import {NextResponse } from 'next/server'


connectToDb()
export async function POST(request: NextResponse) {
    try {
        const reqBody = await request.json()
        const { token } = reqBody
        console.log('token', token)

        const user = await User.findOne({ verifyToken: token, verifyTokenExpiry: { $gt: Date.now() } })
        if(!user){
            return NextResponse.json({error:"Invalid token"},{status:400})
        }

        console.log('user>>>',user)

        user.isVarified = true
        user.verifyToken = undefined
        user.verifyTokenExpiry = undefined

        await user.save()

        return NextResponse.json({
            message:"User Email varified successfully",
            success:true,
        },
        {status:200})



    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}