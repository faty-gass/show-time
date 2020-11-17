import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { hasRoles } from 'src/auth/roles.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guards';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {
  }

  @Post()  //  pour utilisateur simple
  async addUser(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('favorites') favorites: [],
    @Body('role') role: string,
  ) {
    const newUser = await this.usersService.insertUser(
      name,
      email,
      password,
      favorites,
      role,
    );
    return { "new user created": newUser };
  }



  @hasRoles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('admin')    //  pour admin
  async getAllUsers() {
    const users = await this.usersService.getUsers();
    return users;
  }

  @hasRoles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('admin/:id')   //  pour admin
  getUser(@Param('id') userId: string) {
    return this.usersService.getSingleUser(userId);
  }

  @hasRoles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch('admin/:id')  //  pour admin
  async updateUserAdmin(
    @Param('id') userId: string,
    @Body('role') role: string
  ) {
    await this.usersService.updateUserAdmin(
      userId,
      role
    );
    return null;
  }



  @Patch(':id')   //  pour utilisateur simple
  async updateUser(
    @Param('id') userId: string,
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('favorites') favorites: [],
    // @Body('role') role: boolean
  ) {
    await this.usersService.updateUser(
      userId,
      name,
      email,
      password,
      favorites,
      //role
    );
    return null;
  }

  @Get('suggestions/:userId')
  async getSuggestion(
    @Param('userId') userId: string
  ) {
    const suggestions = await this.usersService.getSuggestion(userId);
    return suggestions;
  }

  @Delete('admin/:id')   //  pour admin
  async removeUser(@Param('id') prodId: string) {
    await this.usersService.deleteUser(prodId);
    return null;
  }
}