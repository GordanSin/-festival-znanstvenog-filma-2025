import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { LogoIcon } from "./logo-icon";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export function Navigation() {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth"
      });
    }
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { label: "Početna", href: "home" },
    { label: "Filmovi", href: "films" },
    { label: "Raspored", href: "schedule" },
    { label: "Lokacije", href: "locations" },
    { label: "O festivalu", href: "about" },
    { label: "Kontakt", href: "contact" },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur-sm border-b border-border" : "bg-transparent"
      }`}
      data-testid="main-navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-3">
            <LogoIcon className="text-white" size="sm" />
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="text-white hover:text-white/80 transition-colors"
                data-testid={`nav-${item.href}`}
              >
                {item.label}
              </button>
            ))}
            <Button 
              variant="secondary" 
              size="sm"
              data-testid="language-toggle"
            >
              EN
            </Button>
          </div>
          
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden text-white hover:text-white/80"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            data-testid="mobile-menu-toggle"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
        
        {/* Mobile Menu */}
        <div 
          className={`md:hidden transition-all duration-300 overflow-hidden ${
            isMobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          }`}
          data-testid="mobile-menu"
        >
          <div className="px-4 py-2 space-y-3 bg-background border-b border-border">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="block w-full text-left py-2 text-gray-900 hover:text-gray-700 transition-colors"
                data-testid={`mobile-nav-${item.href}`}
              >
                {item.label}
              </button>
            ))}
            <Button 
              variant="secondary" 
              size="sm" 
              className="w-full mt-3"
              data-testid="mobile-language-toggle"
            >
              English
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
