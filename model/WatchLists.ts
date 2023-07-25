import { Document, Schema, model, models } from 'mongoose';
import { IWishlistSchema } from './types/ModalTypes';

const wishlistSchema = new Schema<IWishlistSchema>({
    profileId: { type: Schema.Types.ObjectId, ref: 'Profiles', required: true },
    movieId: { type: Schema.Types.ObjectId, ref: 'Movies', required: true },
});


export default models.Wishlists || model<IWishlistSchema>('Wishlists', wishlistSchema);