import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

export const createWebSocketClient = () => {
    const socket = new SockJS('https://www.silvercareer.shop/ws');  
    const client = new Client({
        webSocketFactory: () => socket,
        reconnectDelay: 5000,
    });

    return client;
};

//https://43.201.132.241:8888/ws

//'http://localhost:8888/ws'
//'https://www.silvercareer.shop/ws'