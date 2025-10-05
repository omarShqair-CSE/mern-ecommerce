import React from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/" },
    { name: "Contact", path: "/" },
    { name: "About", path: "/" },
  ];
  const navigate = useNavigate();

  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 z-50 ${
        isScrolled
          ? "bg-white/80 shadow-md text-black backdrop-blur-lg py-3 md:py-4"
          : "bg-white py-4 md:py-6"
      }`}
    >
      {/* Logo */}
      <a href="/" className="flex items-center gap-2 cursor-pointer">
        <img
          className="h-16 md:h-28 object-contain"
          src="/logo.png"
          alt="Logo"
        />
      </a>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-4 lg:gap-8">
        {navLinks.map((link, i) => (
          <a
            key={i}
            href={link.path}
            className={`group flex flex-col gap-0.5 cursor-pointer transition-colors duration-300 ${
              isScrolled ? "text-black" : "text-gray-700"
            } hover:text-[#dd6165]`}
          >
            {link.name}
            <div
              className={`h-0.5 w-0 group-hover:w-full transition-all duration-300 bg-[#F86D72]`}
            />
          </a>
        ))}
      </div>

      {/* Desktop Right */}
      <div className="hidden md:flex items-center gap-4">
        <svg
          className={`h-6 w-6 text-gray-700 transition-all duration-500 ${
            isScrolled ? "invert" : ""
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        ></svg>

        <button
          onClick={() => navigate("/login")}
          className="rounded-full px-4 py-2 bg-[#F86D72] text-white w-24 transition-colors duration-300 hover:bg-[#dd6165]"
        >
          Login
        </button>

        <button
          onClick={() => navigate("/register")}
          className={`ml-0 md:ml-4 rounded-full px-4 py-2 transition-colors duration-300 w-24 ${
            isScrolled
              ? "bg-black text-white hover:bg-gray-800"
              : "bg-[#F86D72] text-white hover:bg-[#dd6165]"
          }`}
        >
          Register
        </button>
      </div>

      {/* Mobile Menu Button */}
      <div className="flex items-center gap-3 md:hidden">
        <svg
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`h-6 w-6 cursor-pointer ${isScrolled ? "invert" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <line x1="4" y1="6" x2="20" y2="6" />
          <line x1="4" y1="12" x2="20" y2="12" />
          <line x1="4" y1="18" x2="20" y2="18" />
        </svg>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 w-full h-screen bg-white text-base flex flex-col md:hidden items-center justify-center gap-6 font-medium text-gray-800 transition-transform duration-500 overflow-y-auto ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close Button */}
        <a
          className="absolute top-4 right-4 cursor-pointer"
          onClick={() => setIsMenuOpen(false)}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </a>

        {navLinks.map((link, i) => (
          <a
            key={i}
            href={link.path}
            onClick={() => setIsMenuOpen(false)}
            className="cursor-pointer text-lg hover:text-[#dd6165] transition-colors duration-300"
          >
            {link.name}
          </a>
        ))}

        <button
          onClick={() => navigate("/register")}
          className="rounded-full px-4 py-2 bg-[#F86D72] text-white w-24 transition-colors duration-300 hover:bg-[#dd6165]"
        >
          Register
        </button>

        <button
          onClick={() => navigate("/login")}
          className="rounded-full px-4 py-2 bg-[#F86D72] text-white w-24 transition-colors duration-300 hover:bg-[#dd6165]"
        >
          Login
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
