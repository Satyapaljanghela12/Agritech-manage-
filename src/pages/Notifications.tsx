import { useEffect, useState } from 'react';
import { supabase, Notification } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { Bell, Check, Trash2 } from 'lucide-react';

const typeIcons: Record<string, string> = {
  harvest: '🌾',
  maintenance: '🔧',
  inventory: '📦',
  financial: '💰',
  general: '📢',
};

const priorityColors = {
  low: 'border-blue-200 bg-blue-50',
  medium: 'border-amber-200 bg-amber-50',
  high: 'border-red-200 bg-red-50',
};

export const Notifications = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    if (user) {
      loadNotifications();
    }
  }, [user]);

  const loadNotifications = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setNotifications(data || []);
    } catch (error) {
      console.error('Error loading notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id: string) => {
    try {
      const { error } = await supabase
        .from('notifications')
        .update({ status: 'read' })
        .eq('id', id);

      if (error) throw error;
      loadNotifications();
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const deleteNotification = async (id: string) => {
    if (!confirm('Are you sure you want to delete this notification?')) return;

    try {
      const { error } = await supabase.from('notifications').delete().eq('id', id);

      if (error) throw error;
      loadNotifications();
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  const markAllAsRead = async () => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('notifications')
        .update({ status: 'read' })
        .eq('user_id', user.id)
        .eq('status', 'unread');

      if (error) throw error;
      loadNotifications();
    } catch (error) {
      console.error('Error marking all as read:', error);
    }
  };

  const filteredNotifications =
    filter === 'all'
      ? notifications
      : notifications.filter((n) => n.status === filter);

  const unreadCount = notifications.filter((n) => n.status === 'unread').length;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Notifications</h1>
          <p className="text-gray-600 mt-1">
            {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
          </p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
          >
            <Check className="w-5 h-5" />
            Mark All as Read
          </button>
        )}
      </div>

      <div className="flex gap-2">
        {['all', 'unread', 'read'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              filter === status
                ? 'bg-green-600 text-white'
                : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filteredNotifications.map((notification) => (
          <div
            key={notification.id}
            className={`rounded-xl p-6 border-2 ${
              notification.status === 'unread'
                ? priorityColors[notification.priority]
                : 'border-gray-200 bg-white'
            }`}
          >
            <div className="flex items-start gap-4">
              <div className="text-3xl flex-shrink-0">{typeIcons[notification.type]}</div>

              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3
                      className={`font-semibold ${
                        notification.status === 'unread' ? 'text-gray-900' : 'text-gray-600'
                      }`}
                    >
                      {notification.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${
                          notification.priority === 'high'
                            ? 'bg-red-100 text-red-700'
                            : notification.priority === 'medium'
                            ? 'bg-amber-100 text-amber-700'
                            : 'bg-blue-100 text-blue-700'
                        }`}
                      >
                        {notification.priority.toUpperCase()}
                      </span>
                      <span className="text-xs text-gray-500">
                        {notification.type.charAt(0).toUpperCase() + notification.type.slice(1)}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {notification.status === 'unread' && (
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className="p-2 hover:bg-white rounded-lg transition"
                        title="Mark as read"
                      >
                        <Check className="w-4 h-4 text-green-600" />
                      </button>
                    )}
                    <button
                      onClick={() => deleteNotification(notification.id)}
                      className="p-2 hover:bg-white rounded-lg transition"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </div>

                <p
                  className={`text-sm mb-2 ${
                    notification.status === 'unread' ? 'text-gray-700' : 'text-gray-500'
                  }`}
                >
                  {notification.message}
                </p>

                <p className="text-xs text-gray-400">
                  {new Date(notification.created_at).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        ))}

        {filteredNotifications.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
            <Bell className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">
              {filter === 'unread'
                ? 'No unread notifications'
                : filter === 'read'
                ? 'No read notifications'
                : 'No notifications yet'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
