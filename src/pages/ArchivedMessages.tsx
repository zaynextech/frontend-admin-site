import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import {
  RotateCcw,
  Trash2,
} from "lucide-react";
import ConfirmModal from "../components/ui/ConfirmModal";
import Loader from "../components/ui/Loader";

interface Room {
  id: string;

  type: string;

  name?: string;

  project?: {
    projectName: string;
  };

  client?: {
    fullName: string;

    email: string;
  };
}

const ArchivedMessages = () => {

  const [rooms, setRooms] =
    useState<Room[]>([]);

  const [loading, setLoading] =
    useState(true);

  /* FETCH */
  const fetchRooms =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        const response =
        await axios.get(
          `${import.meta.env.VITE_API_URL}/chat/archived`,
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

        console.log(
        "ROOMS:",
        response.data.rooms
      );

      } catch (
        error
      ) {

        console.log(error);

      } finally {

        setLoading(false);

      }
    };

  /* RESTORE */
  const restoreRoom =
    async (
      roomId: string
    ) => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

     await axios.patch(
        `${import.meta.env.VITE_API_URL}/chat/restore/${roomId}`,
        {},
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

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

  /* DELETE */
  const deleteRoom =
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

      await axios.delete(
        `${import.meta.env.VITE_API_URL}/chat/room/${roomId}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

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

  useEffect(() => {

    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchRooms();

  }, []);

  if (loading) {

    return (
      <div className="flex min-h-screen items-center justify-center">
      <Loader />
    </div>
    );
  }

  return (
    <div className="p-10 text-white">

      <div className="mb-10">

        <h1 className="text-4xl font-black">

          Archived Messages

        </h1>

        <p className="mt-3 text-slate-400">

          Restore or permanently delete archived conversations.

        </p>

      </div>

      <div className="space-y-5">

        {rooms.length === 0 ? (

          <div className="rounded-3xl border border-white/5 bg-[#111] p-10 text-center text-slate-500">

            No archived rooms

          </div>

        ) : (

          rooms.map(
            (room) => (

              <div
                key={room.id}

                className="rounded-3xl border border-white/5 bg-[#111] p-6"
              >

                <div className="flex items-center justify-between gap-6">

                  <div>

                    <h2 className="text-xl font-bold">

                      {room.type ===
                      "SUPPORT"

                        ? room.client
                            ?.fullName

                        : room.project
                            ?.projectName}

                    </h2>

                    {room.type ===
                      "SUPPORT" &&
                      room.client && (

                      <p className="mt-2 text-sm text-slate-500">

                        {
                          room.client
                            .email
                        }

                      </p>

                    )}

                  </div>

                  <div className="flex gap-4">

                    {/* RESTORE */}
                    <button
                      onClick={() =>
                        restoreRoom(
                          room.id
                        )
                      }

                      className="rounded-2xl bg-cyan-500 p-4 text-black"
                    >

                      <RotateCcw
                        size={18}
                      />

                    </button>

                    {/* DELETE */}
                    <button
                      onClick={() =>
                        deleteRoom(
                          room.id
                        )
                      }

                      className="rounded-2xl bg-red-500 p-4 text-black"
                    >

                      <Trash2
                        size={18}
                      />

                    </button>

                  </div>

                </div>

              </div>

            )
          )

        )}

      </div>

    </div>
  );
};

export default ArchivedMessages;