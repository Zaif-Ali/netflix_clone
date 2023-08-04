import { isProfileVerified, isVerified } from "@/lib"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
    const user = await isVerified(request)
    const Loginprofile = await isProfileVerified(request)
    if (user && Loginprofile) {
        const { profile } = Loginprofile
        return NextResponse.json(profile)
    }

    return NextResponse.json({ suucess: false })
}