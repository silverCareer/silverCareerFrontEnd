import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

export const createWebSocketClient = () => {
    const socket = new SockJS('http://localhost:8888/ws');  
    const client = new Client({
        webSocketFactory: () => socket,
        reconnectDelay: 5000,
    });

    return client;
};
