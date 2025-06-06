
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Github, Zap, Shield, ArrowRight, Star } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="relative py-20 px-4 overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 blur-3xl"></div>
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
      
      <div className="relative max-w-6xl mx-auto text-center">
        <Badge className="mb-6 bg-purple-600/20 text-purple-300 border-purple-500/30 px-4 py-2">
          <Star className="w-4 h-4 mr-1" />
          Powered by AI & GitHub
        </Badge>
        
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          Launch Tokens with
          <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            {" "}GitHub Credibility
          </span>
        </h1>
        
        <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
          The first decentralized launchpad that verifies project credibility through GitHub activity. 
          Connect your developer profile, get AI-verified, and launch tokens with instant community trust.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 text-lg">
            <Github className="mr-2 h-5 w-5" />
            Connect GitHub & Launch
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button size="lg" variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800 px-8 py-4 text-lg">
            Explore Projects
          </Button>
        </div>
        
        {/* Feature highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="flex items-center justify-center space-x-3 text-slate-300">
            <Shield className="h-6 w-6 text-green-400" />
            <span>AI-Verified Credibility</span>
          </div>
          <div className="flex items-center justify-center space-x-3 text-slate-300">
            <Zap className="h-6 w-6 text-yellow-400" />
            <span>Instant Token Launch</span>
          </div>
          <div className="flex items-center justify-center space-x-3 text-slate-300">
            <Github className="h-6 w-6 text-purple-400" />
            <span>GitHub Integration</span>
          </div>
        </div>
      </div>
    </section>
  );
};
