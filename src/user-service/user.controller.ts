// api-gateway/src/user-service/user.controller.ts
import { Controller, Get, Post, Put, Delete, Body, Param, Inject, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UserController {
  constructor(
    @Inject('USERS_SERVICE') private readonly usersClient: ClientProxy
  ) {}

  @Get('saludo')
  async getUsers() {
    return firstValueFrom(
      this.usersClient.send({ cmd: 'user_saludo' }, {})
    );
  }


  @Post()
  async create(@Body() createUserDto: any) {
    return firstValueFrom(
      this.usersClient.send({ cmd: 'create_user' }, createUserDto)
    );
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll() {
    return firstValueFrom(
      this.usersClient.send({ cmd: 'get_usuarios' }, {})
    );
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return firstValueFrom(
      this.usersClient.send({ cmd: 'get_user_by_id' }, { id })
    );
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: any) {
    return firstValueFrom(
      this.usersClient.send({ cmd: 'update_user' }, { id, updateUserDto })
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id', ParseIntPipe) id: number) {
    return firstValueFrom(
      this.usersClient.send({ cmd: 'delete_user' }, { id })
    );
  }
}