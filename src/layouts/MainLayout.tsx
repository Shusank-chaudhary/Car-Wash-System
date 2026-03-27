import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <HeroSection />

      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  );
};

export default MainLayout;