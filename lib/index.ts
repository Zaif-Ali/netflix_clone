import { jwtVerify } from "jose";

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
