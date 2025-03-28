import { useEffect, useState } from 'react';
import { WebSocketApi } from './websocketApi';

export const useWebSocketConnection = () => {
  const [state, setState] = useState({})

  const connectWebSocket = () => {
    WebSocketApi.createConnection()

    WebSocketApi.socket?.on("path", (data) => {
      setState(data)
    })
  }

  useEffect(() => {
    console.log(state)
  }, [state]);

  useEffect(() => {
    connectWebSocket()
  }, []);
}