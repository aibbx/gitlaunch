
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/Navigation";
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  GitBranch, 
  Coins,
  ArrowUpRight,
  Star,
  Activity
} from "lucide-react";

const Dashboard = () => {
  const projects = [
    {
      name: "EcoChain Protocol",
      symbol: "ECO",
      rating: 9.2,
      tokens: "500,000",
      value: "$12,450",
      contributors: 15,
      fees: "$234.50"
    },
    {
      name: "DataDAO Core",
      symbol: "DATA",
      rating: 8.7,
      tokens: "250,000",
      value: "$8,900",
      contributors: 8,
      fees: "$156.30"
    }
  ];

  const contributions = [
    {
      repo: "EcoChain Protocol",
      type: "Pull Request",
      title: "Add staking mechanism",
      tokens: "1,500 ECO",
      value: "$37.20",
      date: "2024-01-15"
    },
    {
      repo: "DataDAO Core", 
      type: "Bug Fix",
      title: "Fix memory leak in parser",
      tokens: "800 DATA",
      value: "$28.50",
      date: "2024-01-14"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Developer Dashboard</h1>
            <p className="text-slate-300">Manage your project tokens and contribution rewards</p>
          </div>

          {/* Overview Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-slate-900/80 border-slate-700">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Coins className="h-8 w-8 text-purple-400" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-slate-400">Total Token Value</p>
                    <p className="text-2xl font-bold text-white">$21,350</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/80 border-slate-700">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <DollarSign className="h-8 w-8 text-green-400" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-slate-400">Fee Revenue</p>
                    <p className="text-2xl font-bold text-white">$390.80</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/80 border-slate-700">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Users className="h-8 w-8 text-blue-400" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-slate-400">Active Contributors</p>
                    <p className="text-2xl font-bold text-white">23</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/80 border-slate-700">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <TrendingUp className="h-8 w-8 text-yellow-400" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-slate-400">Average AI Rating</p>
                    <p className="text-2xl font-bold text-white">8.95</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* My Projects */}
            <Card className="bg-slate-900/80 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <GitBranch className="mr-2 h-5 w-5" />
                  My Projects
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {projects.map((project, index) => (
                  <div key={index} className="bg-slate-800 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-white font-medium">{project.name}</h3>
                        <Badge className="bg-purple-600/20 text-purple-300 mt-1">
                          ${project.symbol}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <div className="text-green-400 font-bold">{project.rating}/10</div>
                        <div className="text-xs text-slate-400">AI Rating</div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <div className="text-slate-400">Token Balance</div>
                        <div className="text-white font-medium">{project.tokens}</div>
                      </div>
                      <div>
                        <div className="text-slate-400">Market Value</div>
                        <div className="text-white font-medium">{project.value}</div>
                      </div>
                      <div>
                        <div className="text-slate-400">Fees Earned</div>
                        <div className="text-green-400 font-medium">{project.fees}</div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center mt-3 pt-3 border-t border-slate-700">
                      <span className="text-sm text-slate-400">
                        {project.contributors} contributors
                      </span>
                      <Button size="sm" variant="outline" className="border-slate-600 text-slate-300">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* My Contributions */}
            <Card className="bg-slate-900/80 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Activity className="mr-2 h-5 w-5" />
                  My Contributions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {contributions.map((contribution, index) => (
                  <div key={index} className="bg-slate-800 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-white font-medium text-sm">{contribution.title}</h3>
                        <p className="text-slate-400 text-xs">{contribution.repo}</p>
                      </div>
                      <Badge className="bg-blue-600/20 text-blue-300 text-xs">
                        {contribution.type}
                      </Badge>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-purple-400 font-medium text-sm">{contribution.tokens}</div>
                        <div className="text-green-400 text-xs">{contribution.value}</div>
                      </div>
                      <div className="text-slate-400 text-xs">{contribution.date}</div>
                    </div>
                  </div>
                ))}
                
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  <ArrowUpRight className="mr-2 h-4 w-4" />
                  View All Contributions
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
