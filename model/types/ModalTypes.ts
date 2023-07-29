
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
    name: string;
    video: string;
    genre: string;
}
export interface IMovieSchema extends Document, IMovie {
}

export interface IProfile {
    name: string;
    avatar: string;
    pin: string;
    accountId: Schema.Types.ObjectId;
    wishlist: IWishlist[]
}

// Profile Schema
export interface IProfileSchema extends Document, IProfile { }

// Wishlist Schema
export interface IWishlist {
    profileId: Schema.Types.ObjectId;
    movieId: Schema.Types.ObjectId;
}
export interface IWishlistSchema extends Document, IWishlist {
}
