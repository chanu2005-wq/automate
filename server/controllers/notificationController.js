import Notification from '../models/Notification.js';
import { sendSuccess } from '../utils/apiResponse.js';

export const getNotifications = async (req, res) => {
  const notifications = await Notification.find({ user: req.user.id }).sort('-createdAt');
  const unreadCount = notifications.filter(n => !n.isRead).length;
  sendSuccess(res, 'Notifications fetched', { notifications, unreadCount });
};

export const markAsRead = async (req, res) => {
  await Notification.findByIdAndUpdate(req.params.id, { isRead: true });
  sendSuccess(res, 'Notification marked as read');
};

export const markAllAsRead = async (req, res) => {
  await Notification.updateMany({ user: req.user.id }, { isRead: true });
  sendSuccess(res, 'All notifications marked as read');
};
