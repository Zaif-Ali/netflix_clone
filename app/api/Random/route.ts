import Movies from "@/model/Movies";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const movieCount = await Movies.aggregate([{ $group: { _id: null, count: { $sum: 1 } } }])
    const totalMovies = await movieCount[0].count;
    const randomIndex =  Math.floor(Math.random() * totalMovies);

    const randomMovie = await Movies.aggregate([
        { $skip: randomIndex },
        { $limit: 1 }
    ]);

    return NextResponse.json({ success: true, movie: randomMovie[0] }, { status: 200 })
}