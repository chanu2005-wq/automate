import React, { useEffect, useState } from 'react';
import { getNotifications, markAsRead, markAllAsRead } from '../api/notificationApi';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getNotifications()
      .then(res => {
        // Backend wraps as { success, message, data: { notifications, unreadCount } }
        const data = res?.data?.notifications || res?.notifications || [];
        setNotifications(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError("Failed to load notifications.");
        setLoading(false);
      });
  }, []);

  const handleMarkAsRead = async (id) => {
    try {
      await markAsRead(id);
      setNotifications((prev) => prev.map((n) => n._id === id ? { ...n, isRead: true } : n));
    } catch (err) {
      console.error(err);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await markAllAsRead();
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Notifications</h1>
        <p className="text-gray-500">Loading notifications...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Notifications</h1>
      {error && (
        <div className="mb-6 rounded-lg bg-red-100 border border-red-200 text-red-700 px-5 py-4">
          {error}
        </div>
      )}
      {notifications.length === 0 && (
        <div className="bg-white shadow overflow-hidden sm:rounded-md text-center py-20">
          <div className="text-5xl mb-4">𔔧</div>
          <h2 className="text-xl font-semibold text-gray-800">No notifications</h2>
          <p className="text-gray-500 mt-2">You have no notifications yet.</p>
        </div>
      )}
      {notifications.length > 0 && (
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200 bg-gray-50">
            <span className="text-sm font-medium text-gray-600">All Notifications</span>
            <button
              onClick={handleMarkAllAsRead}
              className="text-sm text-amber-600 hover:text-amber-700 font-medium"
            >
              Mark all as read
            </button>
          </div>
          <ul className="divide-y divide-gray-200">
            {notifications.map((notification) => (
              <li key={notification._id}>
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <p className={`text-sm font-medium truncate ${notification.isRead ? 'text-gray-600' : 'text-amber-600'}`}>
                      {notification.title}
                    </p>
                    <div className="ml-2 flex-shrink-0 flex">
                      {!notification.isRead && (
                        <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-amber-100 text-amber-800">
                          New
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <p className={`flex items-center text-sm mt-1 ${notification.isRead ? 'text-gray-500' : 'text-gray-700'}`}>
                        {notification.message}
                      </p>
                    </div>
                    <div className="mt-2 sm:mt-0 flex items-center text-sm text-gray-500">
                      <p>{new Date(notification.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleMarkAsRead(notification._id)}
                    className="mt-2 text-xs text-amber-600 hover:text-amber-700 underline"
                    disabled={notification.isRead}
                  >
                    {notification.isRead ? "Marked as read" : "Mark as read"}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Notifications;
