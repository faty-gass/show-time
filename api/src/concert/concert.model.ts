import * as Mongoose from 'mongoose';

export const ConcertSchema = new Mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    bands: { type: [String], required: true },
    date: { type: Date, required: true },
    place: { type: String, required: true },
    capacity: { type: Number, required: true },
    seats: { type: Number },
    price: { type: Number, required: true },
    genres: { type: [String], required: true },
    picture: { type: String }

});

export interface Concert extends Mongoose.Document {
    id: string;
    title: string;
    description: string;
    bands: [string];
    date: Date;
    place: string;
    capacity: number;
    seats: number;
    price: number;
    genres: [string];
    picture: string;
}