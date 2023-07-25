import { getMovies_Collec } from "@/lib/api/_basic";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export async function GET(request: NextApiRequest) {
    const Movies = await getMovies_Collec()
    const movies = await Movies?.find({}).toArray()

    return NextResponse.json({
        message: "Hello",
        movies
    })
}