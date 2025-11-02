// Push Notification Utility
class PushNotificationManager {
  constructor() {
    this.isSupported = 'Notification' in window;
    this.permission = this.isSupported ? Notification.permission : 'denied';
  }

  // Request permission for notifications
  async requestPermission() {
    if (!this.isSupported) {
      console.warn('Push notifications are not supported in this browser');
      return false;
    }

    if (this.permission === 'granted') {
      return true;
    }

    if (this.permission === 'denied') {
      console.warn('Push notifications are blocked by the user');
      return false;
    }

    // Request permission
    const permission = await Notification.requestPermission();
    this.permission = permission;
    return permission === 'granted';
  }

  // Show a push notification
  async showNotification(title, options = {}) {
    const hasPermission = await this.requestPermission();
    
    if (!hasPermission) {
      console.warn('Cannot show notification: permission denied');
      return null;
    }

    const defaultOptions = {
      icon: '/favicon.ico',
      badge: '/favicon.ico',
      tag: 'sweet-shop',
      renotify: true,
      requireInteraction: false,
      silent: false,
      ...options
    };

    try {
      const notification = new Notification(title, defaultOptions);
      
      // Auto close after 5 seconds if not interactive
      if (!defaultOptions.requireInteraction) {
        setTimeout(() => {
          notification.close();
        }, 5000);
      }

      return notification;
    } catch (error) {
      console.error('Error showing notification:', error);
      return null;
    }
  }

  // Show order notification
  showOrderNotification(orderNumber, status) {
    const statusMessages = {
      'placed': {
        title: '🛒 Order Placed Successfully!',
        body: `Your order #${orderNumber} has been placed and will be processed soon.`,
        icon: '🛒'
      },
      'confirmed': {
        title: '✅ Order Confirmed!',
        body: `Great news! Your order #${orderNumber} has been confirmed.`,
        icon: '✅'
      },
      'processing': {
        title: '⚙️ Order Processing',
        body: `Your order #${orderNumber} is being prepared with care.`,
        icon: '⚙️'
      },
      'shipped': {
        title: '🚚 Order Shipped!',
        body: `Your order #${orderNumber} is on its way to you!`,
        icon: '🚚'
      },
      'delivered': {
        title: '📦 Order Delivered!',
        body: `Your order #${orderNumber} has been delivered. Enjoy your sweets!`,
        icon: '📦'
      }
    };

    const config = statusMessages[status.toLowerCase()] || {
      title: '📋 Order Update',
      body: `Your order #${orderNumber} status has been updated to ${status}.`,
      icon: '📋'
    };

    return this.showNotification(config.title, {
      body: config.body,
      icon: config.icon,
      tag: `order-${orderNumber}`,
      data: { orderNumber, status }
    });
  }

  // Show inventory notification
  showInventoryNotification(itemName, quantity) {
    const title = quantity === 0 ? '❌ Out of Stock Alert!' : '⚠️ Low Stock Alert!';
    const body = quantity === 0 
      ? `${itemName} is now out of stock!`
      : `${itemName} is running low (${quantity} left). Restock soon!`;

    return this.showNotification(title, {
      body,
      icon: '📊',
      tag: `inventory-${itemName}`,
      requireInteraction: true,
      data: { itemName, quantity }
    });
  }

  // Show promotion notification
  showPromotionNotification(title, message, code = null) {
    const body = code ? `${message} Use code: ${code}` : message;
    
    return this.showNotification(`🎫 ${title}`, {
      body,
      icon: '🎫',
      tag: 'promotion',
      requireInteraction: true,
      data: { code, message }
    });
  }

  // Check if notifications are enabled
  isEnabled() {
    return this.isSupported && this.permission === 'granted';
  }

  // Get permission status
  getPermissionStatus() {
    return {
      supported: this.isSupported,
      permission: this.permission,
      enabled: this.isEnabled()
    };
  }
}

// Create singleton instance
const pushNotificationManager = new PushNotificationManager();

export default pushNotificationManager;