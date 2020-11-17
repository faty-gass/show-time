import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Concert } from './concert.model';


@Injectable()
export class ConcertService {

    constructor(@InjectModel('Concert') private readonly concertModel: Model<Concert>) {
    }

    async createConcert(title: string,
        description: string,
        bands: [string],
        date: Date,
        place: string,
        capacity: number,
        price: number,
        genres: [string],
        picture: string) {
        const seats = capacity;
        const newConcert = new this.concertModel({ title, description, bands, date, place, capacity, seats, price, genres, picture });
        const result = await newConcert.save();
        return result.id;
    }

    async showAll() {
        const result = await this.concertModel.find().exec();
        return result.map(c => ({
            id: c.id,
            title: c.title,
            description: c.description,
            bands: c.bands,
            date: c.date,
            place: c.place,
            capacity: c.capacity,
            seats: c.seats,
            price: c.price,
            genres: c.genres,
            picture: c.picture
        }));
    }

    async showOne(concertId: string) {
        const concert = await this.findConcert(concertId);
        return {
            id: concert.id,
            title: concert.title,
            description: concert.description,
            bands: concert.bands,
            date: concert.date,
            place: concert.place,
            capacity: concert.capacity,
            seats: concert.seats,
            price: concert.price,
            genres: concert.genres,
            picture: concert.picture

        }
    }



    async update(concertId: string,
        title: string,
        description: string,
        bands: [string],
        date: Date,
        place: string,
        capacity: number,
        price: number,
        genres: [string],
        picture: string) {
        const result = await this.findConcert(concertId);
        if (title) {
            result.title = title;
        }
        if (description) {
            result.description = description;
        }
        if (bands) {
            result.bands = bands;
        }
        if (date) {
            result.date = date;
        }
        if (place) {
            result.place = place;
        }
        if (capacity) {
            result.capacity = capacity;
        }
        if (price) {
            result.price = price
        }
        if (genres) {
            result.genres = genres
        }
        if (picture) {
            result.picture = picture
        }
        result.save();
        return {
            id: result.id,
            title: result.title,
            description: result.description,
            bands: result.bands,
            date: result.date,
            place: result.place,
            capacity: result.capacity,
            seats: result.seats,
            price: result.price,
            genres: result.genres,
            picture: result.picture
        };
    }

    async delete(concertId: string) {
        const result = await this.concertModel.deleteOne({ _id: concertId }).exec();
        if (result.deletedCount === 0) {
            throw new NotFoundException('Concert not found');
        } else {
            return "Concert successfully deleted"
        }
    }


    private async findConcert(id: string) {
        const concert = await this.concertModel.findById(id);
        if (!concert) {
            throw new NotFoundException('Concert not found');
        }
        return concert;

    }

    async searchFull(txt: string) {
        const result = await this.concertModel.find({
            $or: [
                { bands: { $regex: '.*' + txt + '.*', $options: 'i' } },
                { genres: { $regex: '.*' + txt + '.*', $options: 'i' } },
                { title: { $regex: '.*' + txt + '.*', $options: 'i' } },
                { place: { $regex: '.*' + txt + '.*', $options: 'i' } },
            ]
        }).sort({ date: 1, place: 1 });

        return result;
    }

    async searchBand(txt: string) {
        const result = await this.concertModel.find({
            bands: { $regex: '.*' + txt + '.*', $options: 'i' },
        }).sort({ bands: 1 });

        return result;
    }

    async searchGenre(txt: string) {
        const result = await this.concertModel.find({
            genres: { $regex: '.*' + txt + '.*', $options: 'i' },
        }).sort({ genres: 1 });

        return result;
    }

    async searchPlace(txt: string) {
        const result = await this.concertModel.find({
            place: { $regex: '.*' + txt + '.*', $options: 'i' },
        }).sort({ place: 1 });

        return result;
    }

    async searchDate(txt: string) {
        const d = txt.slice(0, 10).split("-");
        const result = await this.concertModel.find({
            date: { "$gte": new Date(Number(d[0]), Number(d[1]) - 1, Number(d[2])), "$lt": new Date(Number(d[0]), Number(d[1]) - 1, Number(d[2]) + 1) },
        }).sort({ searchDate: 1 });

        return result;
    }

}