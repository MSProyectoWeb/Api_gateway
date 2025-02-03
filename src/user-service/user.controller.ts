// api-gateway/src/user-service/user.controller.ts
import { Controller, Get, Post, Put, Delete, Body, Param, Inject, ParseIntPipe } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

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
  async findAll() {
    return firstValueFrom(
      this.usersClient.send({ cmd: 'get_usuarios' }, {})
    );
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return firstValueFrom(
      this.usersClient.send({ cmd: 'get_user_by_id' }, { id })
    );
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: any) {
    return firstValueFrom(
      this.usersClient.send({ cmd: 'update_user' }, { id, updateUserDto })
    );
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return firstValueFrom(
      this.usersClient.send({ cmd: 'delete_user' }, { id })
    );
  }

  @Put('update-password')
  async updatePassword(@Body() body: { correo: string; newPassword: string }) {
    return firstValueFrom(
      this.usersClient.send({ cmd: 'update_user_password' }, body)
    );
  }
}