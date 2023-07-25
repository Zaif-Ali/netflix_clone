import { Schema, model, models } from 'mongoose';
import bcrypt from 'bcrypt';
import { IAccountSchema } from './types/ModalTypes';


const accountSchema = new Schema<IAccountSchema>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    region: { type: String },
    profiles: [{ type: Schema.Types.ObjectId, ref: 'Profiles' }],

}, {
    timestamps: true, toJSON: {
        transform: function (_doc, ret) {
            delete ret.password;
        },
    },
});


accountSchema.pre<IAccountSchema>('save', async function (next) {
    const member = this;

    if (!member.isModified('password')) {
        return next();
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(member.password, salt);
        member.password = hashedPassword;
        return next();
    } catch (error: unknown) {
        return next(error as Error);
    }
});

export default models.Accounts || model<IAccountSchema>('Accounts', accountSchema);

