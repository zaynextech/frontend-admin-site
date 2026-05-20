import {
  useEffect,
  useState,
} from "react";

import axios from "axios";
import {
  useSocket,
} from "../context/SocketContext";

import {
  Bell,
  CheckCheck,
  Loader,
  Trash2,
} from "lucide-react";

interface Notification {

  id: string;

  title: string;

  message: string;

  read: boolean;

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

  const [loading, setLoading] =
    useState(true);

  const [title, setTitle] =
    useState("");

  const [message, setMessage] =
    useState("");

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

      } finally {

        setLoading(false);

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
    

/* DELETE NOTIFICATION */
const deleteNotification =
  async (
    id: string
  ) => {

    try {

      const token =
        localStorage.getItem(
          "token"
        );

     await axios.delete(
          `${import.meta.env.VITE_API_URL}/notifications/${id}`,
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      setNotifications(
        (prev) =>

          prev.filter(
            (
              notification
            ) =>

              notification.id !==
              id
          )
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
            Authorization:
              `Bearer ${token}`,
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

  /* SEND GLOBAL NOTIFICATION */
  const createNotification =
    async () => {

      if (
        !title ||
        !message
      ) {
        return;
      }

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        await axios.post(
            `${import.meta.env.VITE_API_URL}/admin/notifications`,
            {
              title,
              message,
            },
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        setTitle("");

        setMessage("");

        fetchNotifications();

      } catch (
        error
      ) {

        console.log(error);

      }
    };

  const unreadCount =
    notifications.filter(
      (notification) =>
        !notification.read
    ).length;

  if (loading) {

    return (
      <div className="flex min-h-screen items-center justify-center">
      <Loader />
    </div>
    );
  }

  return (
  <div className="min-h-screen bg-[#050505] p-4 text-white sm:p-6">

    {/* HEADER */}
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

      <div>

        <h1 className="flex items-center gap-3 text-2xl font-semibold tracking-tight sm:text-3xl">

          <Bell size={24} className="text-cyan-400" />

          Notifications

        </h1>

        <p className="mt-2 text-sm text-zinc-500">

          Platform alerts and communication updates

        </p>

      </div>

      {unreadCount > 0 && (

        <div className="flex h-10 min-w-[40px] items-center justify-center rounded-full border border-red-500/20 bg-red-500/10 px-3 text-sm font-semibold text-red-400">

          {unreadCount}

        </div>

      )}

    </div>

    {/* SEND */}
    <div className="mb-8 rounded-2xl border border-white/10 bg-[#0a0a0a] p-5 backdrop-blur-xl">

      <div className="mb-6">

        <h2 className="text-lg font-semibold tracking-tight text-white sm:text-xl">

          Send Global Notification

        </h2>

        <p className="mt-1 text-sm text-zinc-500">

          Broadcast updates to all clients and admins

        </p>

      </div>

      <div className="space-y-4">

        {/* TITLE */}
        <input
          type="text"

          placeholder="Notification title"

          value={title}

          onChange={(e) =>
            setTitle(
              e.target.value
            )
          }

          className="h-12 w-full rounded-2xl border border-white/10 bg-black/30 px-4 text-sm text-white outline-none transition-all placeholder:text-zinc-600 focus:border-cyan-500/30"
        />

        {/* MESSAGE */}
        <textarea
          placeholder="Notification message"

          value={message}

          onChange={(e) =>
            setMessage(
              e.target.value
            )
          }

          className="min-h-[140px] w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-4 text-sm text-white outline-none transition-all placeholder:text-zinc-600 focus:border-cyan-500/30"
        />

        {/* BUTTON */}
        <button
          onClick={
            createNotification
          }

          className="flex h-12 w-full items-center justify-center rounded-2xl bg-cyan-500 px-5 text-sm font-semibold text-black transition-all hover:bg-cyan-400 sm:w-fit"
        >

          Send Notification

        </button>

      </div>

    </div>

    {/* LIST */}
    <div className="space-y-4">

      {notifications.length === 0 ? (

        <div className="rounded-2xl border border-dashed border-white/10 bg-[#0a0a0a] p-10 text-center text-sm text-zinc-500">

          No notifications found

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

              className={`rounded-2xl border p-5 transition-all

              ${
                notification.read

                  ? "border-white/10 bg-[#0a0a0a]"

                  : "border-cyan-500/20 bg-cyan-500/[0.03]"
              }`}
            >

              <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">

                {/* CONTENT */}
                <div className="flex-1">

                  <div className="flex flex-wrap items-center gap-3">

                    {/* DELETE */}
                    <button
                      onClick={() =>
                        deleteNotification(
                          notification.id
                        )
                      }

                      className="flex h-10 w-10 items-center justify-center rounded-xl border border-red-500/10 bg-red-500/10 text-red-400 transition hover:bg-red-500/20"
                    >

                      <Trash2 size={16} />

                    </button>

                    {/* TITLE */}
                    <h2 className="text-base font-semibold tracking-tight text-white sm:text-lg">

                      {
                        notification.title
                      }

                    </h2>

                    {/* UNREAD DOT */}
                    {!notification.read && (

                      <div className="h-2 w-2 rounded-full bg-cyan-400" />

                    )}

                  </div>

                  {/* MESSAGE */}
                  <p className="mt-4 text-sm leading-7 text-zinc-400">

                    {
                      notification.message
                    }

                  </p>

                  {/* DATE */}
                  <p className="mt-5 text-xs text-zinc-600">

                    {new Date(
                      notification.createdAt
                    ).toLocaleString()}

                  </p>

                </div>

                {/* ACTION */}
                {!notification.read && (

                  <button
                    onClick={() =>
                      markAsRead(
                        notification.id
                      )
                    }

                    className="flex h-11 items-center justify-center gap-2 rounded-xl bg-cyan-500 px-5 text-sm font-semibold text-black transition-all hover:bg-cyan-400"
                  >

                    <CheckCheck size={16} />

                    Mark Read

                  </button>

                )}

              </div>

            </div>

          )
        )

      )}

    </div>

  </div>
);
}
export default Notifications;