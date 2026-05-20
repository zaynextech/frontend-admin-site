import {
  Eye,
  Pencil,
  Trash2,
  KeyRound,
  Mail,
} from "lucide-react";

import {
  useState,
} from "react";

interface Client {
  id: string;
  fullName: string;
  email: string;
  createdAt?: string;
  temporaryPassword?: string;
}

interface Props {
  client: Client;

  onView: (
    client: Client
  ) => void;

  onEdit: (
    client: Client
  ) => void;

  onDelete: (
    id: string
  ) => void;

  onResetPassword: (
    client: Client
  ) => void;

  onSendPassword: (
    client: Client
  ) => void;
}

const ClientRow = ({
  client,
  onView,
  onEdit,
  onDelete,
  onResetPassword,
  onSendPassword,
}: Props) => {

  const [
    showPassword,
    setShowPassword,
  ] = useState(false);

 return (
  <tr
    className="
      border-b
      border-white/5
      transition-colors
      duration-200
      hover:bg-white/[0.02]
    "
  >
    {/* CLIENT */}
    <td className="px-3 py-3">
      <div className="flex items-center gap-3">
        {/* AVATAR */}
        <div
          className="
            flex
            h-8
            w-8
            shrink-0
            items-center
            justify-center
            rounded-xl
            border
            border-white/10
            bg-white/[0.03]
            text-xs
            font-semibold
            uppercase
            text-white
          "
        >
          {client.fullName?.charAt(0)}
        </div>

        {/* INFO */}
        <div className="min-w-0">
          <h3
            className="
              truncate
              text-sm
              font-medium
              text-white
            "
          >
            {client.fullName}
          </h3>

          <p
            className="
              mt-0.5
              truncate
              text-[11px]
              text-zinc-500
            "
          >
            Client
          </p>
        </div>
      </div>
    </td>

    {/* EMAIL */}
    <td className="px-2 py-3">
      <div className="min-w-[170px]">
        <p
          className="
            truncate
            text-sm
            text-zinc-300
          "
        >
          {client.email}
        </p>

        <p className="mt-0.5 text-[11px] text-zinc-500">
          Verified
        </p>
      </div>
    </td>

    {/* CREATED */}
    <td className="px-2 py-3">
      <div
        className="
          inline-flex
          whitespace-nowrap
          rounded-lg
          border
          border-white/10
          bg-white/[0.03]
          px-2.5
          py-1.5
          text-xs
          text-zinc-300
        "
      >
        {client.createdAt
          ? new Date(
              client.createdAt
            ).toLocaleDateString()
          : "-"}
      </div>
    </td>

    {/* PASSWORD */}
    <td className="px-2 py-3">
      <div
        className="
          flex
          items-center
          gap-1.5
          rounded-xl
          border
          border-white/10
          bg-white/[0.03]
          px-2
          py-2
        "
      >
        {/* PASSWORD */}
        <span
          className="
            max-w-[80px]
            truncate
            text-xs
            text-zinc-300
          "
        >
          {showPassword
            ? client.temporaryPassword || "No Password"
            : "••••••••"}
        </span>

        {/* SHOW */}
        <button
          type="button"
          onClick={() =>
            setShowPassword(
              !showPassword
            )
          }
          className="
            rounded-md
            border
            border-cyan-500/20
            bg-cyan-500/10
            px-1.5
            py-1
            text-[10px]
            font-medium
            text-cyan-400
            transition-all
            hover:bg-cyan-500/20
          "
        >
          {showPassword
            ? "Hide"
            : "Show"}
        </button>

        {/* RESET */}
        <button
          type="button"
          onClick={() =>
            onResetPassword(client)
          }
          className="
            flex
            h-7
            w-7
            items-center
            justify-center
            rounded-lg
            border
            border-white/10
            bg-white/[0.03]
            text-cyan-400
            transition-all
            hover:bg-cyan-500/10
          "
        >
          <KeyRound size={13} />
        </button>

        {/* SEND */}
        <button
          type="button"
          onClick={() =>
            onSendPassword(client)
          }
          className="
            flex
            h-7
            w-7
            items-center
            justify-center
            rounded-lg
            border
            border-white/10
            bg-white/[0.03]
            text-green-400
            transition-all
            hover:bg-green-500/10
          "
        >
          <Mail size={13} />
        </button>
      </div>
    </td>

    {/* ACTIONS */}
    <td className="px-2 py-3">
      <div className="flex items-center gap-1.5">
        {/* VIEW */}
        <button
          onClick={() =>
            onView(client)
          }
          className="
            flex
            h-8
            w-8
            items-center
            justify-center
            rounded-lg
            border
            border-cyan-500/20
            bg-cyan-500/10
            text-cyan-400
            transition-all
            hover:bg-cyan-500/20
          "
        >
          <Eye size={14} />
        </button>

        {/* EDIT */}
        <button
          onClick={() =>
            onEdit(client)
          }
          className="
            flex
            h-8
            w-8
            items-center
            justify-center
            rounded-lg
            border
            border-orange-500/20
            bg-orange-500/10
            text-orange-400
            transition-all
            hover:bg-orange-500/20
          "
        >
          <Pencil size={14} />
        </button>

        {/* DELETE */}
        <button
          onClick={() =>
            onDelete(client.id)
          }
          className="
            flex
            h-8
            w-8
            items-center
            justify-center
            rounded-lg
            border
            border-red-500/20
            bg-red-500/10
            text-red-400
            transition-all
            hover:bg-red-500/20
          "
        >
          <Trash2 size={14} />
        </button>
      </div>
    </td>
  </tr>
);
};

export default ClientRow;