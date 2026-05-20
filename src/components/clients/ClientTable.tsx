import ClientRow from "./ClientRow";

interface Client {
  id: string;
  fullName: string;
  email: string;
  createdAt?: string;
  temporaryPassword?: string;
}

interface Props {
  clients: Client[];

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

const ClientTable = ({
  clients,
  onView,
  onEdit,
  onDelete,
  onResetPassword,
  onSendPassword,
}: Props) => {

return (
  <div
    className="
      overflow-hidden
      rounded-[24px]
      border
      border-white/10
      bg-[#0a0a0a]/90
      shadow-[0_0_60px_rgba(255,255,255,0.03)]
      backdrop-blur-2xl
    "
  >
    {/* HEADER */}
    <div
      className="
        flex
        flex-col
        gap-4
        border-b
        border-white/10
        bg-white/[0.02]
        px-4
        py-4
        sm:flex-row
        sm:items-center
        sm:justify-between
      "
    >
      <div className="min-w-0">
        <div
          className="
            mb-2
            inline-flex
            items-center
            rounded-full
            border
            border-white/10
            bg-white/[0.03]
            px-2.5
            py-1
            text-[11px]
            font-medium
            text-zinc-400
          "
        >
          Client Directory
        </div>

        <h2
          className="
            text-lg
            font-semibold
            tracking-tight
            text-white
          "
        >
          Clients
        </h2>

        <p className="mt-1 text-xs text-zinc-500">
          Manage and monitor platform clients
        </p>
      </div>

      {/* COUNT */}
      <div
        className="
          inline-flex
          w-fit
          items-center
          rounded-xl
          border
          border-white/10
          bg-white/[0.03]
          px-3
          py-1.5
          text-xs
          font-medium
          text-zinc-300
        "
      >
        {clients.length} Clients
      </div>
    </div>

    {/* TABLE */}
    <div
      className="
        w-full
        overflow-x-auto
      "
    >
      <table className="w-full min-w-[900px]">
        {/* HEAD */}
        <thead
          className="
            border-b
            border-white/10
            bg-white/[0.02]
          "
        >
          <tr className="text-left">
            <th
              className="
                px-3
                py-3
                text-xs
                font-medium
                uppercase
                tracking-wide
                text-zinc-500
              "
            >
              Client
            </th>

            <th
              className="
                px-3
                py-3
                text-xs
                font-medium
                uppercase
                tracking-wide
                text-zinc-500
              "
            >
              Email
            </th>

            <th
              className="
                px-3
                py-3
                text-xs
                font-medium
                uppercase
                tracking-wide
                text-zinc-500
              "
            >
              Created
            </th>

            <th
              className="
                px-3
                py-3
                text-xs
                font-medium
                uppercase
                tracking-wide
                text-zinc-500
              "
            >
              Password
            </th>

            <th
              className="
                px-3
                py-3
                text-xs
                font-medium
                uppercase
                tracking-wide
                text-zinc-500
              "
            >
              Actions
            </th>
          </tr>
        </thead>

        {/* BODY */}
        <tbody>
          {clients.length === 0 ? (
            <tr>
              <td
                colSpan={5}
                className="
                  px-6
                  py-20
                  text-center
                "
              >
                <div className="flex flex-col items-center">
                  <div className="mb-4 text-5xl">
                    👥
                  </div>

                  <h3
                    className="
                      text-lg
                      font-semibold
                      text-white
                    "
                  >
                    No Clients Found
                  </h3>

                  <p className="mt-2 text-sm text-zinc-500">
                    Create your first client account
                  </p>
                </div>
              </td>
            </tr>
          ) : (
            clients.map((client) => (
              <ClientRow
                key={client.id}
                client={client}
                onView={onView}
                onEdit={onEdit}
                onDelete={onDelete}
                onResetPassword={onResetPassword}
                onSendPassword={onSendPassword}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  </div>
);
};

export default ClientTable;