import io, { Socket } from 'socket.io-client';

export class WebSocketApi {
  static socket: null | Socket = null;

  static createConnection() {
    this.socket = io('http://localhost:8080');

    this.socket.on('connect', () => {
      console.log('=== Connected ===');
    });

    this.socket.on('disconnect', () => {
      console.log('=== Disconnected ===');
    });
  }

  // static emitEvent() {
  //   this.socket?.emit()
  // }
}
