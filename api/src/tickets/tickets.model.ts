import * as Mongoose from 'mongoose';


export const TicketSchema = new Mongoose.Schema({
    user_id: { type: Mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    concert_id: { type: Mongoose.Schema.Types.ObjectId, ref: 'Concert', required: true },
    qr_code: { type: String, required: true }
});

export interface Ticket extends Mongoose.Document {
    id: string;
    user_id: Mongoose.Schema.Types.ObjectId;
    concert_id: Mongoose.Schema.Types.ObjectId;
    qr_code: string;
}
