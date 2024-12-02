import { ActionCreatorWithPayload } from '@reduxjs/toolkit';

interface SocketPayload {
  url: string;
  token: string;
  messageType: string;
  successAction: ActionCreatorWithPayload<any>;
  errorAction: ActionCreatorWithPayload<string>;
  rejectedAction: ActionCreatorWithPayload<any>;
}

export const socketMiddleware =
  (store: any) => (next: any) => (action: any) => {
    if (action.type === action.payload?.pending?.type) {
      const { url, token, messageType, successAction, errorAction } =
        action.payload;

      if (!url) {
        return next(action);
      }

      const socketUrl = token ? `${url}?token=${token}` : url;
      const socket = new WebSocket(socketUrl);

      socket.onopen = () => {
        console.log('WebSocket подключен');
        socket.send(JSON.stringify({ action: messageType }));
      };

      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.success) {
          store.dispatch(successAction(data));
        } else if (data.message === 'Invalid or missing token') {
          store.dispatch(errorAction('Токен недействителен или отсутствует.'));
        }
      };

      socket.onerror = (error) => {
        console.error('Ошибка WebSocket:', error);
      };

      socket.onclose = () => {
        console.log('WebSocket закрыт');
      };

      action.payload.socket = socket;
    }

    if (
      action.type === action.payload?.rejected?.type &&
      action.payload.socket
    ) {
      action.payload.socket.close();
    }

    return next(action);
  };
