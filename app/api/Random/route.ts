import Movies from "@/model/Movies";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const movieCount = await Movies.count()
    const randomIndex = Math.floor(Math.random() * movieCount)
    const randomMovie = await Movies.find().skip(randomIndex).limit(1)

    return NextResponse.json({ success: true, movie: randomMovie[0] }, { status: 200 })

}