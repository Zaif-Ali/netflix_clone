import dbConnect from "@/config/connection";
import Movies from "@/model/Movies";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, params: any) {
    try {

        let { movieid } = params;


        // if (!movieid) {
        //     throw new Error('Missing Id');
        // }
        movieid = params.params.movieid[0]
        await dbConnect()
        const movies = await Movies.findById(movieid)


        return NextResponse.json({ movies }, { status: 200 });

    } catch (error: any) {

        return NextResponse.json({
            success: false,
            error: error.message,

        });
    }
}