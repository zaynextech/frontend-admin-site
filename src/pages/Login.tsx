import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Login = () => {

  const navigate =
    useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  /* REDIRECT IF LOGGED */
  useEffect(() => {

    const token =
      localStorage.getItem(
        "token"
      );

    const user =
      localStorage.getItem(
        "user"
      );

    if (
      token &&
      user
    ) {

      navigate(
        "/dashboard",
        {
          replace: true,
        }
      );
    }

  }, [navigate]);

  /* LOGIN */
  const submitLogin =
    async (
      e?: React.FormEvent
    ) => {

      e?.preventDefault();

      if (
        loading
      ) return;

      if (
        !email ||
        !password
      ) {

        setError(
          "Email and password required"
        );

        return;
      }

      try {

        setLoading(true);

        setError("");

        const response =
          await axios.post(
            `${import.meta.env.VITE_API_URL}/auth/login`,
            {
              email:
                email.trim(),

              password:
                password.trim(),
            },
            {
              withCredentials: true,
            }
          );

        const data =
          response.data;

        if (
          !data?.token ||
          !data?.user
        ) {

          setError(
            "Authentication failed"
          );

          return;
        }

        /* SAVE AUTH */
        localStorage.setItem(
          "token",
          data.token
        );

        localStorage.setItem(
          "user",
          JSON.stringify(
            data.user
          )
        );

        localStorage.setItem(
          "role",
          data.user.role
        );

        toast.success(
          "Login successful"
        );

        window.location.href =
          "/dashboard";

      } catch (
  error: unknown
) {

  console.log(
    error
  );

  if (
    axios.isAxiosError(error)
  ) {

    setError(
      error.response?.data
        ?.message ||
        "Login failed"
    );

  } else {

    setError(
      "Login failed"
    );
  }

  toast.error(
    "Login failed"
  );

} finally {

  setLoading(false);
}
    };

  return (

    <div className="flex min-h-screen items-center justify-center bg-black px-6">

      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-zinc-950 p-8">

        <div className="mb-8 text-center">

          <h1 className="text-3xl font-bold text-white">
            Admin Login
          </h1>

          <p className="mt-2 text-sm text-zinc-400">
            Zaynex Secure Portal
          </p>

        </div>

        <form
          onSubmit={
            submitLogin
          }
          className="space-y-5"
        >

          {/* EMAIL */}
          <div>

            <label className="mb-2 block text-sm text-zinc-300">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
              placeholder="admin@zaynex.tech"
              className="w-full rounded-2xl border border-white/10 bg-black px-4 py-4 text-white outline-none focus:border-cyan-500"
            />

          </div>

          {/* PASSWORD */}
          <div>

            <label className="mb-2 block text-sm text-zinc-300">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              placeholder="••••••••"
              className="w-full rounded-2xl border border-white/10 bg-black px-4 py-4 text-white outline-none focus:border-cyan-500"
            />

          </div>

          {/* ERROR */}
          {error && (

            <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400">

              {error}

            </div>
          )}

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-white py-4 font-semibold text-black transition hover:bg-cyan-400 disabled:opacity-50"
          >

            {loading
              ? "Authenticating..."
              : "Login"}

          </button>

        </form>

      </div>

    </div>
  );
};

export default Login;