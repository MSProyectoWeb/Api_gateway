import { 
    Controller, 
    Get, 
    Post, 
    Body, 
    Param, 
    Delete, 
    ParseIntPipe, 
    Patch, 
    Query,
    Inject, 
    UseGuards
  } from '@nestjs/common';
  import { ClientProxy } from '@nestjs/microservices';
  import { firstValueFrom } from 'rxjs';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
  
  @Controller('subscriptions')
  export class SubscriptionsController {
    constructor(
      @Inject('USERS_SERVICE') private readonly usersClient: ClientProxy
    ) {}
  
    @Post()
    async create(@Body() createSubscriptionDto: any) {
      return firstValueFrom(
        this.usersClient.send({ cmd: 'create_subscription' }, createSubscriptionDto)
      );
    }
  
    @Get()
    @UseGuards(JwtAuthGuard)
    async findAll() {
      return firstValueFrom(
        this.usersClient.send({ cmd: 'find_all_subscriptions' }, {})
      );
    }
  
    @Get(':id')
    @UseGuards(JwtAuthGuard)
    async findOne(@Param('id', ParseIntPipe) id: number) {
      return firstValueFrom(
        this.usersClient.send({ cmd: 'find_one_subscription' }, { id })
      );
    }
  
    @Get('user/:userId')
    @UseGuards(JwtAuthGuard)
    async findByUserId(@Param('userId', ParseIntPipe) userId: number) {
      return firstValueFrom(
        this.usersClient.send(
          { cmd: 'find_subscription_by_user_id' }, 
          { userId }
        )
      );
    }
  
    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    async remove(@Param('id', ParseIntPipe) id: number) {
      return firstValueFrom(
        this.usersClient.send({ cmd: 'delete_subscription' }, { id })
      );
    }
  
    @Patch(':id/renovar')
    @UseGuards(JwtAuthGuard)
    async renovar(
      @Param('id', ParseIntPipe) id: number,
      @Query('tipoSuscripcion') tipoSuscripcion: any,
    ) {
      return firstValueFrom(
        this.usersClient.send(
          { cmd: 'renovar_subscription' }, 
          { id, tipoSuscripcion }
        )
      );
    }
  }