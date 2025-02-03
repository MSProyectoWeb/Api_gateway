import { 
    Controller, 
    Post, 
    Body, 
    Inject,
    HttpException,
    HttpStatus 
  } from '@nestjs/common';
  import { ClientProxy } from '@nestjs/microservices';
  import { firstValueFrom } from 'rxjs';

  
  @Controller('login')
  export class LoginController {
    constructor(
      @Inject('USERS_SERVICE') private readonly usersClient: ClientProxy
    ) {}
  
    @Post()
    async login(@Body() loginDto: any) {
      try {
        const response = await firstValueFrom(
          this.usersClient.send(
            { cmd: 'validate_user' }, 
            loginDto
          )
        );
  
        if (response.status === 'error') {
          throw new HttpException(
            response.message,
            response.statusCode || HttpStatus.UNAUTHORIZED
          );
        }
  
        return response;
      } catch (error) {
        throw new HttpException(
          error.message || 'Error en el proceso de login',
          error.status || HttpStatus.INTERNAL_SERVER_ERROR
        );
      }
    }
  }