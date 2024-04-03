import { connectToDb } from '@/dbConnection/dbConnection'
import User from '@/models/user.model'
import { NextRequest, NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { getDataFromToken } from '@/helpers/getDatatFromToken'

connectToDb()
export async function GET(request: NextRequest) {
    // extract data form token
  const userId = await getDataFromToken(request)
  const user = await User.findOne({_id:userId}).select("-password")
  // check if user not exist
  if(!user){
    throw new Error("Invalid token user not found")
  }
  return NextResponse.json({
    message:"user data retrieved successfully",
    data:user
  })
}