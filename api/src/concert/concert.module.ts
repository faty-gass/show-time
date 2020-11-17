import { Module } from '@nestjs/common';
import { ConcertService } from './concert.service';
import { ConcertController } from './concert.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ConcertSchema } from './concert.model';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Concert', schema: ConcertSchema }])],
    controllers: [ConcertController],
    providers: [ConcertService],
    exports: [ConcertService, MongooseModule]
})
export class ConcertModule { }
