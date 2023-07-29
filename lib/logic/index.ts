import Profiles from "@/model/Profiles";

export const MakeProfiles = async (accountId: string, noOfProfiles: number = 4) => {
    const seriesOfProfiles = []
    for (let index = 0; index < noOfProfiles; index++) {
        seriesOfProfiles.push({
            name: `profile ${index}`,
            accountId: accountId
        })
    }
    const profiles = await Promise.all(seriesOfProfiles.map((profileData) => Profiles.create(profileData)));
    return profiles
}