import { Controller, Post, Body, Get, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { ConcertService } from './concert.service';
import { hasRoles } from 'src/auth/roles.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guards';

@Controller('concerts')
export class ConcertController {
    constructor(private readonly concertService: ConcertService) {

    }
    @hasRoles('admin')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post('admin')   // pour admin
    async addConcerts(@Body('title') title: string,
        @Body('description') description: string,
        @Body('bands') bands: [string],
        @Body('date') date: Date,
        @Body('place') place: string,
        @Body('capacity') capacity: number,
        @Body('price') price: number,
        @Body('genres') genres: [string],
        @Body('picture') picture: string
    ) {
        const result = await this.concertService.createConcert(title, description, bands, date, place, capacity, price, genres, picture);
        return { id: result };
    }

    ////////////// 


    @Get('admin')  // pour admin
    async showAllConcertAdmin() {
        const result = await this.concertService.showAll();
        return result;
    }

    @Get()  // pour utilisateur simple
    async showAllConcert() {
        const result = await this.concertService.showAll();
        return result;
    }

    ////////////// 


    @Get('/:id')  // pour utilisateur simple
    async showOneConcert(@Param('id') concertId: string) {
        const result = await this.concertService.showOne(concertId);
        return result;
    }

    @Get('admin/:id')  // pour admin
    async showOneConcertAdmin(@Param('id') concertId: string) {
        const result = await this.concertService.showOne(concertId);
        return result;
    }

    ////////////// 
    @hasRoles('admin')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Patch('admin/:id')   // pour admin
    async updateConcert(@Param('id') concertId: string,
        @Body('title') title: string,
        @Body('description') description: string,
        @Body('bands') bands: [string],
        @Body('date') date: Date,
        @Body('place') place: string,
        @Body('capacity') capacity: number,
        @Body('price') price: number,
        @Body('genres') genres: [string],
        @Body('picture') picture: string
    ) {
        const result = await this.concertService.update(concertId, title, description, bands, date, place, capacity, price, genres, picture);
        return result;
    }
    @hasRoles('admin')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete('admin/:id')   // pour admin
    async deleteConcert(@Param('id') concertId) {
        const result = await this.concertService.delete(concertId);
        return { message: result };
    }

    @Get('search/:txt')
    async searchConcert(@Param('txt') txt) {
        const res = await this.concertService.searchFull(txt);
        return res;
    }

    @Get('band/search/:txt')
    async searchConcertByBand(@Param('txt') txt) {
        const res = await this.concertService.searchBand(txt);
        return res;
    }

    @Get('genre/search/:txt')
    async searchConcertByGenre(@Param('txt') txt) {
        const res = await this.concertService.searchGenre(txt);
        return res;
    }

    @Get('place/search/:txt')
    async searchConcertByPlace(@Param('txt') txt) {
        const res = await this.concertService.searchPlace(txt);
        return res;
    }

    @Get('date/search/:txt')
    async searchConcertByDate(@Param('txt') txt) {
        const res = await this.concertService.searchDate(txt);
        return res;
    }

}
