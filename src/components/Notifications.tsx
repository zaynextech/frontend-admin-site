import {
  useEffect,
  useState,
} from "react";

import {
  useSocket,
} from "../context/SocketContext";

import axios from "axios";

import {
  Bell,
} from "lucide-react";


interface Notification {

  id: string;

  title: string;

  message: string;

  read: boolean;

  type?: string;

  link?: string;

  createdAt: string;
}

const Notifications = () => {

 

  const { socket } =
  useSocket();

  const [
    notifications,
    setNotifications,
  ] = useState<
    Notification[]
  >([]);

  const [
    open,
    setOpen,
  ] = useState(false);

  /* FETCH */
  const fetchNotifications =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        const response =
  await axios.get(
    `${import.meta.env.VITE_API_URL}/notifications/my-notifications`,
    {
      headers: {
        Authorization:
          `Bearer ${token}`,
      },
    }
  );

        setNotifications(
          response.data
            .notifications || []
        );

      } catch (
        error
      ) {

        console.log(error);

      }
    };

  /* MARK READ */
  const markAsRead =
    async (
      id: string
    ) => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        await axios.patch(
            `${import.meta.env.VITE_API_URL}/notifications/read/${id}`,
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

        fetchNotifications();

      } catch (
        error
      ) {

        console.log(error);

      }
    };

  /* eslint-disable react-hooks/exhaustive-deps */
useEffect(() => {

  // eslint-disable-next-line react-hooks/set-state-in-effect
  fetchNotifications();

  const handleNotification =
    (
      notification: Notification
    ) => {

      setNotifications(
        (prev) => [

          notification,
          ...prev,

        ]
      );
    };

  socket.on(
    "new_notification",
    handleNotification
  );

  return () => {

    socket.off(
      "new_notification",
      handleNotification
    );
  };

}, []);

  const unreadCount =
    notifications.filter(
      (notification) =>
        !notification.read
    ).length;

  return (
    <div className="relative">

      {/* BUTTON */}
      <button
        onClick={() =>
          setOpen(!open)
        }

        className="relative rounded-xl bg-[#111] p-3"
      >

        <Bell size={20} />

        {unreadCount > 0 && (

          <div className="absolute -right-1 -top-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">

            {unreadCount}

          </div>

        )}

      </button>

      {/* DROPDOWN */}
      {open && (

        <div className="absolute right-0 top-14 z-50 w-[380px] rounded-3xl border border-white/10 bg-[#111] shadow-2xl">

          <div className="border-b border-white/5 p-5">

            <h2 className="text-lg font-bold text-white">

              Notifications

            </h2>

          </div>

          <div className="max-h-[500px] overflow-y-auto">

           {notifications.length === 0 ? (

  <div className="p-6 text-center text-slate-500">

    No notifications

  </div>

) : (

  notifications.map(
    (
      notification
    ) => (

      <div
  key={
    notification.id
  }

  onClick={() => {

    markAsRead(
      notification.id
    );

    if (
      notification.link
    ) {

      window.location.href =
        notification.link;
    }
  }}

  className={`cursor-pointer rounded-3xl border p-6 transition

  ${
    notification.read

      ? "border-white/5 bg-[#111]"

      : "border-cyan-500/20 bg-cyan-500/5"
  }`}
>
    

                    <div className="flex items-start justify-between gap-4">

                      <div>

                        <h3 className="font-semibold text-white">

                          {
                            notification.title
                          }

                        </h3>

                        <p className="mt-2 text-sm text-slate-400">

                          {
                            notification.message
                          }

                        </p>

                      </div>

                      {!notification.read && (

                        <div className="mt-2 h-2 w-2 rounded-full bg-cyan-400" />

                      )}

                    </div>

                    <p className="mt-3 text-xs text-slate-500">

                      {new Date(
                        notification.createdAt
                      ).toLocaleString()}

                    </p>

                  </div>

                )
              )

            )}

          </div>

        </div>

      )}

    </div>
  );
};

export default Notifications;