import dbConnect from "@/config/connection";
import { isVerified } from "@/lib";
import Profiles from "@/model/Profiles";
import { NextRequest, NextResponse } from "next/server";


export interface exportProfiles {
    "_id" : string,
    "name": string,
    "avatar": string
}

export interface typeresponse {

    "profiles": exportProfiles[]   
    "success": boolean
}



export async function GET(request: NextRequest) {
    const user: any = await isVerified(request)

    if (user) {
        await dbConnect();
        // Assuming the user object has a `profiles` array containing profile IDs
        const profileIds = user.user.profiles;

        // Fetch the profile data from the database using the profile IDs
        const profiles : exportProfiles[] = await Profiles.find({ _id: { $in: profileIds } }).select('name avatar _id');

        const response: typeresponse = { profiles: profiles, success: true }
        return NextResponse.json(response, { status: 200 });
    }
    return NextResponse.json({ success: false, profiles: null }, { status: 404 });
}