import dbConnect from "@/config/connection";
import { isVerified } from "@/lib";
import Profiles from "@/model/Profiles";
import { NextRequest, NextResponse } from "next/server";



export interface typeresponse {

    "profiles":
    {
        "name": string,
        "avatar": string
    }[],
    "success": boolean
}



export async function GET(request: NextRequest) {
    const user: any = await isVerified(request)

    if (user) {
        await dbConnect();
        // Assuming the user object has a `profiles` array containing profile IDs
        const profileIds = user.user.profiles;

        // Fetch the profile data from the database using the profile IDs
        const profiles = await Profiles.find({ _id: { $in: profileIds } }).select('name avatar');

        const response: typeresponse = { profiles: profiles, success: true }
        return NextResponse.json(response, { status: 200 });
    }
    return NextResponse.json({ success: false, profiles: null }, { status: 404 });
}