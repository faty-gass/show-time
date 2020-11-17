import { Injectable, NotFoundException, NotAcceptableException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ticket } from './tickets.model';
import * as Mongoose from 'mongoose';
import { User } from 'src/users/user.model';
import { Concert } from 'src/concert/concert.model';


@Injectable()
export class TicketsService {
    constructor(@InjectModel('Ticket') private ticketModel: Model<Ticket>,
        @InjectModel('Concert') private concertModel: Model<Concert>,
        @InjectModel('User') private userModel: Model<User>,
    ) {
    }
    async getSeats(concertId: Mongoose.Schema.Types.ObjectId) {
        const nbSeats = await this.concertModel.findOne({ _id: concertId }).exec();
        return nbSeats.seats;
    }
    async updateSeats(concertId: Mongoose.Schema.Types.ObjectId) {
        const nbSeats = await this.concertModel.findOne({ _id: concertId }).exec();
        nbSeats.seats--;
        nbSeats.save();
    }

    async createTicket(user_id: Mongoose.Schema.Types.ObjectId,
        concert_id: Mongoose.Schema.Types.ObjectId,
        qr_code: string) {
        const available = await this.getSeats(concert_id);
        if (available > 0) {
            this.updateSeats(concert_id);
            const newTicket = new this.ticketModel({ user_id, concert_id, qr_code });
            const result = await newTicket.save();
            return result.id;
        } else {
            throw new NotAcceptableException('The concert is sold out!');
        }

    }

    async showAll() {
        const result = await this.ticketModel.find();
        return result.map(t => ({
            id: t._id,
            user_id: t.user_id,
            concert_id: t.concert_id,
            qr_code: t.qr_code
        }));
    }

    async showOne(id: Mongoose.Schema.Types.ObjectId) {
        const result = await this.ticketModel.findOne({ _id: id })
            .populate('user_id').populate('concert_id').exec();
        //this.showUserTickets(result.user_id);
        return result;

    }

    async showUserTickets(id: Mongoose.Schema.Types.ObjectId) {
        const result = await this.ticketModel.find({ user_id: id })
            .populate('user_id').populate('concert_id')
            .exec(/* function (err, ticket) {
                if (err) {
                    throwError(err)
                } else {
                    console.log(ticket);
                    //return ticket;
                }
            } */)
        return result;
    }

    async delete(id: string) {
        const result = await this.ticketModel.deleteOne({ _id: id }).exec();
        if (result.deletedCount === 0) {
            throw new NotFoundException('Ticket not found');
        } else {
            return "Ticket successfully deleted"
        }
    }
}
