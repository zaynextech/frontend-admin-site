import {
  useEffect,
  useState,
} from "react";

import axios from "axios";
import { socket } from "../socket/socket";

import {
  Archive,
} from "lucide-react";

import {
  Link,
} from "react-router-dom";
import ConfirmModal from "../components/ui/ConfirmModal";
import Loader from "../components/ui/Loader";

interface Room {
  id: string;

  name?: string;

  type: string;

  project?: {
    projectName: string;
  };

  client?: {
    fullName: string;

    email: string;
  };

  messages: {
    isRead: boolean;
  }[];
}

interface Message {
  id: string;

  roomId: string;

  message: string;

  senderRole: string;

  createdAt: string;

  seen: boolean;

  seenAt?: string;
}

const Messages = () => {


  const [rooms, setRooms] =
    useState<Room[]>([]);

  const [selectedRoom, setSelectedRoom] =
    useState<Room | null>(
      null
    );

  const [messages, setMessages] =
    useState<Message[]>([]);

  const [newMessage, setNewMessage] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  /* FETCH ROOMS */
  const fetchRooms =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        const response =
          await axios.get(
            `${import.meta.env.VITE_API_URL}/chat/rooms`,
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        setRooms(
          response.data.rooms || []
        );

      } catch (
        error
      ) {

        console.log(error);

      } finally {

        setLoading(false);

      }
    };

  /* FETCH MESSAGES */
  const fetchMessages =
    async (
      roomId: string
    ) => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        const response =
          await axios.get(
            `${import.meta.env.VITE_API_URL}/chat/messages/${roomId}`,
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        setMessages(
          response.data.messages || []
        );

        fetchRooms();

      } catch (
        error
      ) {

        console.log(error);

      }
    };

  /* SEND MESSAGE */
  const sendMessage =
    async () => {

      if (
        !selectedRoom ||
        !newMessage.trim()
      ) {
        return;
      }

      try {

        const token =
          localStorage.getItem(
            "token"
          );

       await axios.post(
          `${import.meta.env.VITE_API_URL}/chat/send`,
          {
            roomId:
              selectedRoom.id,

            message:
              newMessage,
          },
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

        setNewMessage("");

        fetchMessages(
          selectedRoom.id
        );

      } catch (
        error
      ) {

        console.log(error);

      }
    };

  /* ARCHIVE ROOM */
  const archiveRoom =
    async (
      roomId: string
    ) => {

      const confirmed =
        await ConfirmModal({
          title: "Archive Room?",
          text:
            "This action can be reversed later.",
          confirmText:
            "Yes, archive",
        });

      if (!confirmed) {
        return;
    }

      try {

        const token =
          localStorage.getItem(
            "token"
          );

       await axios.patch(
          `${import.meta.env.VITE_API_URL}/chat/archive/${roomId}`,
          {},
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

        if (
          selectedRoom?.id ===
          roomId
        ) {

          setSelectedRoom(
            null
          );

          setMessages(
            []
          );
        }

        fetchRooms();

        setRooms((prev) =>
          prev.filter(
            (room) =>
              room.id !== roomId
          )
        );

      } catch (
        error
      ) {

        console.log(error);

      }
    };

  /* INITIAL LOAD */
  useEffect(() => {

    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchRooms();

  }, []);

  /* ROOM CHANGE */
  /* eslint-disable react-hooks/exhaustive-deps */
useEffect(() => {

  if (!selectedRoom) {
    return;
  }

  // eslint-disable-next-line react-hooks/set-state-in-effect
  fetchMessages(
    selectedRoom.id
  );

  socket.emit(
    "join_room",
    selectedRoom.id
  );

  const handleMessage =
    (message: Message) => {

      if (
        message.roomId !==
        selectedRoom.id
      ) {
        return;
      }

      setMessages((prev) => {

        const exists =
          prev.find(
            (msg) =>
              msg.id ===
              message.id
          );

        if (exists) {
          return prev;
        }

        return [
          ...prev,
          message,
        ];
      });
    };

  socket.on(
    "receive_message",
    handleMessage
  );

  return () => {

    socket.emit(
      "leave_room",
      selectedRoom.id
    );

    socket.off(
      "receive_message",
      handleMessage
    );
  };

}, [selectedRoom]);

  if (loading) {

    return (
      <div className="flex min-h-screen items-center justify-center">
      <Loader />
    </div>
    );
  }

  return (
    <div className="flex h-screen bg-black text-white">

      {/* SIDEBAR */}
      <div className="w-[320px] border-r border-white/5 bg-[#0d0d0d]">

        <div className="flex items-center justify-between border-b border-white/5 p-6">

          <div>

            <h1 className="text-3xl font-black">

              Messages

            </h1>

            <p className="mt-2 text-sm text-slate-400">

              Official communication center

            </p>

          </div>

          <Link
            to="/messages/archived"

            className="rounded-2xl bg-[#111] px-5 py-3 text-sm font-semibold transition hover:bg-[#1a1a1a]"
          >

            Archived

          </Link>

        </div>

        <div className="space-y-2 p-4">

          {rooms.map(
            (room) => (

              <button
                key={room.id}

                onClick={() => {

                  setSelectedRoom(
                    room
                  );
                }}

                className={`w-full rounded-2xl p-4 text-left transition

                ${
                  selectedRoom?.id ===
                  room.id

                    ? "bg-cyan-500 text-black"

                    : "bg-[#111] hover:bg-[#191919]"
                }`}
              >

                <div className="flex items-start justify-between gap-4">

                  <div className="flex-1">

                    <h2 className="font-bold">

                      {room.type === "SUPPORT"

                        ? room.client?.fullName ||
                          "Support"

                        : room.project?.projectName ||
                          room.name}

                    </h2>

                    {room.type === "SUPPORT" &&
                      room.client && (

                      <p className="mt-1 text-xs text-slate-500">

                        {room.client.email}

                      </p>

                    )}

                  </div>

                  <div className="flex items-center gap-3">

                    {room.messages?.length > 0 && (

                      <div className="flex h-6 min-w-[24px] items-center justify-center rounded-full bg-red-500 px-2 text-xs font-bold text-white">

                        {room.messages.length}

                      </div>

                    )}

                    <button
                      onClick={(e) => {

                        e.stopPropagation();

                        archiveRoom(
                          room.id
                        );
                      }}

                      className="text-red-400 hover:text-red-500"
                    >

                      <Archive size={16} />

                    </button>

                  </div>

                </div>

              </button>

            )
          )}

        </div>

      </div>

      {/* CHAT AREA */}
      <div className="flex flex-1 flex-col">

        {!selectedRoom ? (

          <div className="flex flex-1 items-center justify-center text-slate-500">

            Select a room

          </div>

        ) : (

          <>

            {/* HEADER */}
            <div className="border-b border-white/5 p-6">

              <h2 className="text-2xl font-bold">

                #
                {selectedRoom.name}

              </h2>

            </div>

            {/* MESSAGES */}
            <div className="flex-1 space-y-4 overflow-y-auto p-6">

              {messages.map(
                (message) => (

                  <div
                    key={message.id}

                    className={`max-w-[75%] rounded-2xl p-4

                    ${
                      message.senderRole ===
                      "ADMIN"

                        ? "ml-auto bg-cyan-500 text-black"

                        : "bg-[#111]"
                    }`}
                  >

                    <div className="mb-2 flex items-center justify-between gap-5">

                      <span className="text-xs font-bold uppercase">

                        {message.senderRole}

                      </span>

                      <span className="text-[10px] opacity-70">

                        {new Date(
                          message.createdAt
                        ).toLocaleString()}

                      </span>

                    </div>

                    <p className="leading-relaxed">

                      {message.message}

                    </p>

                    {(
                      message.senderRole ===
                      "ADMIN" ||

                      message.senderRole ===
                      "SUPER_ADMIN"
                    ) && (

                      <div className="mt-3 text-right text-[11px] opacity-70">

                        {message.seen

                          ? "✓✓ Seen"

                          : "✓ Sent"}

                      </div>

                    )}

                  </div>

                )
              )}

            </div>

            {/* INPUT */}
            <div className="border-t border-white/5 p-6">

              <div className="flex gap-4">

                <input
                  type="text"

                  placeholder="Type message..."

                  value={newMessage}

                  onChange={(e) =>
                    setNewMessage(
                      e.target.value
                    )
                  }

                  className="flex-1 rounded-2xl border border-white/5 bg-[#111] px-5 py-4 outline-none"
                />

                <button
                  onClick={
                    sendMessage
                  }

                  className="rounded-2xl bg-cyan-500 px-6 py-4 font-semibold text-black"
                >
                  Send
                </button>

              </div>

            </div>

          </>

        )}

      </div>

    </div>
  );
};

export default Messages;