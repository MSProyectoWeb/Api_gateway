import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller('chat')
export class ChatController {
  constructor(
    @Inject('CHAT_SERVICE') private readonly chatClient: ClientProxy,
  ) {}
  @Get()
  async getMessages() {
    return firstValueFrom(
      this.chatClient.send({ cmd: 'chat_saludo' }, {})
    );
  }
}