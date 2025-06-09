
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Github, Menu, X, Rocket, Users, Zap } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { AuthButton } from "./AuthButton";

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Launch Token", path: "/launch" },
    { name: "AI Rating", path: "/rating" },
    { name: "Marketplace", path: "/marketplace" },
    { name: "Dashboard", path: "/dashboard" }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Rocket className="h-8 w-8 text-purple-400" />
            <span className="text-2xl font-bold text-white">GitLaunch</span>
            <Badge variant="secondary" className="bg-purple-600/20 text-purple-300 border-purple-500/30">
              Beta
            </Badge>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`transition-colors ${
                  isActive(item.path)
                    ? "text-purple-400"
                    : "text-slate-300 hover:text-purple-400"
                }`}
              >
                {item.name}
              </Link>
            ))}
            <div className="flex items-center space-x-3">
              <Badge className="bg-green-600/20 text-green-300 border-green-500/30">
                <Users className="w-3 h-3 mr-1" />
                1,247 Developers
              </Badge>
              <AuthButton />
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-slate-300"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-slate-800 py-4">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`transition-colors ${
                    isActive(item.path)
                      ? "text-purple-400"
                      : "text-slate-300 hover:text-purple-400"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <AuthButton />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
