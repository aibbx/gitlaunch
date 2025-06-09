
import { useEffect, useState } from 'react';
import { Navigation } from "@/components/Navigation";
import { TaskCreation } from "@/components/TaskCreation";
import { TasksList } from "@/components/TasksList";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Coins, TrendingUp, Users, Flame } from "lucide-react";
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

const Dashboard = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [stats, setStats] = useState({
    totalTokensEarned: 0,
    totalFeesCollected: 0,
    totalBurned: 0,
    activeTasks: 0
  });

  useEffect(() => {
    if (user) {
      fetchUserProjects();
      fetchUserStats();
    }
  }, [user]);

  const fetchUserProjects = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const fetchUserStats = async () => {
    if (!user) return;
    
    try {
      // Fetch token transactions
      const { data: transactions, error } = await supabase
        .from('token_transactions')
        .select('*')
        .eq('user_id', user.id);
      
      if (error) throw error;
      
      const totalTokensEarned = transactions
        ?.filter(t => t.type === 'task_reward')
        .reduce((sum, t) => sum + t.amount, 0) || 0;
      
      // Fetch platform stats
      const { data: platformFees } = await supabase
        .from('token_transactions')
        .select('amount')
        .eq('type', 'platform_fee');
      
      const { data: burnedTokens } = await supabase
        .from('token_transactions')
        .select('amount')
        .eq('type', 'burn');
      
      const { data: activeTasks } = await supabase
        .from('tasks')
        .select('id')
        .in('status', ['open', 'in_progress']);
      
      setStats({
        totalTokensEarned,
        totalFeesCollected: platformFees?.reduce((sum, t) => sum + t.amount, 0) || 0,
        totalBurned: burnedTokens?.reduce((sum, t) => sum + t.amount, 0) || 0,
        activeTasks: activeTasks?.length || 0
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <Card className="bg-slate-900/60 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white">Connect GitHub to Access Dashboard</CardTitle>
              <CardDescription>Sign in with GitHub to manage your projects and tasks</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Developer Dashboard
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Manage your projects, create tasks, and track contributions
          </p>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card className="bg-slate-900/60 border-slate-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-white flex items-center gap-2 text-lg">
                <Coins className="h-5 w-5 text-green-400" />
                Tokens Earned
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-400">
                {(stats.totalTokensEarned / 1000).toFixed(1)}K
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-900/60 border-slate-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-white flex items-center gap-2 text-lg">
                <TrendingUp className="h-5 w-5 text-blue-400" />
                Platform Fees
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-400">
                {(stats.totalFeesCollected / 1000).toFixed(1)}K
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-900/60 border-slate-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-white flex items-center gap-2 text-lg">
                <Flame className="h-5 w-5 text-red-400" />
                Tokens Burned
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-400">
                {(stats.totalBurned / 1000).toFixed(1)}K
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-900/60 border-slate-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-white flex items-center gap-2 text-lg">
                <Users className="h-5 w-5 text-purple-400" />
                Active Tasks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-400">
                {stats.activeTasks}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <TaskCreation projects={projects} />
          </div>
          <div className="lg:col-span-2">
            <TasksList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
