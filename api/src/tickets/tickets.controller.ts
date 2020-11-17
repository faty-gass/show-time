import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import * as Mongoose from 'mongoose';

@Controller('tickets')
export class TicketsController {
    constructor(private readonly ticketService: TicketsService) { }

    @Post()
    async addTickets(
        @Body('user_id') user_id: Mongoose.Schema.Types.ObjectId,
        @Body('concert_id') concert_id: Mongoose.Schema.Types.ObjectId,
        @Body('qr_code') qr_code: string
    ) {
        const newTicket = await this.ticketService.createTicket(
            user_id,
            concert_id,
            qr_code
        );
        return { "new ticket created": newTicket };
    }

    @Get()
    async showAllTickets() {
        const allTickets = await this.ticketService.showAll();
        return allTickets;
    }

    @Get(':id')
    async showOneTicket(@Param('id') ticketId: Mongoose.Schema.Types.ObjectId) {
        const oneTicket = await this.ticketService.showOne(ticketId);
        return oneTicket;
    }

    @Get('concert-count/:id')
    async concertAvailableSeat(@Param('id') concertId: Mongoose.Schema.Types.ObjectId) {
        const availableSeats = await this.ticketService.getSeats(concertId);
        return { seatsLeft: availableSeats };
    }

    @Get('user/:userId')
    async getUserTickets(@Param('userId') userId: Mongoose.Schema.Types.ObjectId) {
        const tickets = await this.ticketService.showUserTickets(userId);
        return tickets;
    }

    @Delete(':id')
    async deleteTicket(@Param('id') ticketId: string) {
        const deletedTicket = await this.ticketService.delete(ticketId);
        return deletedTicket;
    }
}
