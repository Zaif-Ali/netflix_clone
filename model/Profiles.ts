import {  Schema, model, models } from 'mongoose';
import { IProfileSchema } from './types/ModalTypes';
import bcrypt from 'bcrypt';




const profileSchema = new Schema<IProfileSchema>({
    name: { type: String, required: true },
    avatar: { type: String },
    pin: { type: String },
    accountId: { type: Schema.Types.ObjectId, ref: 'Accounts', required: true },
    wishlist: [{
        type: String,
        default: []
    }],
}, {
    timestamps: true,
    toJSON: {
        transform: function (_doc, ret) {
            delete ret.pin
        },
    },
});

profileSchema.pre<IProfileSchema>('save', async function (next) {
    const member = this;
    if (!member.isModified('pin')) {
        return next();
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(member.pin, salt);
        member.pin = hashedPassword;
        return next();
    } catch (error: unknown) {
        return next(error as Error);
    }
})

export default models.Profiles || model<IProfileSchema>('Profiles', profileSchema);
