import { Module } from '@nestjs/common';
import { BandsController } from './bands.controller';
import { BandsService } from './bands.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BandSchema } from './band.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Band', schema: BandSchema }]),
  ],
  controllers: [BandsController],
  providers: [BandsService]
})
export class BandsModule {}
