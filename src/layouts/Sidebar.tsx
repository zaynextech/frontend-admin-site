"use client";

import {
  useEffect,
  useState,
  useCallback,
} from "react";

import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import axios from "axios";

import {
  LayoutDashboard,
  Globe,
  Briefcase,
  FolderKanban,
  ClipboardCheck,
  Receipt,
  LifeBuoy,
  FolderOpen,
  Bell,
  ShieldAlert,
  LogOut,
  ChevronRight,
  Users,
  Menu,
  X,
} from "lucide-react";

import {
  useAuth,
} from "../hooks/useAuth";

import {
  Logo,
} from "../components/Logo";

const menuGroups = [
  {
    group: "Workspace",
    links: [
      {
        name: "Dashboard",
        path: "/dashboard",
        icon: LayoutDashboard,
      },

      {
        name: "Clients",
        path: "/clients",
        icon: Users,
      },

      {
        name: "Projects",
        path: "/projects",
        icon: FolderKanban,
      },

      {
        name: "Milestones",
        path: "/milestones",
        icon: ClipboardCheck,
      },

      {
        name: "payment",
        path: "/payments",
        icon: Receipt,
      },

      {
        name: "Messages",
        path: "/messages",
        icon: LifeBuoy,
      },

      {
        name: "Files",
        path: "/files",
        icon: FolderOpen,
      },

      {
        name: "Notifications",
        path: "/notifications",
        icon: Bell,
      },
    ],
  },

  {
    group: "Business",
    links: [
      {
        name: "Portfolio",
        path: "/portfolio",
        icon: Briefcase,
      },

      {
        name: "Global Presence",
        path: "/globalpresence",
        icon: Globe,
      },

      {
        name: "Lead Management",
        path: "/leads",
        icon: FolderKanban,
      },
    ],
  },

  {
    group: "Security",
    links: [
      {
        name: "Security Logs",
        path: "/security",
        icon: ShieldAlert,
      },
    ],
  },
];

const AdminSidebar = () => {

  const location =
    useLocation();

  const navigate =
    useNavigate();

  const { logout } =
    useAuth();

  const [
    unreadNotifications,
    setUnreadNotifications,
  ] = useState(0);

  const [
    unreadMessages,
    setUnreadMessages,
  ] = useState(0);

  const [mobileOpen, setMobileOpen] =
    useState(false);

  const fetchCounts =
    useCallback(
      async (
        signal?: AbortSignal
      ) => {

        try {

          const token =
            localStorage.getItem(
              "token"
            );

          const config = {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },

            signal,
          };

        const [
        notifRes,
        roomsRes,
      ] = await Promise.all([
        axios.get(
          `${import.meta.env.VITE_API_URL}/notifications/my-notifications`,
          config
        ),

        axios.get(
          `${import.meta.env.VITE_API_URL}/chat/rooms`,
          config
        ),
      ]);

          const unreadNotifs =
            notifRes.data.notifications.filter(
              (
                n: {
                  read: boolean;
                }
              ) => !n.read
            ).length;

          let totalUnreadMsgs = 0;

          roomsRes.data.rooms.forEach(
            (
              room: {
                messages: unknown[];
              }
            ) => {

              totalUnreadMsgs +=
                room.messages?.length || 0;

            }
          );

          setUnreadNotifications(
            unreadNotifs
          );

          setUnreadMessages(
            totalUnreadMsgs
          );

        } catch (
          error
        ) {

          if (
            !axios.isCancel(
              error
            )
          ) {

            console.error(
              error
            );

          }
        }
      },
      []
    );

useEffect(() => {

  const controller =
    new AbortController();

  const initSidebar =
    async () => {

      await fetchCounts(
        controller.signal
      );

    };

  initSidebar();

  const interval =
    setInterval(
      () => {

        fetchCounts(
          controller.signal
        );

      },
      10000
    );

  return () => {

    controller.abort();

    clearInterval(
      interval
    );

  };

}, [fetchCounts]);

  const handleLogout =
    () => {

      logout();

      navigate("/");

    };

  return (
    <>

      {/* MOBILE TOPBAR */}
      <div className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-white/10 bg-black/80 px-4 backdrop-blur-xl lg:hidden">

        <Logo />

        <button
          onClick={() =>
            setMobileOpen(
              !mobileOpen
            )
          }

          className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03]"
        >

          {mobileOpen ? (
            <X size={20} />
          ) : (
            <Menu size={20} />
          )}

        </button>

      </div>

      {/* OVERLAY */}
      {mobileOpen && (

        <div
          onClick={() =>
            setMobileOpen(
              false
            )
          }

          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
        />

      )}

      {/* SIDEBAR */}
      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-[290px] flex-col border-r border-white/10 bg-[#050505]/95 backdrop-blur-2xl transition-all duration-300

        ${
          mobileOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }

        lg:translate-x-0`}
      >

        {/* HEADER */}
        <div className="border-b border-white/5 px-6 py-7">

          <div className="flex items-center justify-between">

            <div className="flex flex-col gap-1">

              <Logo />

              <p className="text-[10px] uppercase tracking-[0.35em] text-cyan-500/60 font-bold">

                Enterprise Workspace

              </p>

            </div>

            <div className="hidden items-center gap-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/5 px-2.5 py-1 text-[10px] font-bold text-cyan-400 sm:flex">

              <span className="relative flex h-2 w-2">

                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />

                <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-500" />

              </span>

              LIVE

            </div>

          </div>

        </div>

        {/* NAVIGATION */}
        <div className="flex-1 overflow-y-auto px-4 py-6">

          {menuGroups.map(
            (
              group,
              idx
            ) => (

              <div
                key={
                  group.group
                }

                className={
                  idx !== 0
                    ? "mt-8"
                    : ""
                }
              >

                <h3 className="mb-4 px-4 text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-600">

                  {group.group}

                </h3>

                <div className="space-y-1">

                  {group.links.map(
                    (
                      item
                    ) => {

                      const Icon =
                        item.icon;

                      const active =
                        location.pathname ===
                        item.path;

                      const isMessages =
                        item.path ===
                        "/messages";

                      const isNotifications =
                        item.path ===
                        "/notifications";

                      return (
                        <Link
                          key={
                            item.name
                          }

                          to={
                            item.path
                          }

                          onClick={() =>
                            setMobileOpen(
                              false
                            )
                          }

                          className={`group flex items-center justify-between rounded-2xl px-4 py-3 transition-all duration-200

                          ${
                            active
                              ? "border border-cyan-500/10 bg-cyan-500/10 text-cyan-300"
                              : "text-zinc-400 hover:bg-white/[0.03] hover:text-white"
                          }`}
                        >

                          <div className="flex items-center gap-3">

                            <Icon
                              size={18}
                            />

                            <span className="text-sm font-medium">

                              {
                                item.name
                              }

                            </span>

                          </div>

                          <div className="flex items-center gap-2">

                            {isMessages &&
                              unreadMessages >
                                0 && (

                              <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-500 px-1.5 text-[10px] font-bold text-white">

                                {
                                  unreadMessages
                                }

                              </span>

                            )}

                            {isNotifications &&
                              unreadNotifications >
                                0 && (

                              <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-cyan-500 px-1.5 text-[10px] font-bold text-black">

                                {
                                  unreadNotifications
                                }

                              </span>

                            )}

                            <ChevronRight
                              size={14}
                              className={`transition-all

                              ${
                                active
                                  ? "translate-x-1 opacity-100"
                                  : "opacity-0 group-hover:translate-x-1 group-hover:opacity-100"
                              }`}
                            />

                          </div>

                        </Link>
                      );
                    }
                  )}

                </div>

              </div>
            )
          )}

        </div>

        {/* FOOTER */}
        <div className="border-t border-white/5 p-4">

          <div className="mb-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4">

            <div className="flex items-center justify-between">

              <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-600">

                System Status

              </p>

              <div className="h-2 w-2 rounded-full bg-green-500 shadow-[0_0_10px_#22c55e]" />

            </div>

            <p className="mt-2 text-xs text-zinc-400">

              All systems operational

            </p>

          </div>

          <button
            onClick={
              handleLogout
            }

            className="group flex h-12 w-full items-center justify-center gap-3 rounded-2xl border border-red-500/10 bg-red-500/10 text-sm font-semibold text-red-400 transition-all hover:bg-red-500 hover:text-white"
          >

            <LogOut
              size={18}
              className="transition-transform group-hover:-translate-x-1"
            />

            Logout Session

          </button>

        </div>

      </aside>

      {/* DESKTOP SPACER */}
      <div className="hidden w-[290px] lg:block" />

    </>
  );
};

export default AdminSidebar;