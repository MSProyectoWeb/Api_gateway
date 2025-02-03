import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatGatewayModule } from './chat-gateway/chat-gateway.module';
import { UserModule } from './user-service/user.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // Otros módulos...
    ChatGatewayModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
