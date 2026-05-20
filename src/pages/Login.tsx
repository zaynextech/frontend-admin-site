import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LockKeyhole, Mail, ShieldCheck } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { toast } from "react-hot-toast/headless";
import InteractiveGrid from "../components/ui/interactive-grid";
import { Logo } from "../components/Logo";

const Login = () => {
  const navigate = useNavigate();
  const { login, token, user } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [cooldown, setCooldown] = useState(0);
  const [accessCode, setAccessCode] =
  useState("");

const [accessGranted, setAccessGranted] =
  useState(false);

  /* REDIRECT LOGGED USERS */
  useEffect(() => {
    if (!token || !user) return;
    if (user.role === "CLIENT") {
      navigate("/", { replace: true });
    } else {
      navigate("/dashboard", { replace: true });
    }
  }, [token, user, navigate]);

  /* COOLDOWN TIMER */
  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => {
      setCooldown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  const unlockPortal = () => {

  if (
    accessCode.trim() === "Quiriko"
  ) {

    setAccessGranted(true);

    setError("");

    return;
  }

  setError(
    "Unauthorized access."
  );
};

  /* LOGIN LOGIC */
  /* LOGIN LOGIC */
const submitLogin = async () => {

  // Prevent spam requests
  if (loading || cooldown > 0) return;

  // Clean inputs
  const cleanEmail = email.trim();
  const cleanPassword = password.trim();

  // Email required
  if (!cleanEmail) {

    setError(
      "Email address is required."
    );

    return;
  }

  // Email validation
  const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(cleanEmail)) {

    setError(
      "Enter a valid email address."
    );

    return;
  }

  // Password required
  if (!cleanPassword) {

    setError(
      "Password is required."
    );

    return;
  }

  // Password length
  if (cleanPassword.length < 6) {

    setError(
      "Invalid credentials."
    );

    return;
  }

  try {

    setLoading(true);

    setError("");

    // Secure delay
    await new Promise((resolve) =>
      setTimeout(resolve, 1000)
    );

    // Request
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        {
          email: cleanEmail,
          password: cleanPassword,
        },
        {
          timeout: 10000,
        }
      );
    // Missing token check
    if (
      !res.data?.token ||
      !res.data?.user
    ) {

      setError(
        "Authentication failed."
      );

      return;
    }

    // Save auth
    login(
      res.data.user,
      res.data.token
    );

    toast.success(
      "Authentication successful"
    );

    // Role redirect
    if (
      res.data.user.role === "CLIENT"
    ) {

      navigate("/", {
        replace: true,
      });

    } else {

      navigate("/dashboard", {
        replace: true,
      });
    }

  } catch (error: unknown) {

    console.log(error);

    // Rate limit
    if (
      axios.isAxiosError(error) &&
      error.response?.status === 429
    ) {

      setError(
        "Too many login attempts."
      );

      setCooldown((prev) =>
        prev >= 30 ? 30 : prev + 5
      );

      return;
    }

    // Generic auth error
    setError(
      "Invalid credentials or unauthorized access."
    );

    // Escalating cooldown
    setCooldown((prev) =>
      prev >= 30 ? 30 : prev + 5
    );

    toast.error(
      "Authentication failed"
    );

  } finally {

    setLoading(false);
  }
};

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#030303] px-6 py-20 text-white">

  {/* Background */}
  <div className="absolute inset-0 z-0">
        <img
      src="/images/bg.jpg"
      alt="Background"
      className="absolute inset-0 h-full w-full scale-105 object-cover opacity-30 blur-[3px]"
    />


        <div className="absolute inset-0 bg-black/50" />

        <div className="absolute inset-0 " />
        
          <InteractiveGrid />
        
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-md">
        {/* Header/Logo Section */}
        <div className="mb-10 flex flex-col items-center text-center">
          <Logo />
          
          <p className="mt-8 text-[10px] uppercase tracking-[0.4em] text-cyan-500 font-black antialiased">
            Secure Infrastructure
          </p>

          <h1 className="mt-4 text-4xl lg:text-5xl font-black leading-none tracking-tighter">
            Secure Portal
          </h1>

          <p className="mt-4 text-sm text-slate-400 font-light max-w-[280px] leading-relaxed">
            Enterprise authentication for authorized Zaynex personnel.
          </p>
        </div>

        {/* Form Card */}
        <div className="space-y-5 rounded-[2.5rem]  p-8 backdrop-blur-2xl shadow-2xl">

  {!accessGranted ? (

    <>
      <div className="space-y-2">

        <label className="ml-1 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-50">
          Security Access Key
        </label>

        <div className="flex items-center gap-3 rounded-2xl border border-white/5 bg-[#030303]/40 px-4 transition-all duration-300 focus-within:border-cyan-500/40">

          <ShieldCheck
            size={18}
            className="text-zinc-500"
          />

          <input
            type="password"
            placeholder="Enter access key"
            className="w-full bg-transparent py-4 text-sm outline-none placeholder:text-zinc-500"
            value={accessCode}
            onChange={(e) =>
              setAccessCode(
                e.target.value
              )
            }
            onKeyDown={(e) =>
              e.key === "Enter" &&
              unlockPortal()
            }
          />
        </div>
      </div>

      <button
        onClick={unlockPortal}
        className="w-full rounded-2xl bg-white py-4 text-xs font-black uppercase tracking-[0.2em] text-black transition-all hover:bg-cyan-400 active:scale-[0.98]"
      >
        Verify Access
      </button>
    </>

  ) : (

    <>
      {/* EMAIL */}

      <div className="space-y-2">

        <label className="ml-1 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
          Work Email
        </label>

        <div className="flex items-center gap-3 rounded-2xl border border-white/5 bg-black/80 px-4 transition-all duration-300 focus-within:border-cyan-500/40">

          <Mail
            size={18}
            className="text-zinc-600"
          />

          <input
            type="email"
            placeholder="admin@zaynex.com"
            className="w-full bg-transparent py-4 text-sm outline-none placeholder:text-zinc-700"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
          />
        </div>
      </div>

      {/* PASSWORD */}

      <div className="space-y-2">

        <label className="ml-1 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
          Access Password
        </label>

        <div className="flex items-center gap-3 rounded-2xl border border-white/5 bg-black/40 px-4 transition-all duration-300 focus-within:border-cyan-500/40">

          <LockKeyhole
            size={18}
            className="text-zinc-600"
          />

          <input
            type="password"
            placeholder="••••••••••"
            className="w-full bg-transparent py-4 text-sm outline-none placeholder:text-zinc-700"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            onKeyDown={(e) =>
              e.key === "Enter" &&
              submitLogin()
            }
          />
        </div>
      </div>

      <button
        onClick={submitLogin}
        disabled={
          loading ||
          cooldown > 0
        }
        className="group relative w-full overflow-hidden rounded-2xl bg-white py-4 text-xs font-black uppercase tracking-[0.2em] text-black transition-all hover:bg-cyan-400 active:scale-[0.98] disabled:opacity-50"
      >

        {loading ? (
          "Authenticating..."
        ) : cooldown > 0 ? (
          `Retry in ${cooldown}s`
        ) : (
          <span className="flex items-center justify-center gap-2">
            Secure Access
            <ShieldCheck size={16} />
          </span>
        )}
      </button>
    </>
  )}

  {error && (
    <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4 text-[11px] font-bold uppercase tracking-wider text-red-400">
      {error}
    </div>
  )}
</div>
     
      </div>
    </div>
  );
};

export default Login;