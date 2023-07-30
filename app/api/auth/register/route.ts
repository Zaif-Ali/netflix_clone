import dbConnect from "@/config/connection";
import { MakeProfiles } from "@/lib/logic";
import Accounts from "@/model/Accounts";
import { IAccount } from "@/model/types/ModalTypes";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {

    const { username, email, password } = await request.json()
    try {
        await dbConnect()

        const user = await Accounts.findOne({ email })
        if (user) {
            return NextResponse.json({ er: "User Already exist" }, { status: 400 })
        }
      
        // create new account  and then we have to create his profiles by default we create 4 profiles of every account futher we control this by 
        // user payment pkg 

        // Create a new Account
        const newAccountData: IAccount = {
            username,
            email,
            password,
            region: request.cookies.get('region')?.value as string,
            profiles: [],
        };
        const account = await Accounts.create(newAccountData)

        // make profiles
        const profiles = await MakeProfiles(account._id);
        // add profiles id in the account.profiles array
        account.profiles = profiles.map((profile) => profile._id);
        await account.save();

        return NextResponse.json({
            account,
            profiles
        }, {
            status: 200
        })

    } catch (error) {
        return NextResponse.json(error)
    }


}

