
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { ArrowRight, Github, Star, GitBranch, Users, ArrowUpRight } from "lucide-react";

export const ProjectsSection = () => {
  return (
    <section className="py-20 px-4 relative" id="projects">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-purple-600/20 text-purple-300 border-purple-500/30 px-4 py-2">
            Featured Projects
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Trending Token Launches
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Discover the most promising projects launched through GitLaunch's credibility verification.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <ProjectCard 
            name="EcoChain"
            description="A carbon-neutral blockchain focused on sustainability and eco-friendly operations."
            githubUser="ecochain-dev"
            score={92}
            chain="Ethereum"
            stars={487}
            forks={56}
            raised="$1.2M"
            stage="Presale"
          />
          
          <ProjectCard 
            name="DataDAO"
            description="Decentralized data governance protocol enabling community ownership of data assets."
            githubUser="datadao-protocol"
            score={87}
            chain="Solana"
            stars={324}
            forks={41}
            raised="$890K"
            stage="IDO Live"
          />
          
          <ProjectCard 
            name="DevFi"
            description="Financial tools and DeFi solutions built specifically for the developer ecosystem."
            githubUser="devfi-protocol"
            score={95}
            chain="Binance Smart Chain"
            stars={612}
            forks={89}
            raised="$2.4M"
            stage="Liquidity Added"
          />
        </div>

        <div className="text-center">
          <Button size="lg" variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800">
            Explore All Projects
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

interface ProjectCardProps {
  name: string;
  description: string;
  githubUser: string;
  score: number;
  chain: string;
  stars: number;
  forks: number;
  raised: string;
  stage: string;
}

const ProjectCard = ({ 
  name, 
  description, 
  githubUser,
  score,
  chain,
  stars,
  forks,
  raised,
  stage
}: ProjectCardProps) => {
  // Determine the color based on the score
  let scoreColor = "text-yellow-400";
  if (score >= 90) {
    scoreColor = "text-green-400";
  } else if (score < 70) {
    scoreColor = "text-red-400";
  }

  // Determine badge color based on stage
  let stageBg = "bg-blue-600/20 text-blue-300 border-blue-500/30";
  if (stage === "Presale") {
    stageBg = "bg-yellow-600/20 text-yellow-300 border-yellow-500/30";
  } else if (stage === "Liquidity Added") {
    stageBg = "bg-green-600/20 text-green-300 border-green-500/30";
  }

  return (
    <Card className="bg-slate-900/60 border-slate-800 hover:border-purple-600/60 transition-colors overflow-hidden group">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <Github className="h-4 w-4 text-slate-400" />
              <span className="text-slate-400">{githubUser}</span>
            </div>
            <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">{name}</h3>
          </div>
          <Badge className={stageBg}>
            {stage}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="pb-4">
        <p className="text-slate-300 mb-4 line-clamp-2">{description}</p>
        
        <div className="flex items-center space-x-4 text-sm mb-4">
          <div className="flex items-center">
            <div className={`font-mono font-bold ${scoreColor}`}>{score}</div>
            <span className="text-slate-400 ml-1">Score</span>
          </div>
          
          <div className="flex items-center text-slate-400">
            <span>{chain}</span>
          </div>
          
          <div className="ml-auto text-slate-400">
            <span>{raised}</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center text-slate-400">
            <Star className="h-4 w-4 mr-1 text-yellow-400" />
            <span>{stars}</span>
          </div>
          <div className="flex items-center text-slate-400">
            <GitBranch className="h-4 w-4 mr-1" />
            <span>{forks}</span>
          </div>
          <div className="flex items-center text-slate-400">
            <Users className="h-4 w-4 mr-1" />
            <span>12 Contributors</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-2 pb-4">
        <Button variant="default" size="sm" className="w-full bg-purple-600/20 hover:bg-purple-600/40 text-purple-300 border border-purple-600/30">
          View Project
          <ArrowUpRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};
