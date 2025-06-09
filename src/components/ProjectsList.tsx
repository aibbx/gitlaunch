
import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, GitFork, GitCommit, AlertCircle, Coins, ExternalLink } from "lucide-react";
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

interface Project {
  id: string;
  repo_name: string;
  description: string;
  stars: number;
  commits: number;
  forks: number;
  issues: number;
  rating: number;
  status: string;
  token_symbol: string;
  token_balance: number;
  repo_url: string;
}

export const ProjectsList = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, [user]);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'graduated': return 'bg-green-600';
      case 'inner_pool': return 'bg-purple-600';
      default: return 'bg-slate-600';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'graduated': return 'Graduated';
      case 'inner_pool': return 'Inner Pool';
      default: return 'Pending';
    }
  };

  if (loading) {
    return <div className="text-white">Loading projects...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Projects</h2>
        <Badge className="bg-blue-600">
          {projects.length} Total Projects
        </Badge>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="bg-slate-900/60 border-slate-800 hover:border-purple-600/50 transition-colors">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-white text-lg font-semibold">
                    {project.repo_name}
                  </CardTitle>
                  <CardDescription className="text-slate-400 mt-1">
                    {project.description}
                  </CardDescription>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                  className="text-slate-400 hover:text-white ml-2"
                >
                  <a href={project.repo_url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-1 text-yellow-400">
                  <Star className="h-3 w-3" />
                  <span>{project.stars}</span>
                </div>
                <div className="flex items-center gap-1 text-blue-400">
                  <GitCommit className="h-3 w-3" />
                  <span>{project.commits}</span>
                </div>
                <div className="flex items-center gap-1 text-green-400">
                  <GitFork className="h-3 w-3" />
                  <span>{project.forks}</span>
                </div>
                <div className="flex items-center gap-1 text-red-400">
                  <AlertCircle className="h-3 w-3" />
                  <span>{project.issues}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="text-white font-semibold">
                  Rating: {project.rating}/100
                </div>
                <Badge className={getStatusColor(project.status)}>
                  {getStatusText(project.status)}
                </Badge>
              </div>
              
              {project.token_symbol && (
                <div className="flex items-center justify-between p-3 bg-slate-800 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Coins className="h-4 w-4 text-purple-400" />
                    <span className="text-white font-medium">{project.token_symbol}</span>
                  </div>
                  <div className="text-slate-300 text-sm">
                    {(project.token_balance / 1000000).toFixed(1)}M tokens
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
      
      {projects.length === 0 && (
        <Card className="bg-slate-900/60 border-slate-800">
          <CardContent className="text-center py-12">
            <div className="text-slate-400 text-lg">No projects submitted yet</div>
            <div className="text-slate-500 text-sm mt-2">Submit your first GitHub repository to get started</div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
