import {
  useEffect,
  useState,
} from "react";

import axios from "axios";
import ClientTable from "../components/clients/ClientTable";

import CreateClientForm from "../components/clients/CreateClientForm";
import ClientDetailsModal from "../components/clients/ClientDetailsModal";
import toast from "react-hot-toast";
import ConfirmModal from "../components/ui/ConfirmModal";
import Loader from "../components/ui/Loader";
import ClientEditModal from "../components/clients/ClientEditModal";



interface Client {
  id: string;
  fullName: string;
  email: string;
  createdAt?: string;

  temporaryPassword?: string;
}

const Clients = () => {

  const [clients, setClients] =
    useState<Client[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [fullName, setFullName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [selectedClient, setSelectedClient] =
    useState<Client | null>(
      null
    );

const [
  editingClient,
  setEditingClient,
] = useState<Client | null>(
  null
);

  /* PASSWORD GENERATOR */
  const generatePassword =
    () => {

      const chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#";

      let generated =
        "";

      for (
        let i = 0;
        i < 10;
        i++
      ) {

        generated +=
          chars.charAt(
            Math.floor(
              Math.random() *
                chars.length
            )
          );
      }

      setPassword(
        generated
      );
    };

  /* FETCH CLIENTS */
  const fetchClients =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        const response =
  await axios.get(
    `${import.meta.env.VITE_API_URL}/admin/clients`,
    {
      headers: {
        Authorization:
          `Bearer ${token}`,
      },
    }
  );

        setClients(
          response.data
            .clients || []
        );

      } catch (
        error
      ) {

        console.log(error);

      } finally {

        setLoading(false);

      }
    };

  useEffect(() => {

    const loadClients =
      async () => {

        await fetchClients();

      };

    loadClients();

  }, []);

/* CREATE CLIENT */
const createClient =
  async () => {

    if (
      !fullName ||
      !email ||
      !password
    ) {

      toast.error(
        "Fill all fields"
      );

      return;
    }

    try {

      const token =
        localStorage.getItem(
          "token"
        );

    const response =
        await axios.post(
          `${import.meta.env.VITE_API_URL}/admin/clients`,
          {
            fullName,
            email,
            password,
          },
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      const newClient = {
        ...response.data.client,

        temporaryPassword:
          response.data
            .temporaryPassword,
      };

      setClients((prev) => [
        newClient,
        ...prev,
      ]);

      setFullName("");
      setEmail("");
      setPassword("");

      toast.success(
        `Client created | Password: ${response.data.temporaryPassword}`
      );

    } catch (
      error
    ) {

      console.log(error);

      toast.error(
        "Failed to create client"
      );

    }
  };

  const handleSendPassword =
  async (
    client: Client
  ) => {

    try {

      if (
        !client.temporaryPassword
      ) {

        toast.error(
          "Reset password first"
        );

        return;
      }

      const token =
        localStorage.getItem(
          "token"
        );

      await axios.post(
        `${import.meta.env.VITE_API_URL}/admin/send-password`,
        {
          email:
            client.email,

          password:
            client.temporaryPassword,
        },
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      toast.success(
        "Password sent to client email"
      );

    } catch (
      error
    ) {

      console.log(error);

      toast.error(
        "Failed to send email"
      );

    }
  };

  /* DELETE CLIENT */
  const handleDelete =
    async (
      id: string
    ) => {

      const confirmed =
        await ConfirmModal({
          title: "Delete this client?",
          text:
            "This action can be reversed later.",
          confirmText:
            "Yes, Delete",
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
        `${import.meta.env.VITE_API_URL}/admin/clients/${id}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

        fetchClients();

        toast.success(
          "Client deleted"
        );

      } catch (
        error
      ) {

        console.log(error);

        toast.error(
          "Failed to delete client"
        );

      }
    };

  /* VIEW */
  const handleView =
    (
      client: Client
    ) => {

      setSelectedClient(
        client
      );
    };

  /* EDIT */
  const handleEdit =
    (
      client: Client
    ) => {

      setEditingClient(
        client
      );
    };

  /* RESET PASSWORD */
const handleResetPassword =
  async (
    client: Client
  ) => {

    try {

      const token =
        localStorage.getItem(
          "token"
        );

    const response =
  await axios.put(
    `${import.meta.env.VITE_API_URL}/admin/clients/${client.id}/reset-password`,
    {},
    {
      headers: {
        Authorization:
          `Bearer ${token}`,
      },
    }
  );

      setClients((prev) =>
        prev.map((item) =>
          item.id === client.id
            ? {
                ...item,

                temporaryPassword:
                  response.data
                    .temporaryPassword,
              }
            : item
        )
      );

      toast.success(
        `New Password: ${response.data.temporaryPassword}`
      );

    } catch (
      error
    ) {

      console.log(error);

      toast.error(
        "Failed to reset password"
      );

    }
  };

  if (loading) {

  return (
    <div
      className="
        flex
        min-h-screen
        items-center
        justify-center
        bg-black
      "
    >
      <Loader />
    </div>
  );
}

return (
  <div
    className="
      relative
      min-h-screen
      overflow-hidden
      bg-black
      text-white
    "
  >
    {/* BACKGROUND */}
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="
          absolute
          left-0
          top-0
          h-[300px]
          w-[300px]
          sm:h-[500px]
          sm:w-[500px]
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
          h-[250px]
          w-[250px]
          sm:h-[400px]
          sm:w-[400px]
          rounded-full
          bg-white/[0.03]
          blur-3xl
        "
      />
    </div>

    {/* CONTENT */}
    <div
      className="
        relative
        z-10
        mx-auto
        w-full
        max-w-[1700px]
        px-4
        py-6
        sm:px-6
        lg:px-8
      "
    >
      {/* HEADER */}
      <div
        className="
          mb-8
          flex
          flex-col
          gap-6
          xl:flex-row
          xl:items-center
          xl:justify-between
        "
      >
        {/* LEFT */}
        <div className="w-full">
          <div
            className="
              mb-4
              inline-flex
              items-center
              rounded-full
              border
              border-white/10
              bg-white/[0.03]
              px-3
              py-1
              text-xs
              font-medium
              text-zinc-400
            "
          >
            Client Management
          </div>

          <h1
            className="
              text-2xl
              sm:text-3xl
              md:text-4xl
              font-bold
              tracking-tight
              text-white
            "
          >
            Clients Dashboard
          </h1>

          <p
            className="
              mt-3
              max-w-2xl
              text-sm
              leading-relaxed
              text-zinc-400
            "
          >
            Manage client accounts, passwords,
            projects, support tickets, and platform access.
          </p>
        </div>

        {/* STATS */}
        <div
          className="
            grid
            w-full
            grid-cols-1
            gap-4
            sm:grid-cols-2
            xl:max-w-md
          "
        >
          <div
            className="
              rounded-3xl
              border
              border-white/10
              bg-white/[0.03]
              p-5
              backdrop-blur-xl
            "
          >
            <p className="text-sm text-zinc-400">
              Total Clients
            </p>

            <h2 className="mt-2 text-2xl sm:text-3xl font-bold">
              {clients.length}
            </h2>
          </div>

          <div
            className="
              rounded-3xl
              border
              border-white/10
              bg-white/[0.03]
              p-5
              backdrop-blur-xl
            "
          >
            <p className="text-sm text-zinc-400">
              System Status
            </p>

            <h2
              className="
                mt-2
                text-2xl
                sm:text-3xl
                font-bold
                text-green-400
              "
            >
              Active
            </h2>
          </div>
        </div>
      </div>

      {/* MAIN GRID */}
<div
  className="
    flex
    flex-col
    gap-6
  "
>
  {/* CREATE FORM */}
  <div className="w-full">
    <CreateClientForm
      fullName={fullName}
      setFullName={setFullName}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      generatePassword={generatePassword}
      createClient={createClient}
    />
  </div>

  {/* CLIENT TABLE */}
  <div
    className="
      w-full
      overflow-x-auto
    "
  >
    <ClientTable
      clients={clients}
      onView={handleView}
      onEdit={handleEdit}
      onDelete={handleDelete}
      onResetPassword={handleResetPassword}
      onSendPassword={handleSendPassword}
    />
  </div>
</div>
      {/* DETAILS MODAL */}
      <ClientDetailsModal
        client={selectedClient}
        onClose={() =>
          setSelectedClient(null)
        }
      />

      {/* EDIT MODAL */}
      {editingClient && (
        <ClientEditModal
          client={editingClient}
          onClose={() =>
            setEditingClient(null)
          }
          onUpdated={fetchClients}
        />
      )}
    </div>
  </div>
);
};

export default Clients;