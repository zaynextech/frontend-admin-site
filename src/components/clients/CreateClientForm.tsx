import type {
  Dispatch,
  SetStateAction,
} from "react";

import {
  Copy,
  RefreshCw,
  Shield,
  UserPlus,
} from "lucide-react";

import toast from "react-hot-toast";

interface Props {
  fullName: string;

  setFullName:
    Dispatch<
      SetStateAction<string>
    >;

  email: string;

  setEmail:
    Dispatch<
      SetStateAction<string>
    >;

  password: string;

  setPassword:
    Dispatch<
      SetStateAction<string>
    >;

  generatePassword:
    () => void;

  createClient:
    () => void;
}

const CreateClientForm = ({
  fullName,
  setFullName,

  email,
  setEmail,

  password,
  setPassword,

  generatePassword,
  createClient,
}: Props) => {

  const copyPassword =
    async () => {

      if (!password) {
        return;
      }

      await navigator.clipboard.writeText(
        password
      );

      toast.success(
        "Password copied"
      );
    };

 return (
  <div
    className="
      overflow-hidden
      rounded-[20px]
      border
      border-white/10
      bg-[#0a0a0a]/90
      shadow-[0_0_40px_rgba(255,255,255,0.02)]
      backdrop-blur-2xl
    "
  >
    {/* HEADER */}
    <div
      className="
        border-b
        border-white/10
        bg-white/[0.02]
        px-4
        py-4
      "
    >
      <div className="flex items-center gap-3">
        {/* ICON */}
        <div
          className="
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-xl
            border
            border-white/10
            bg-white/[0.03]
          "
        >
          <UserPlus
            size={18}
            className="text-white"
          />
        </div>

        {/* TEXT */}
        <div className="min-w-0">
          <h2
            className="
              text-base
              font-semibold
              text-white
            "
          >
            Create Client
          </h2>

          <p className="mt-0.5 text-xs text-zinc-500">
            Create secure client accounts
          </p>
        </div>
      </div>
    </div>

    {/* BODY */}
    <div className="p-4">
      {/* FORM */}
      <div className="grid gap-4">
        {/* NAME */}
        <div>
          <label
            className="
              mb-2
              block
              text-xs
              font-medium
              text-zinc-500
            "
          >
            Full Name
          </label>

          <input
            type="text"
            placeholder="John Doe"
            value={fullName}
            onChange={(e) =>
              setFullName(
                e.target.value
              )
            }
            className="
              w-full
              rounded-xl
              border
              border-white/10
              bg-white/[0.03]
              px-3
              py-2.5
              text-sm
              text-white
              outline-none
              transition-all
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
              mb-2
              block
              text-xs
              font-medium
              text-zinc-500
            "
          >
            Email Address
          </label>

          <input
            type="email"
            placeholder="client@example.com"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            className="
              w-full
              rounded-xl
              border
              border-white/10
              bg-white/[0.03]
              px-3
              py-2.5
              text-sm
              text-white
              outline-none
              transition-all
              placeholder:text-zinc-600
              focus:border-white/20
              focus:bg-white/[0.05]
            "
          />
        </div>

        {/* PASSWORD */}
        <div>
          <div className="mb-2 flex items-center gap-2">
            <Shield
              size={14}
              className="text-zinc-500"
            />

            <label
              className="
                text-xs
                font-medium
                text-zinc-500
              "
            >
              Secure Password
            </label>
          </div>

          <input
            type="text"
            placeholder="Generate secure password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            className="
              w-full
              rounded-xl
              border
              border-white/10
              bg-white/[0.03]
              px-3
              py-2.5
              text-sm
              text-white
              outline-none
              transition-all
              placeholder:text-zinc-600
              focus:border-white/20
              focus:bg-white/[0.05]
            "
          />

          {/* BUTTONS */}
          <div className="mt-3 flex gap-2">
            {/* GENERATE */}
            <button
              type="button"
              onClick={
                generatePassword
              }
              className="
                flex
                flex-1
                items-center
                justify-center
                gap-2
                rounded-xl
                border
                border-white/10
                bg-white
                px-3
                py-2.5
                text-xs
                font-semibold
                text-black
                transition-all
                hover:bg-zinc-200
              "
            >
              <RefreshCw size={14} />

              Generate
            </button>

            {/* COPY */}
            <button
              type="button"
              onClick={
                copyPassword
              }
              className="
                flex
                flex-1
                items-center
                justify-center
                gap-2
                rounded-xl
                border
                border-white/10
                bg-white/[0.03]
                px-3
                py-2.5
                text-xs
                font-semibold
                text-white
                transition-all
                hover:bg-white/[0.06]
              "
            >
              <Copy size={14} />

              Copy
            </button>
          </div>

          {/* INFO */}
          <div
            className="
              mt-3
              rounded-xl
              border
              border-white/10
              bg-white/[0.02]
              p-3
            "
          >
            <p
              className="
                text-[11px]
                leading-relaxed
                text-zinc-500
              "
            >
              Passwords are encrypted securely after account creation.
            </p>
          </div>
        </div>

        {/* ACTION */}
        <button
          type="button"
          onClick={
            createClient
          }
          className="
            mt-2
            flex
            w-full
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-white
            px-4
            py-3
            text-xs
            font-semibold
            text-black
            transition-all
            hover:bg-zinc-200
          "
        >
          <UserPlus size={16} />

          Create Client
        </button>
      </div>
    </div>
  </div>
);
};

export default CreateClientForm;