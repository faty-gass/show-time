import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TicketSchema } from './tickets.model';
import { TicketsService } from './tickets.service';
import { TicketsController } from './tickets.controller';
import { ConcertModule } from 'src/concert/concert.module';
import { UsersModule } from 'src/users/users.module';

@Module({
    imports: [ConcertModule, UsersModule, MongooseModule.forFeature([{ name: 'Ticket', schema: TicketSchema }])],
    controllers: [
        TicketsController,],
    providers: [
        TicketsService,],
})
export class TicketsModule { }
