import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UserController } from './user.controller';
import { SubscriptionsController } from './suscription.controller';
import { RolesController } from './rol.controller';
import { RecuperarPasswordController } from './recuperarPsw.controller';
import { LoginController } from './login.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USERS_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://user:password@localhost:5672'],
          queue: 'users_queue',
          queueOptions: {
            durable: false,  // Cambiado a false para mantener consistencia
          },
        },
      },
    ]),
    AuthModule
  ],
  controllers: [UserController, SubscriptionsController, RolesController, RecuperarPasswordController, LoginController]
})
export class UserModule {}