
import { Button } from "@/components/ui/button";
import { Github, ArrowRight, Rocket } from "lucide-react";
import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { StatsSection } from "@/components/StatsSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      <Navigation />
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <ProjectsSection />
      
      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              准备发行您的代币了吗？
            </h2>
            <p className="text-purple-100 mb-8 text-lg">
              加入下一代基于GitHub信誉的去中心化代币发行平台。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/launch">
                <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 font-semibold px-8 py-3">
                  <Github className="mr-2 h-5 w-5" />
                  开始发行代币
                </Button>
              </Link>
              <Link to="/marketplace">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-3">
                  浏览交易市场
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* 快速导航 */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Link to="/launch" className="group">
              <div className="bg-slate-900/60 border border-slate-800 rounded-lg p-6 hover:border-purple-600/60 transition-colors">
                <h3 className="text-white font-semibold mb-2 group-hover:text-purple-400">发行代币</h3>
                <p className="text-slate-400 text-sm">基于GitHub项目创建SPL代币</p>
              </div>
            </Link>
            
            <Link to="/rating" className="group">
              <div className="bg-slate-900/60 border border-slate-800 rounded-lg p-6 hover:border-purple-600/60 transition-colors">
                <h3 className="text-white font-semibold mb-2 group-hover:text-purple-400">AI评级</h3>
                <p className="text-slate-400 text-sm">获取项目智能评估报告</p>
              </div>
            </Link>
            
            <Link to="/marketplace" className="group">
              <div className="bg-slate-900/60 border border-slate-800 rounded-lg p-6 hover:border-purple-600/60 transition-colors">
                <h3 className="text-white font-semibold mb-2 group-hover:text-purple-400">交易市场</h3>
                <p className="text-slate-400 text-sm">C2C代币交易平台</p>
              </div>
            </Link>
            
            <Link to="/dashboard" className="group">
              <div className="bg-slate-900/60 border border-slate-800 rounded-lg p-6 hover:border-purple-600/60 transition-colors">
                <h3 className="text-white font-semibold mb-2 group-hover:text-purple-400">仪表板</h3>
                <p className="text-slate-400 text-sm">管理项目和贡献奖励</p>
              </div>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="border-t border-slate-800 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Rocket className="h-6 w-6 text-purple-400" />
                <span className="text-xl font-bold text-white">GitLaunch</span>
              </div>
              <p className="text-slate-400">
                Democratizing token creation through GitHub credibility and AI verification.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-slate-400">
                <li>Launch Token</li>
                <li>Browse Projects</li>
                <li>AI Verification</li>
                <li>Documentation</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Developers</h4>
              <ul className="space-y-2 text-slate-400">
                <li>API Docs</li>
                <li>Smart Contracts</li>
                <li>GitHub Integration</li>
                <li>Security</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Community</h4>
              <ul className="space-y-2 text-slate-400">
                <li>Discord</li>
                <li>Twitter</li>
                <li>GitHub</li>
                <li>Blog</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-12 pt-8 text-center text-slate-400">
            <p>&copy; 2024 GitLaunch. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
