import { Document, Schema, model, models } from 'mongoose';
import { IMovieSchema } from './types/ModalTypes';


const movieSchema = new Schema<IMovieSchema>({
    name: { type: String, required: true },
    video: { type: String, required: true },
    genre: { type: String },
});


export default models.Movies || model<IMovieSchema>('Movies', movieSchema);
