import { Routes, Route } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";

import Index from "@/pages/Index";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import AdminDashboard from "@/pages/AdminDashboard";
import CustomerDashboard from "@/pages/CustomerDashboard";
import StaffDashboard from "@/pages/StaffDashboard";
import NotFound from "@/pages/NotFound";

const AppRoutes = () => {
  return (
    <Routes>

      {/* Layout Routes */}
      <Route element={<MainLayout />}>

        <Route path="/" element={<Index />} />

      </Route>

      {/* Auth Pages */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Dashboard */}
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/customer" element={<CustomerDashboard />} />
      <Route path="/staff" element={<StaffDashboard />} />

      {/* 404 */}
      <Route path="*" element={<NotFound />} />

    </Routes>
  );
};

export default AppRoutes;