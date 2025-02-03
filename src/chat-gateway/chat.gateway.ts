// api-gateway/src/chat-gateway/chat.gateway.ts
import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    OnGatewayConnection,
    OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@WebSocketGateway({
    cors: {
        origin: '*',
    },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;

    constructor(
        @Inject('CHAT_SERVICE') private readonly chatClient: ClientProxy,
    ) {
        // Suscribirse a eventos del servicio de chat
        this.subscribeToEvents();
    }

    private async subscribeToEvents() {
        this.chatClient.send({ cmd: 'subscribe_events' }, {}).subscribe(
            (event: any) => {
                if (event.type === 'newMessage') {
                    this.server.emit('newMessage', event.data);
                } else if (event.type === 'userJoined') {
                    this.server.emit('userJoined', event.data);
                } else if (event.type === 'userLeft') {
                    this.server.emit('userLeft', event.data);
                }
            }
        );
    }

    async handleConnection(client: Socket) {
        await this.chatClient.send({ cmd: 'client_connected' }, { clientId: client.id }).toPromise();
    }

    async handleDisconnect(client: Socket) {
        await this.chatClient.send({ cmd: 'client_disconnected' }, { clientId: client.id }).toPromise();
    }

    @SubscribeMessage('join')
    async handleJoin(client: Socket, username: string) {
        const response = await firstValueFrom(
            this.chatClient.send({ cmd: 'join_chat' }, { clientId: client.id, username })
        );
        return response;
    }

    @SubscribeMessage('message')
    async handleMessage(client: Socket, message: any): Promise<void> {
        await firstValueFrom(
            this.chatClient.send({ cmd: 'send_message' }, { 
                clientId: client.id, 
                message 
            })
        );
    }

    @SubscribeMessage('getActiveUsers')
    async handleGetActiveUsers() {
        return firstValueFrom(
            this.chatClient.send({ cmd: 'get_active_users' }, {})
        );
    }
}