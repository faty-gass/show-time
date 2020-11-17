import { Controller, Post, Body, Get, Param, Delete, Patch } from '@nestjs/common';
import { BandsService } from './bands.service';

@Controller('bands')
export class BandsController {
    constructor(private readonly bandsService: BandsService) {}

    @Post('admin')   // pour admin
    async addBand(
        @Body('name') name: string,
        @Body('genre') genre: string,
        @Body('picture') picture: string,
    ) {
        const newBand = await this.bandsService.addBand(
            name,
            genre,
            picture,
        );
        return {"new band successfully created": newBand};
    }

////////////// 

    @Get('admin')     // pour admin
    async getAllBandsAdmin() {
        const bands = await this.bandsService.getAllBands();
        return bands;
    }

    @Get()     // pour utilisateur simple
    async getAllBands() {
        const bands = await this.bandsService.getAllBands();
        return bands;
    }

////////////// 

    @Get('admin/:id')  // pour admin
    getBandAdmin(@Param('id') bandId: string) {
        return this.bandsService.getSingleBand(bandId);
    }

    @Get('/:id')  // pour utilisateur simple
    getBand(@Param('id') bandId: string) {
        return this.bandsService.getSingleBand(bandId);
    }

///////////// 

    @Patch('admin/:id')   // pour admin
    async updateBand(
        @Param('id') bandId: string,
        @Body('name') bandName: string,
        @Body('genre') bandGenre: string,
        @Body('picture') bandPicture: string,
    ) {
        await this.bandsService.updateBand(bandId, bandName, bandGenre, bandPicture);
        return("Band successfully updated");
    }

    @Delete('admin/:id')   // pour admin
    async removeBand(@Param('id') bandId: string) {
        await this.bandsService.deleteBand(bandId);
        return("Band successfully deleted");
    }
}
