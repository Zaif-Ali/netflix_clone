import dbConnect from "@/config/connection";
import Movies from "@/model/Movies";

import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export async function GET(request: NextApiRequest) {
    try {

        await dbConnect()
        const movies = await Movies.find()

        return NextResponse.json({movies});

    } catch (error: any) {

        return NextResponse.json({
            success: false

        });
    }
}