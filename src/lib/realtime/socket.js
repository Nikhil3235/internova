/**
 * INTERNOVA — Real-time WebSockets & Live Event Dispatcher (Socket.io Style)
 * Layer 10 of Enterprise Architecture
 * Pushes instant updates to browser dashboards without polling
 */

class WebSocketChannel {
  constructor() {
    this.listeners = new Map();
  }

  /**
   * Client subscribe to room / event
   */
  on(event, callback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event).add(callback);

    return () => {
      this.listeners.get(event)?.delete(callback);
    };
  }

  /**
   * Server push live event to all connected clients
   */
  emit(event, data) {
    const callbacks = this.listeners.get(event);
    if (callbacks) {
      callbacks.forEach((cb) => {
        try {
          cb(data);
        } catch (e) {
          console.error(`[WebSocket Client Error] Event: ${event}`, e);
        }
      });
    }
  }
}

export const socket = new WebSocketChannel();
