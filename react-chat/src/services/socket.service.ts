import { io, Socket } from 'socket.io-client';

class SocketService {
  private socket: Socket | null = null;
  private readonly url: string = import.meta.env.VITE_SOCKET_URL || 'http://localhost:3001';

  public connect(): void {
    if (!this.socket) {
      this.socket = io(this.url, {
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        timeout: 20000,
      });
    }
  }

  public disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  public emit<T>(event: string, data: T): void {
    this.socket?.emit(event, data);
  }

  public on<T>(event: string, callback: (data: T) => void): void {
    this.socket?.on(event, callback);
  }

  public off(event: string): void {
    this.socket?.off(event);
  }

  public get isConnected(): boolean {
    return this.socket?.connected || false;
  }
}

export const socketService = new SocketService();
