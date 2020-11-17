import * as Mongoose from 'mongoose';

export const BandSchema = new Mongoose.Schema({
    name: {type: String, required: true},   // <- make unique
    genre: {type: String, required: true},
    picture: String,
});

export interface Band extends Mongoose.Document {
    name: string;
    genre: string;
    picture: string;
}