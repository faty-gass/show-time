import { TicketsModule } from './tickets/tickets.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConcertModule } from './concert/concert.module';
import { BandsModule } from './bands/bands.module';

@Module({
  imports: [
    TicketsModule, UsersModule, ConcertModule, BandsModule, MongooseModule.forRoot('mongodb://localhost/showcacao'), AuthModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule { }
