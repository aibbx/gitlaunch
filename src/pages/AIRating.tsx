
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Navigation } from "@/components/Navigation";
import { Progress } from "@/components/ui/progress";
import { 
  Brain,
  Github,
  Star,
  GitBranch,
  Users,
  Code,
  TrendingUp,
  Calendar,
  Search
} from "lucide-react";
import { useState } from "react";

const AIRating = () => {
  const [searchUrl, setSearchUrl] = useState("");
  
  const projects = [
    {
      name: "EcoChain Protocol",
      url: "https://github.com/ecochain/protocol",
      rating: 9.2,
      metrics: {
        activity: 95,
        quality: 88,
        community: 92,
        innovation: 87
      },
      stats: {
        stars: 1247,
        forks: 156,
        commits: 892,
        contributors: 23,
        issues: 45,
        prs: 89
      },
      lastUpdate: "2024-01-15",
      description: "A carbon-neutral blockchain protocol focused on sustainability"
    },
    {
      name: "DataDAO Core",
      url: "https://github.com/datadao/core", 
      rating: 8.7,
      metrics: {
        activity: 82,
        quality: 91,
        community: 85,
        innovation: 88
      },
      stats: {
        stars: 890,
        forks: 112,
        commits: 567,
        contributors: 15,
        issues: 32,
        prs: 67
      },
      lastUpdate: "2024-01-14",
      description: "Decentralized data governance and ownership protocol"
    },
    {
      name: "DevFi Protocol",
      url: "https://github.com/devfi/protocol",
      rating: 9.5,
      metrics: {
        activity: 98,
        quality: 94,
        community: 96,
        innovation: 92
      },
      stats: {
        stars: 1890,
        forks: 234,
        commits: 1234,
        contributors: 34,
        issues: 28,
        prs: 156
      },
      lastUpdate: "2024-01-16",
      description: "Financial tools and DeFi solutions for developers"
    }
  ];

  const getRatingColor = (rating: number) => {
    if (rating >= 9) return "text-green-400";
    if (rating >= 8) return "text-blue-400";
    if (rating >= 7) return "text-yellow-400";
    return "text-red-400";
  };

  const getRatingBadge = (rating: number) => {
    if (rating >= 9) return "bg-green-600/20 text-green-300 border-green-500/30";
    if (rating >= 8) return "bg-blue-600/20 text-blue-300 border-blue-500/30";
    if (rating >= 7) return "bg-yellow-600/20 text-yellow-300 border-yellow-500/30";
    return "bg-red-600/20 text-red-300 border-red-500/30";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">AI项目评级</h1>
            <p className="text-slate-300">基于GitHub数据的智能项目评估系统</p>
          </div>

          {/* AI评级工具 */}
          <Card className="bg-slate-900/80 border-slate-700 mb-8">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Brain className="mr-2 h-5 w-5 text-purple-400" />
                项目评级分析
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-4">
                <div className="flex-1">
                  <Input
                    value={searchUrl}
                    onChange={(e) => setSearchUrl(e.target.value)}
                    placeholder="输入GitHub项目URL进行评级分析..."
                    className="bg-slate-800 border-slate-600 text-white"
                  />
                </div>
                <Button className="bg-purple-600 hover:bg-purple-700">
                  <Search className="mr-2 h-4 w-4" />
                  开始分析
                </Button>
              </div>
              
              {searchUrl && (
                <div className="mt-6 bg-slate-800 rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-4">
                    <Brain className="h-6 w-6 text-purple-400 animate-pulse" />
                    <span className="text-white">AI正在分析项目...</span>
                  </div>
                  <Progress value={75} className="w-full" />
                </div>
              )}
            </CardContent>
          </Card>

          {/* 评级项目列表 */}
          <div className="grid grid-cols-1 gap-6">
            {projects.map((project, index) => (
              <Card key={index} className="bg-slate-900/80 border-slate-700 hover:border-purple-600/60 transition-colors">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-white mb-2">{project.name}</CardTitle>
                      <p className="text-slate-300 text-sm mb-2">{project.description}</p>
                      <div className="flex items-center space-x-2">
                        <Github className="h-4 w-4 text-slate-400" />
                        <span className="text-slate-400 text-sm">{project.url}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-3xl font-bold ${getRatingColor(project.rating)}`}>
                        {project.rating}
                      </div>
                      <Badge className={getRatingBadge(project.rating)}>
                        AI评级
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  {/* 评级指标 */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-slate-800 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-slate-400 text-sm">代码活跃度</span>
                        <span className="text-white font-medium">{project.metrics.activity}</span>
                      </div>
                      <Progress value={project.metrics.activity} className="h-2" />
                    </div>
                    
                    <div className="bg-slate-800 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-slate-400 text-sm">代码质量</span>
                        <span className="text-white font-medium">{project.metrics.quality}</span>
                      </div>
                      <Progress value={project.metrics.quality} className="h-2" />
                    </div>
                    
                    <div className="bg-slate-800 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-slate-400 text-sm">社区参与</span>
                        <span className="text-white font-medium">{project.metrics.community}</span>
                      </div>
                      <Progress value={project.metrics.community} className="h-2" />
                    </div>
                    
                    <div className="bg-slate-800 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-slate-400 text-sm">技术创新</span>
                        <span className="text-white font-medium">{project.metrics.innovation}</span>
                      </div>
                      <Progress value={project.metrics.innovation} className="h-2" />
                    </div>
                  </div>

                  {/* 项目统计 */}
                  <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-4">
                    <div className="text-center">
                      <Star className="h-5 w-5 text-yellow-400 mx-auto mb-1" />
                      <div className="text-white font-medium">{project.stats.stars}</div>
                      <div className="text-slate-400 text-xs">Stars</div>
                    </div>
                    
                    <div className="text-center">
                      <GitBranch className="h-5 w-5 text-blue-400 mx-auto mb-1" />
                      <div className="text-white font-medium">{project.stats.forks}</div>
                      <div className="text-slate-400 text-xs">Forks</div>
                    </div>
                    
                    <div className="text-center">
                      <Code className="h-5 w-5 text-green-400 mx-auto mb-1" />
                      <div className="text-white font-medium">{project.stats.commits}</div>
                      <div className="text-slate-400 text-xs">Commits</div>
                    </div>
                    
                    <div className="text-center">
                      <Users className="h-5 w-5 text-purple-400 mx-auto mb-1" />
                      <div className="text-white font-medium">{project.stats.contributors}</div>
                      <div className="text-slate-400 text-xs">贡献者</div>
                    </div>
                    
                    <div className="text-center">
                      <TrendingUp className="h-5 w-5 text-orange-400 mx-auto mb-1" />
                      <div className="text-white font-medium">{project.stats.issues}</div>
                      <div className="text-slate-400 text-xs">Issues</div>
                    </div>
                    
                    <div className="text-center">
                      <Calendar className="h-5 w-5 text-pink-400 mx-auto mb-1" />
                      <div className="text-white font-medium">{project.stats.prs}</div>
                      <div className="text-slate-400 text-xs">PRs</div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-slate-700">
                    <span className="text-slate-400 text-sm">
                      最后更新: {project.lastUpdate}
                    </span>
                    <Button variant="outline" className="border-slate-600 text-slate-300">
                      查看详细报告
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIRating;
