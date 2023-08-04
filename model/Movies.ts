import {  Schema, model, models } from 'mongoose';
import { IMovieSchema } from './types/ModalTypes';


const movieSchema = new Schema<IMovieSchema>({
    title: { type: String, required: true , unique : true },
    description: { type: String, required: true },
    thumbnailUrl: { type: String, required: true },
    videoUrl: { type: String, required: true },
    genre: { type: String , required: true},
    duration: { type: String , required: true },
});


export default models.Movies || model<IMovieSchema>('Movies', movieSchema);
