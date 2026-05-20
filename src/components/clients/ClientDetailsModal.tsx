import {
  useEffect,
  useState,
} from "react";

import axios from "axios";
import Loader from "../ui/Loader";

interface Client {
  id: string;
  fullName: string;
  email: string;
  createdAt?: string;

  clientProjects?: {
    id: string;
    projectName: string;
    status: string;
    progress: number;
  }[];

  invoices?: {
    id: string;
    amount: number;
    status: string;
  }[];

  supportTickets?: {
    id: string;
    subject: string;
    status: string;
  }[];

  notifications?: {
    id: string;
    title: string;
  }[];
}

interface Props {
  client: Client | null;

  onClose:
    () => void;
}

const ClientDetailsModal =
  ({
    client,
    onClose,
  }: Props) => {

    const [details, setDetails] =
      useState<Client | null>(
        null
      );

    const [loading, setLoading] =
      useState(false);

    useEffect(() => {

      if (!client) {
        return;
      }

      const fetchClientDetails =
        async () => {

          try {

            setLoading(true);

            const token =
              localStorage.getItem(
                "token"
              );

           const response =
              await axios.get(
                `${import.meta.env.VITE_API_URL}/admin/clients/${client.id}`,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );

            setDetails(
              response.data.client
            );

          } catch (
            error
          ) {

            console.log(error);

          } finally {

            setLoading(false);

          }
        };

      fetchClientDetails();

    }, [client]);

    if (!client) {
      return null;
    }

return (
  <div
    className="
      fixed
      inset-0
      z-50
      flex
      items-center
      justify-center
      bg-black/80
      p-2
      sm:p-4
      lg:p-6
      backdrop-blur-xl
    "
  >
    {/* BACKGROUND GLOW */}
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="
          absolute
          left-0
          top-0
          h-[220px]
          w-[220px]
          sm:h-[400px]
          sm:w-[400px]
          rounded-full
          bg-white/5
          blur-3xl
        "
      />

      <div
        className="
          absolute
          bottom-0
          right-0
          h-[220px]
          w-[220px]
          sm:h-[350px]
          sm:w-[350px]
          rounded-full
          bg-white/5
          blur-3xl
        "
      />
    </div>

    {/* MODAL */}
    <div
      className="
        relative
        max-h-[96vh]
        w-full
        max-w-6xl
        overflow-y-auto
        rounded-[24px]
        sm:rounded-[28px]
        border
        border-white/10
        bg-[#0a0a0a]/95
        shadow-[0_0_80px_rgba(255,255,255,0.03)]
        backdrop-blur-2xl
      "
    >
      {/* HEADER */}
      <div
        className="
          sticky
          top-0
          z-20
          border-b
          border-white/10
          bg-black/50
          px-4
          py-5
          backdrop-blur-xl
          sm:px-6
          lg:px-8
        "
      >
        <div
          className="
            flex
            flex-col
            gap-5
            xl:flex-row
            xl:items-center
            xl:justify-between
          "
        >
          {/* USER INFO */}
          <div
            className="
              flex
              items-start
              gap-4
              sm:items-center
              sm:gap-5
            "
          >
            {/* AVATAR */}
            <div
              className="
                flex
                h-12
                w-12
                sm:h-16
                sm:w-16
                shrink-0
                items-center
                justify-center
                rounded-2xl
                border
                border-white/10
                bg-white/5
                text-lg
                font-bold
                uppercase
                sm:text-2xl
              "
            >
              {details?.fullName?.charAt(0)}
            </div>

            <div className="min-w-0">
              <div
                className="
                  mb-2
                  inline-flex
                  items-center
                  rounded-full
                  border
                  border-green-500/20
                  bg-green-500/10
                  px-3
                  py-1
                  text-[11px]
                  font-medium
                  text-green-400
                  sm:text-xs
                "
              >
                Active Client
              </div>

              <h2
                className="
                  break-words
                  text-xl
                  font-bold
                  tracking-tight
                  sm:text-3xl
                "
              >
                {details?.fullName}
              </h2>

              <p
                className="
                  mt-1
                  break-all
                  text-sm
                  text-zinc-400
                  sm:mt-2
                "
              >
                {details?.email}
              </p>
            </div>
          </div>

          {/* ACTIONS */}
          <div
            className="
              flex
              flex-col
              gap-3
              sm:flex-row
              sm:items-center
              xl:justify-end
            "
          >
            <button
              className="
                w-full
                rounded-2xl
                border
                border-white/10
                bg-white/5
                px-5
                py-3
                text-sm
                font-medium
                text-white
                backdrop-blur-xl
                transition-all
                duration-300
                hover:bg-white/10
                active:scale-[0.98]
                sm:w-auto
              "
            >
              Export Data
            </button>

            <button
              onClick={onClose}
              className="
                w-full
                rounded-2xl
                bg-white
                px-5
                py-3
                text-sm
                font-semibold
                text-black
                transition-all
                duration-300
                hover:scale-[1.02]
                hover:bg-zinc-200
                active:scale-95
                sm:w-auto
              "
            >
              Close
            </button>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-4 sm:p-6 lg:p-8">
        {loading ? (
          <div
            className="
              flex
              h-[300px]
              items-center
              justify-center
            "
          >
            <Loader />
          </div>
        ) : (
          <div className="space-y-8 sm:space-y-10">
            {/* STATS */}
            <div
              className="
                grid
                grid-cols-1
                gap-4
                sm:grid-cols-2
                xl:grid-cols-4
              "
            >
              {/* CARD */}
              <div
                className="
                  group
                  rounded-3xl
                  border
                  border-white/10
                  bg-white/[0.03]
                  p-5
                  transition-all
                  duration-300
                  hover:bg-white/[0.05]
                  sm:p-6
                "
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm text-zinc-400">
                    Projects
                  </p>

                  <div className="rounded-xl bg-cyan-500/10 p-2 text-cyan-400">
                    📁
                  </div>
                </div>

                <h3 className="mt-5 text-3xl font-bold sm:text-4xl">
                  {details?.clientProjects?.length || 0}
                </h3>
              </div>

              {/* CARD */}
              <div
                className="
                  group
                  rounded-3xl
                  border
                  border-white/10
                  bg-white/[0.03]
                  p-5
                  transition-all
                  duration-300
                  hover:bg-white/[0.05]
                  sm:p-6
                "
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm text-zinc-400">
                    Invoices
                  </p>

                  <div className="rounded-xl bg-purple-500/10 p-2 text-purple-400">
                    💳
                  </div>
                </div>

                <h3 className="mt-5 text-3xl font-bold sm:text-4xl">
                  {details?.invoices?.length || 0}
                </h3>
              </div>

              {/* CARD */}
              <div
                className="
                  group
                  rounded-3xl
                  border
                  border-white/10
                  bg-white/[0.03]
                  p-5
                  transition-all
                  duration-300
                  hover:bg-white/[0.05]
                  sm:p-6
                "
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm text-zinc-400">
                    Tickets
                  </p>

                  <div className="rounded-xl bg-orange-500/10 p-2 text-orange-400">
                    🎫
                  </div>
                </div>

                <h3 className="mt-5 text-3xl font-bold sm:text-4xl">
                  {details?.supportTickets?.length || 0}
                </h3>
              </div>

              {/* CARD */}
              <div
                className="
                  group
                  rounded-3xl
                  border
                  border-white/10
                  bg-white/[0.03]
                  p-5
                  transition-all
                  duration-300
                  hover:bg-white/[0.05]
                  sm:p-6
                "
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm text-zinc-400">
                    Notifications
                  </p>

                  <div className="rounded-xl bg-green-500/10 p-2 text-green-400">
                    🔔
                  </div>
                </div>

                <h3 className="mt-5 text-3xl font-bold sm:text-4xl">
                  {details?.notifications?.length || 0}
                </h3>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
);
  };

export default ClientDetailsModal;