
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Github, Menu, X, Rocket, Users, Zap } from "lucide-react";

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Rocket className="h-8 w-8 text-purple-400" />
            <span className="text-2xl font-bold text-white">GitLaunch</span>
            <Badge variant="secondary" className="bg-purple-600/20 text-purple-300 border-purple-500/30">
              Beta
            </Badge>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-slate-300 hover:text-purple-400 transition-colors">
              Features
            </a>
            <a href="#projects" className="text-slate-300 hover:text-purple-400 transition-colors">
              Projects
            </a>
            <a href="#docs" className="text-slate-300 hover:text-purple-400 transition-colors">
              Docs
            </a>
            <div className="flex items-center space-x-3">
              <Badge className="bg-green-600/20 text-green-300 border-green-500/30">
                <Users className="w-3 h-3 mr-1" />
                1,247 Developers
              </Badge>
              <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                <Github className="mr-2 h-4 w-4" />
                Connect GitHub
              </Button>
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
              <a href="#features" className="text-slate-300 hover:text-purple-400 transition-colors">
                Features
              </a>
              <a href="#projects" className="text-slate-300 hover:text-purple-400 transition-colors">
                Projects
              </a>
              <a href="#docs" className="text-slate-300 hover:text-purple-400 transition-colors">
                Docs
              </a>
              <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                <Github className="mr-2 h-4 w-4" />
                Connect GitHub
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
