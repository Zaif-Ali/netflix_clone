import dbConnect from "@/config/connection";
import Movies from "@/model/Movies";

import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
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