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
  
  @Controller('recuperar-password')
  export class RecuperarPasswordController {
    constructor(
      @Inject('USERS_SERVICE') private readonly usersClient: ClientProxy
    ) {}
  
    @Post('send')
    async sendEmail(@Body() body: { email: string }) {
      if (!body.email) {
        throw new HttpException(
          'Faltan parámetros requeridos (email).',
          HttpStatus.BAD_REQUEST
        );
      }
  
      try {
        const response = await firstValueFrom(
          this.usersClient.send(
            { cmd: 'send_recovery_email' }, 
            { email: body.email }
          )
        );
  
        if (response.status === 'error') {
          throw new HttpException(
            response.message,
            response.statusCode || HttpStatus.INTERNAL_SERVER_ERROR
          );
        }
  
        return { message: response.message };
      } catch (error) {
        throw new HttpException(
          error.message || 'Error al procesar la solicitud',
          error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR
        );
      }
    }
  }