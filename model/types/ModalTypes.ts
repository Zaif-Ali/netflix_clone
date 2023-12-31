
import { Document, Schema, model, models } from 'mongoose';

// Account Schema

export interface IAccount {
    username: string;
    email: string;
    password: string;
    region: string;
    profiles: IProfileSchema[];
}



export interface IAccountSchema extends Document, IAccount {

}

// Movie Schema
export interface IMovie {
    title: string;
    description: string;
    thumbnailUrl: string;
    videoUrl: string;
    genre: string;
    duration: string;
}
export interface IMovieSchema extends Document, IMovie {
}

export interface IProfile {
    name: string;
    avatar: string;
    pin: string;
    accountId: Schema.Types.ObjectId;
    wishlist: string[]
}

// Profile Schema
export interface IProfileSchema extends Document, IProfile { }
