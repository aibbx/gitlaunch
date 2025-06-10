
import { useEffect, useState } from 'react';
import { Navigation } from "@/components/Navigation";
import { TaskCreation } from "@/components/TaskCreation";
import { TasksList } from "@/components/TasksList";
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

interface Project {
  id: string;
  repo_name: string;
  token_symbol: string;
  token_balance: number;
}

const Dashboard = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    if (user) {
      fetchUserProjects();
    }
  }, [user]);

  const fetchUserProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('id, repo_name, token_symbol, token_balance')
        .eq('user_id', user?.id)
        .not('token_symbol', 'is', null);
      
      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Task Dashboard
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Create tasks for your projects and discover opportunities to contribute to others.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <TaskCreation projects={projects} />
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold text-white mb-6">Your Project Stats</h2>
            <div className="grid grid-cols-1 gap-4">
              {projects.map((project) => (
                <div key={project.id} className="bg-slate-900/60 border border-slate-800 rounded-lg p-4">
                  <h3 className="text-white font-semibold">{project.repo_name}</h3>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-slate-300">{project.token_symbol}</span>
                    <span className="text-purple-400 font-medium">
                      {(project.token_balance / 1000).toFixed(0)}K tokens
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <TasksList />
      </div>
    </div>
  );
};

export default Dashboard;
