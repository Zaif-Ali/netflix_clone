import dbConnect from "@/config/connection";
import Accounts from "@/model/Accounts";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt'
import { SignJWT } from "jose";
import { getJwtSecretKey } from "@/lib";


export async function POST(request: NextRequest) {
    const { email, password } = await request.json();
    await dbConnect();
    const user = await Accounts.findOne({ email })
    if (!user) {
        return NextResponse.json({ er: "User Not exist", success: false }, { status: 404 })
    }
    const Matched = bcrypt.compareSync(password, user.password)
    if (!Matched) {
        return NextResponse.json({ er: "Incorrect Password", success: false }, { status: 400 })
    }
    // JWT Token Creation
    const payload = {
        id: user._id,
        email,
        user
    }


    const token = await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("60m")
        .sign(getJwtSecretKey());


    const response = NextResponse.json(
        { success: true },
        { status: 200 }
    );


    response.cookies.set({
        name: "user-token",
        value: token,
        path: "/",
    });

    return response
} 