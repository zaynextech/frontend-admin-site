import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

interface Client {
  id: string;
  fullName: string;
  email: string;
}

interface Props {
  client: Client | null;

  onClose:
    () => void;

  onUpdated:
    () => void;
}

const ClientEditModal =
  ({
    client,
    onClose,
    onUpdated,
  }: Props) => {

    const [fullName, setFullName] =
      useState("");

    const [email, setEmail] =
      useState("");

    /* eslint-disable react-hooks/set-state-in-effect */
    useEffect(() => {

      if (client) {

        setFullName(
          client.fullName
        );

        setEmail(
          client.email
        );

      }

    }, [client]);

    if (!client) {
      return null;
    }

    const updateClient =
      async () => {

        try {

          const token =
            localStorage.getItem(
              "token"
            );

         await axios.put(
              `${import.meta.env.VITE_API_URL}/admin/clients/${client.id}`,
              {
                fullName,
                email,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

          onUpdated();

          onClose();

        } catch (
          error
        ) {

          console.log(error);

        }
      };
return (
  <div
    className="
      fixed
      inset-0
      z-50
      flex
      items-center
      justify-center
      overflow-y-auto
      bg-black/80
      p-4
      backdrop-blur-xl
      sm:p-6
    "
  >
    
    {/* BACKGROUND GLOW */}
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      
      <div
        className="
          absolute
          left-0
          top-0
          h-[400px]
          w-[400px]
          rounded-full
          bg-white/[0.03]
          blur-3xl
        "
      />

      <div
        className="
          absolute
          bottom-0
          right-0
          h-[350px]
          w-[350px]
          rounded-full
          bg-white/[0.03]
          blur-3xl
        "
      />
    </div>

    {/* MODAL */}
    <div
      className="
        relative
        w-full
        max-w-2xl
        overflow-hidden
        rounded-[32px]
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
          border-b
          border-white/10
          bg-white/[0.02]
          px-6
          py-6
          sm:px-8
        "
      >
        
        <div
          className="
            flex
            flex-col
            gap-5
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          
          {/* LEFT */}
          <div className="flex items-center gap-4">
            
            {/* AVATAR */}
            <div
              className="
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-2xl
                border
                border-white/10
                bg-white/[0.03]
                text-lg
                font-bold
                uppercase
                text-white
              "
            >
              {client.fullName?.charAt(0)}
            </div>

            <div>
              
              <div
                className="
                  mb-2
                  inline-flex
                  rounded-full
                  border
                  border-orange-500/20
                  bg-orange-500/10
                  px-3
                  py-1
                  text-xs
                  font-medium
                  text-orange-400
                "
              >
                Editing Client
              </div>

              <h2
                className="
                  text-2xl
                  font-bold
                  tracking-tight
                  text-white
                "
              >
                Edit Client
              </h2>

              <p className="mt-1 text-sm text-zinc-400">
                Update client information securely
              </p>
            </div>
          </div>

          {/* CLOSE */}
          <button
            onClick={onClose}
            className="
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
            "
          >
            Close
          </button>
        </div>
      </div>

      {/* BODY */}
      <div className="p-6 sm:p-8">
        
        <div className="space-y-6">
          
          {/* FULL NAME */}
          <div>
            
            <label
              className="
                mb-3
                block
                text-sm
                font-medium
                text-zinc-400
              "
            >
              Full Name
            </label>

            <input
              type="text"
              value={fullName}
              onChange={(e) =>
                setFullName(
                  e.target.value
                )
              }
              placeholder="Enter client full name"
              className="
                w-full
                rounded-2xl
                border
                border-white/10
                bg-white/[0.03]
                px-4
                py-3.5
                text-sm
                text-white
                outline-none
                transition-all
                duration-300
                placeholder:text-zinc-600
                focus:border-white/20
                focus:bg-white/[0.05]
              "
            />
          </div>

          {/* EMAIL */}
          <div>
            
            <label
              className="
                mb-3
                block
                text-sm
                font-medium
                text-zinc-400
              "
            >
              Email Address
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
              placeholder="client@example.com"
              className="
                w-full
                rounded-2xl
                border
                border-white/10
                bg-white/[0.03]
                px-4
                py-3.5
                text-sm
                text-white
                outline-none
                transition-all
                duration-300
                placeholder:text-zinc-600
                focus:border-white/20
                focus:bg-white/[0.05]
              "
            />
          </div>

          {/* INFO BOX */}
          <div
            className="
              rounded-2xl
              border
              border-white/10
              bg-white/[0.02]
              p-4
            "
          >
            <p
              className="
                text-xs
                leading-relaxed
                text-zinc-500
              "
            >
              Updating client information will instantly
              reflect across all connected systems and dashboards.
            </p>
          </div>

          {/* ACTIONS */}
          <div
            className="
              flex
              flex-col-reverse
              gap-3
              pt-2
              sm:flex-row
              sm:justify-end
            "
          >
            
            {/* CANCEL */}
            <button
              onClick={onClose}
              className="
                w-full
                rounded-2xl
                border
                border-white/10
                bg-white/[0.03]
                px-5
                py-3.5
                text-sm
                font-medium
                text-white
                transition-all
                duration-300
                hover:bg-white/[0.06]
                sm:w-auto
              "
            >
              Cancel
            </button>

            {/* SAVE */}
            <button
              onClick={updateClient}
              className="
                w-full
                rounded-2xl
                bg-white
                px-6
                py-3.5
                text-sm
                font-semibold
                text-black
                transition-all
                duration-300
                hover:scale-[1.02]
                hover:bg-zinc-200
                active:scale-[0.98]
                sm:w-auto
              "
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);
  };

export default ClientEditModal;