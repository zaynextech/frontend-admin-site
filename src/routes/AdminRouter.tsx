import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Login from "../pages/Login";

import Dashboard from "../pages/Dashboard";

import Leads from "../pages/Leads";
import Quotes from "../pages/Quotes";
import Bookings from "../pages/Bookings";

import PortfolioManager from "../pages/PortfolioManager";
import BlogManager from "../pages/BlogManager";

import SecurityLogs from "../pages/SecurityLogs";
import GlobalManager from "../pages/GlobalManager";

/* NEW */
import Projects from "../pages/Projects";
import Milestones from "../pages/Milestones";
import Support from "../pages/Support";
import Files from "../pages/Files";
import Notifications from "../pages/Notifications";

import AdminLayout from "../layouts/AdminLayout";

import ProtectedRoute from "./ProtectedRoute";
import Clients from "../pages/Clients";
import LeadDetails from "../pages/LeadDetails";
import ProjectDetails from "../pages/ProjectDetails";
import Messages from "../pages/Messages";
import ArchivedMessages from "../pages/ArchivedMessages";
import AdminPayments from "../pages/Payment";

const AdminRouter = () => {

  return (
    <BrowserRouter>

      <Routes>

        {/* AUTH */}
        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        {/* PROTECTED */}
        <Route
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >

          {/* DASHBOARD */}
          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          {/* CLIENT MANAGEMENT */}
          <Route
            path="/projects"
            element={<Projects />}
          />

          <Route
            path="/milestones"
            element={<Milestones />}
          />

          <Route
            path="/payments"
            element={<AdminPayments />}
          />

          <Route
            path="/support"
            element={<Support />}
          />

          <Route
            path="/files"
            element={<Files />}
          />

          <Route
            path="/notifications"
            element={<Notifications />}
          />

          {/* SALES */}
          <Route
            path="/leads"
            element={<Leads />}
          />

          <Route
            path="/quotes"
            element={<Quotes />}
          />

          <Route
            path="/bookings"
            element={<Bookings />}
          />

          {/* CONTENT */}
          <Route
            path="/portfolio"
            element={<PortfolioManager />}
          />

          <Route
            path="/blog"
            element={<BlogManager />}
          />

          {/* SECURITY */}
          <Route
            path="/security"
            element={<SecurityLogs />}
          />

          {/* GLOBAL */}
          <Route
            path="/globalpresence"
            element={<GlobalManager />}
          />

          <Route
            path="/clients"
            element={<Clients />}
          />

        </Route>

        <Route
        path="/leads/:id"
        element={<LeadDetails />}
      />

      <Route
        path="/projects/:id"
        element={<ProjectDetails />}
      />

      <Route
          path="/messages"
          element={<Messages />}
        />

        <Route
          path="/messages/archived"
          element={
            <ArchivedMessages />
          }
        />

      </Routes>

    </BrowserRouter>
  );
};

export default AdminRouter;