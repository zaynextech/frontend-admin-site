import { Bell, Search, MessageSquare } from "lucide-react";
import { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";

// 1. Define explicit types to replace 'any'
interface Notification {
  id: string;
  title: string;
  message: string;
  read: boolean;
}

interface ChatRoom {
  messages?: unknown[];
}

const AdminTopbar = () => {
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const [unreadMessages, setUnreadMessages] = useState(0);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);

  const notificationRef = useRef<HTMLDivElement>(null);

  // 2. Wrap fetchData in useCallback to stabilize the reference
  const fetchData = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };

      const [notifRes, roomsRes] = await Promise.all([
          axios.get(
            `${import.meta.env.VITE_API_URL}/notifications/my-notifications`,
            config
          ),

          axios.get(
            `${import.meta.env.VITE_API_URL}/chat/rooms`,
            config
          ),
        ]);

      const fetchedNotifications: Notification[] = notifRes.data.notifications || [];
      setNotifications(fetchedNotifications);
      setUnreadNotifications(fetchedNotifications.filter((n) => !n.read).length);

      let totalUnread = 0;
      roomsRes.data.rooms.forEach((room: ChatRoom) => {
        totalUnread += room.messages?.length || 0;
      });
      setUnreadMessages(totalUnread);
    } catch (error) {
      console.error("Topbar fetch error:", error);
    }
  }, []);

  // 3. Fix the "set-state-in-effect" by handling the initial call correctly
  useEffect(() => {
    let isMounted = true;

    const initialize = async () => {
      if (isMounted) {
        await fetchData();
      }
    };

    initialize();

    const interval = setInterval(() => {
      fetchData();
    }, 5000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [fetchData]);

  // Click-outside logic
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };

    if (showNotifications) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showNotifications]);

  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-black/60 backdrop-blur-2xl">
      <div className="flex items-center justify-between px-8 py-5">
        <div />

        <div className="flex items-center gap-4">
          {/* SEARCH */}
          <div className="hidden items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-3 md:flex">
            <Search size={17} className="text-zinc-500" />
            <input
              placeholder="Search projects, clients, invoices..."
              className="w-[280px] bg-transparent text-sm text-white outline-none placeholder:text-zinc-600"
            />
          </div>

          {/* MESSAGES */}
          <button className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-3 text-zinc-400 transition hover:text-white">
            <MessageSquare size={19} />
            {unreadMessages > 0 && (
              <div className="absolute -right-1 -top-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                {unreadMessages}
              </div>
            )}
          </button>

          {/* NOTIFICATIONS */}
          <div className="relative" ref={notificationRef}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className={`relative rounded-2xl border border-white/10 p-3 transition ${
                showNotifications ? "bg-white/10 text-white" : "bg-white/[0.03] text-zinc-400 hover:text-white"
              }`}
            >
              <Bell size={19} />
              {unreadNotifications > 0 && (
                <div className="absolute -right-1 -top-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-cyan-500 px-1 text-[10px] font-bold text-black">
                  {unreadNotifications}
                </div>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 top-16 z-50 w-[380px] rounded-3xl border border-white/10 bg-[#0d0d0d] shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                <div className="border-b border-white/5 p-5">
                  <h3 className="text-lg font-bold text-white">Notifications</h3>
                </div>

                <div className="max-h-[450px] overflow-y-auto custom-scrollbar">
                  {notifications.length === 0 ? (
                    <div className="p-6 text-center text-zinc-500">No notifications</div>
                  ) : (
                    notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`border-b border-white/5 p-5 transition hover:bg-white/[0.02] ${
                          !notification.read ? "bg-cyan-500/5" : ""
                        }`}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="text-left">
                            <h4 className="font-semibold text-white">{notification.title}</h4>
                            <p className="mt-1 text-sm text-zinc-400">{notification.message}</p>
                          </div>
                          {!notification.read && (
                            <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* PROFILE */}
          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-500 text-sm font-black text-black">ZA</div>
            <div className="hidden text-left md:block">
              <p className="text-sm font-semibold text-white">Zaynex Admin</p>
              <p className="text-[10px] text-zinc-500">support@zaynex.com</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminTopbar;