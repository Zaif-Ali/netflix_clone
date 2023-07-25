import { Document, Schema, model, models } from 'mongoose';
import { IProfileSchema } from './types/ModalTypes';




const profileSchema = new Schema<IProfileSchema>({
    name: { type: String, required: true },
    avatar: { type: String },
    pin: { type: String },
    accountId: { type: Schema.Types.ObjectId, ref: 'Accounts', required: true },
    wishlist: [{ type: Schema.Types.ObjectId, ref: 'Wishlists' }],
});

export default models.Profiles || model<IProfileSchema>('Profiles', profileSchema);
