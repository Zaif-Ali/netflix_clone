import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
    

    return NextResponse.json({
        message: 'Registered',
        reqc : request.cookies.getAll()
    }, {
        status: 200
    })
}

