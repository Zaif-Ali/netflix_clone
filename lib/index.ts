import { jwtVerify } from "jose";
import { NextRequest } from "next/server";

export function getJwtSecretKey() {
    const secret = process.env.NEXTAUTH_SECRET;

    if (!secret) {
        throw new Error("JWT Secret key is not matched");
    }

    return new TextEncoder().encode(secret);
}

export async function verifyJwtToken(token: any) {
    try {
        const { payload } = await jwtVerify(token, getJwtSecretKey());
        return payload;
    } catch (error) {
        return null;
    }
}

export async function isVerified(request: NextRequest) {
    // Get token to check its verify or not
    const { cookies } = request;
    const { value: token } = cookies.get("user-token") ?? { value: null };
    const hasVerifiedToken = token && (await verifyJwtToken(token));
    return hasVerifiedToken
} 

export async function isProfileVerified(request: NextRequest) {
    // Get token to check its verify or not
    const { cookies } = request;
    const { value: token } = cookies.get("profile-token") ?? { value: null };
    const hasVerifiedToken = token && (await verifyJwtToken(token));
    return hasVerifiedToken
} 