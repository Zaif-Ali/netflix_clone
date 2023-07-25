import dbConnect from "@/config/connection";
import Accounts from "@/model/Accounts";
import Profiles from "@/model/Profiles";
import { IAccount, IAccountSchema, IProfile, IProfileSchema } from "@/model/types/ModalTypes";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export async function GET(request: NextApiRequest) {
    try {
        await dbConnect()

        const newAccountData : IAccount = {
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: 'hashedPassword', // Replace with the actual hashed password
            region: 'US',
            profiles: [],
        }

        const newAccount : IAccountSchema = await Accounts.create(newAccountData);

        // Create three profiles for the new Account
        const profileData  : IProfile = {
            name: 'Profile 1',
            avatar: 'profile1.jpg',
            pin: '1234',
            accountId: newAccount._id,
            wishlist: [],
        };


        const profile1 : IProfileSchema = await Profiles.create(profileData);

        profileData.name = 'Profile 2';
        const profile2 : IProfileSchema = await Profiles.create(profileData);

        profileData.name = 'Profile 3';
        const profile3 : IProfileSchema = await Profiles.create(profileData);

        // Add profile references to the account
        newAccount.profiles.push(profile1._id, profile2._id, profile3._id);
        await newAccount.save();

        return NextResponse.json({
            message: 'Hello',
            account: newAccount,
            profiles: [profile1, profile2, profile3],
        });

    } catch (error: any) {
        console.error('Error creating account and profiles:', error);
        return NextResponse.error();
    }
}