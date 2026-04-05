import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import bmcLogo from "@/assets/logo bmc.png";
import ThemeToggle from "./ThemeToggle";

const navItems = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#preface" },
  { label: "Speakers", href: "#speakers" },
  { label: "Committee", href: "/committee", isPage: true },
  { label: "Schedule", href: "/schedule", isPage: true },
  { label: "Payment", href: "/payment", isPage: true },
  { label: "Guidebook", href: "/guidebook", isPage: true },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const scrollTo = (href: string) => {
    setOpen(false);
    // If we're not on the home page and trying to scroll to a section, navigate home first
    if (location.pathname !== "/" && href.startsWith("#")) {
      navigate("/");
      setTimeout(() => {
        document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleNavClick = (item: { href: string; isPage?: boolean }) => {
    setOpen(false);
    if (item.isPage) {
      navigate(item.href);
    } else {
      scrollTo(item.href);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-3">
          <img src={bmcLogo} alt="BMC Logo" className="h-9 w-9 object-contain" />
          <span className="font-display font-bold text-lg tracking-tight">
            BMC 2026
          </span>
        </Link>

        {/* Desktop */}
        <ul className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <li key={item.label}>
              {item.isPage ? (
                <Link
                  to={item.href}
                  className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <button
                  onClick={() => handleNavClick(item)}
                  className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                >
                  {item.label}
                </button>
              )}
            </li>
          ))}
          <li>
            <Link
              to="/register"
              className="px-5 py-2 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity"
            >
              Register Now
            </Link>
          </li>
          <li>
            <ThemeToggle />
          </li>
        </ul>

        {/* Mobile toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button className="text-foreground" onClick={() => setOpen(!open)}>
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-border"
          >
            <ul className="flex flex-col p-4 gap-3">
              {navItems.map((item) => (
                <li key={item.label}>
                  {item.isPage ? (
                    <Link
                      to={item.href}
                      onClick={() => setOpen(false)}
                      className="block w-full text-left py-2 text-foreground hover:text-primary transition-colors"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <button
                      onClick={() => handleNavClick(item)}
                      className="w-full text-left py-2 text-foreground hover:text-primary transition-colors"
                    >
                      {item.label}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

