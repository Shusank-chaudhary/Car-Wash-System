import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/lib/auth-context";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Pricing", href: "#pricing" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Contact", href: "#contact" },
  { label: "About-Us", href: "#about" },
  { label: "Gallery", href: "#gallery" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { isAuthenticated, user } = useAuth();

  const getDashboardPath = () => {
    if (!user) return "/login";
    switch (user.role) {
      case "admin": return "/admin";
      case "staff": return "/staff";
      case "customer": return "/dashboard";
      default: return "/login";
    }
  };

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border"
    >
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <a href="#home" className="font-heading text-3xl tracking-wider">
          <span className="text-gradient">CLEAN</span>
          <span className="text-foreground">RIDE</span>
        </a>

        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="font-body text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated ? (
            <Link to={getDashboardPath()} className="px-6 py-2 rounded-md font-body text-sm font-medium bg-primary text-primary-foreground hover:opacity-90 transition-opacity">
              Dashboard
            </Link>
          ) : (
            <>
              <Link to="/login" className="px-5 py-2 rounded-md font-body text-sm text-muted-foreground hover:text-foreground transition-colors">
                Login
              </Link>
              <Link to="/register" className="px-6 py-2 rounded-md font-body text-sm font-medium bg-primary text-primary-foreground hover:opacity-90 transition-opacity">
                Book Now
              </Link>
            </>
          )}
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden text-foreground">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="md:hidden bg-background border-b border-border"
        >
          <ul className="flex flex-col items-center gap-4 py-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={() => setOpen(false)} className="font-body text-muted-foreground hover:text-primary transition-colors">
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              {isAuthenticated ? (
                <Link to={getDashboardPath()} onClick={() => setOpen(false)} className="px-6 py-2 rounded-md font-body text-sm font-medium bg-primary text-primary-foreground">
                  Dashboard
                </Link>
              ) : (
                <Link to="/login" onClick={() => setOpen(false)} className="px-6 py-2 rounded-md font-body text-sm font-medium bg-primary text-primary-foreground">
                  Login / Book
                </Link>
              )}
            </li>
          </ul>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
