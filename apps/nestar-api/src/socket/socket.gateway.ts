import { Logger } from '@nestjs/common';
import { OnGatewayInit, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Server } from 'ws';

@WebSocketGateway({ transports: ['websocket'], secure: false }) // Uses ws://, not wss://, no http, but ws
export class SocketGateway implements OnGatewayInit {
	private logger: Logger = new Logger('SocketEventsGateway'); // tagging log, name
	private summaryClient: number = 0; // track how many clients are connected

	public afterInit(server: Server) {
		this.logger.log(`WebSocket Server Initialized total: ${this.summaryClient}`);
	} // runs after server starts

  handleConnection(client: WebSocket, ...args: any[]) { // args extra info like header, IP, req info
    this.summaryClient++;
    this.logger.log(`== Client connected total: ${this.summaryClient} ==`)
  } // runs every time a clients connects

    handleDisconnect(client: WebSocket) {
    this.summaryClient--;
    this.logger.log(`== Client disconnected total: ${this.summaryClient} ==`)
  } // track disconnection

	@SubscribeMessage('message')
	handleMessage(client: any, payload: any): string {
		return 'Hello world!';
	} // if event message is called, return hello world
}

// Use WebSockets when you need:
// Chat apps
// Live notifications
// Online users count
// Real-time dashboards
// Multiplayer games