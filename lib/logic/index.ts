import Profiles from "@/model/Profiles";
import { IProfile } from "@/model/types/ModalTypes";
import { Schema } from "mongoose";

const images = [
    "/images/default-blue.png",
    "/images/default-red.png",
    "/images/default-slate.png",
    "/images/default-green.png",
  ];
  

export const MakeProfiles = async (accountId: Schema.Types.ObjectId, noOfProfiles: number = 4) => {
    const seriesOfProfiles : IProfile[]= []
    for (let index = 0; index < noOfProfiles; index++) {
        seriesOfProfiles.push({
            name: `profile ${index}`,
            accountId,
            wishlist : [],
            pin : "1111",
            avatar : images[index]
        })
    }
    const profiles = await Promise.all(seriesOfProfiles.map((profileData) => Profiles.create(profileData)));
    return profiles
}