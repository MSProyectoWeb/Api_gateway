import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ChatController } from './chat-gateway.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'CHAT_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://user:password@localhost:5672'],
          queue: 'chat_queue',
          queueOptions: { durable: false },
        },
      },
    ]),
  ],
  controllers: [ChatController],
  providers: [ChatGateway],
})
export class ChatGatewayModule {}
