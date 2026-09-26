import Notification from '../models/Notification.js';
import User from '../models/User.js';
import sendEmail from './sendEmail.js';

const createNotification = async ({ user, title, message, type, relatedBooking, sendMail = false }) => {
  const notification = await Notification.create({
    user,
    title,
    message,
    type,
    relatedBooking
  });

  if (sendMail) {
    const userData = await User.findById(user);
    if (userData) {
      await sendEmail({
        email: userData.email,
        subject: title,
        message: message
      });
    }
  }

  return notification;
};

export default createNotification;
