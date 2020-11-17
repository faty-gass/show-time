import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserSchema } from './user.model';
import { ConcertModule } from 'src/concert/concert.module';

@Module({
    imports: [ConcertModule, MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService, MongooseModule] // utile ?
})
export class UsersModule { }