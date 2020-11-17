import { Injectable, NotFoundException } from '@nestjs/common';
import { Band } from './band.model';
import { InjectModel} from '@nestjs/mongoose';
import { Model} from 'mongoose';

@Injectable()
export class BandsService {
    constructor(
        @InjectModel('Band') private readonly bandModel: Model<Band>,
      ) {}
    
    async addBand(name: string, genre: string, picture: string) {
        const newBand = new this.bandModel({
            name,
            genre,
            picture,
        });
        const res = await newBand.save();
        return res;
    }

    async getAllBands() {
        const bands = await this.bandModel.find().exec();
        return bands.map(band => ({
            id: band.id,
            name: band.name,
            genre: band.genre,
            picture: band.picture,
        }));
    }

    async getSingleBand(bandId: string) {
        const band = await this.findBand(bandId);
        return {
            id: band.id,
            name: band.name,
            genre: band.genre,
            picture: band.picture,
        };
    }

    async updateBand(
      bandId: string,
      name: string,
      genre: string,
      picture: string,
    ) {
      const updatedBand = await this.findBand(bandId);

      if(name) {
        updatedBand.name = name;
      }
      if(genre) {
        updatedBand.genre = genre;
      }
      if(picture) {
        updatedBand.picture = picture;
      }
      updatedBand.save();
    }

    async deleteBand(bandId: string) {
        const res = await this.bandModel.deleteOne({_id: bandId}).exec();
        if (res.n === 0) {
            throw new NotFoundException('Could not find band.');
        }
    }
    
    private async findBand(id: string): Promise<Band> {
      let band;
      try {
        band = await this.bandModel.findById(id).exec();
      } catch (error) {
        throw new NotFoundException('Could not find band.');
      }
      if (!band) {
        throw new NotFoundException('Could not find band.');
      }
      return band;
    }

}
