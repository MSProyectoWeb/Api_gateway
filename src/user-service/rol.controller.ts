import { 
    Controller, 
    Get, 
    Post, 
    Put, 
    Delete, 
    Body, 
    Param, 
    Inject,
    ParseIntPipe 
  } from '@nestjs/common';
  import { ClientProxy } from '@nestjs/microservices';
  import { firstValueFrom } from 'rxjs';
  
  @Controller('roles')
  export class RolesController {
    constructor(
      @Inject('USERS_SERVICE') private readonly usersClient: ClientProxy
    ) {}
  
    @Post()
    async create(@Body() createRolDto: any) {
      return firstValueFrom(
        this.usersClient.send({ cmd: 'create_rol' }, createRolDto)
      );
    }
  
    @Get()
    async findAll() {
      return firstValueFrom(
        this.usersClient.send({ cmd: 'find_all_roles' }, {})
      );
    }
  
    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
      return firstValueFrom(
        this.usersClient.send({ cmd: 'find_one_rol' }, { id })
      );
    }
  
    @Put(':id')
    async update(
      @Param('id', ParseIntPipe) id: number, 
      @Body() updateRolDto: any
    ) {
      return firstValueFrom(
        this.usersClient.send(
          { cmd: 'update_rol' }, 
          { id, updateRolDto }
        )
      );
    }
  
    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number) {
      return firstValueFrom(
        this.usersClient.send({ cmd: 'delete_rol' }, { id })
      );
    }
  }