import dbConnect from "@/config/connection";
import { getJwtSecretKey, isVerified } from "@/lib";
import Profiles from "@/model/Profiles";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt'
import { SignJWT } from "jose";
import { IProfileSchema } from "@/model/types/ModalTypes";

export async function POST(request: NextRequest) {
    const { profileid, profileOTP } = await request.json();
    if (profileOTP === undefined || profileid === undefined || profileOTP === '' || profileid === '') {
        return NextResponse.json({ error: "Invalid input", success: false }, { status: 400 })
    }
    const user: any = await isVerified(request)
    if (!user) {

        return NextResponse.json({ error: "Internal Server Error", success: false }, { status: 500 })
    }
    await dbConnect();
    const profile: IProfileSchema | null = await Profiles.findById(profileid)
    if (profile === null) {
        return NextResponse.json({ error: "Invalid pin", success: false, profileOTP }, { status: 400 })
    }
    const profilepin = profile.pin;
    const res = await bcrypt.compare(profileOTP, profilepin);
    
    if (!res) {
        return NextResponse.json({ error: "Invalid pin", success: false , profileOTP}, { status: 400 })
    }


    // JWT Token Creation
    const payload = {
        userid: user._id,
        profileid,

    }


    const token = await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("10m")
        .sign(getJwtSecretKey());


    const response = NextResponse.json(
        { success: true },
        { status: 200 })

    response.cookies.set({
        name: "profile-token",
        value: token,
        path: "/",
    });

    return response


}