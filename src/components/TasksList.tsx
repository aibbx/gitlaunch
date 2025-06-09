
import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Coins, User, Clock, CheckCircle } from "lucide-react";
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/components/ui/use-toast';

interface Task {
  id: string;
  title: string;
  description: string;
  required_skills: string[];
  reward_tokens: number;
  status: string;
  projects: {
    repo_name: string;
    token_symbol: string;
  };
  profiles: {
    github_username: string;
  } | null;
  creator_id: string;
  assignee_id: string | null;
}

export const TasksList = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .select(`
          *,
          projects!inner(repo_name, token_symbol),
          profiles!tasks_assignee_id_fkey(github_username)
        `)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setTasks(data || []);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const acceptTask = async (taskId: string) => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from('tasks')
        .update({ 
          assignee_id: user.id,
          status: 'in_progress' 
        })
        .eq('id', taskId)
        .eq('status', 'open');
      
      if (error) throw error;
      
      toast({ title: "Success", description: "Task accepted! You can now start working on it." });
      fetchTasks();
    } catch (error) {
      toast({ title: "Error", description: "Failed to accept task", variant: "destructive" });
    }
  };

  const completeTask = async (taskId: string, rewardTokens: number) => {
    if (!user) return;
    
    try {
      // Update task status
      const { error: taskError } = await supabase
        .from('tasks')
        .update({ status: 'completed' })
        .eq('id', taskId);
      
      if (taskError) throw taskError;
      
      // Record token transactions (98% to user, 2% to platform, 1% burned)
      const userReward = Math.floor(rewardTokens * 0.98);
      const platformFee = Math.floor(rewardTokens * 0.02);
      const burnAmount = Math.floor(rewardTokens * 0.01);
      
      const transactions = [
        {
          task_id: taskId,
          user_id: user.id,
          type: 'task_reward' as const,
          amount: userReward,
          description: 'Task completion reward'
        },
        {
          task_id: taskId,
          user_id: null,
          type: 'platform_fee' as const,
          amount: platformFee,
          description: 'Platform fee (2%)'
        },
        {
          task_id: taskId,
          user_id: null,
          type: 'burn' as const,
          amount: burnAmount,
          description: 'Token burn (1%)'
        }
      ];
      
      const { error: transactionError } = await supabase
        .from('token_transactions')
        .insert(transactions);
      
      if (transactionError) throw transactionError;
      
      toast({ 
        title: "Task Completed!", 
        description: `You earned ${userReward} tokens! Platform fee: ${platformFee}, Burned: ${burnAmount}` 
      });
      fetchTasks();
    } catch (error) {
      toast({ title: "Error", description: "Failed to complete task", variant: "destructive" });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-600';
      case 'in_progress': return 'bg-blue-600';
      case 'cancelled': return 'bg-red-600';
      default: return 'bg-yellow-600';
    }
  };

  const getStatusText = (status: string) => {
    return status.replace('_', ' ').toUpperCase();
  };

  if (loading) {
    return <div className="text-white">Loading tasks...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Available Tasks</h2>
        <Badge className="bg-blue-600">
          {tasks.filter(t => t.status === 'open').length} Open Tasks
        </Badge>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {tasks.map((task) => (
          <Card key={task.id} className="bg-slate-900/60 border-slate-800 hover:border-purple-600/50 transition-colors">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-white text-lg font-semibold">
                    {task.title}
                  </CardTitle>
                  <CardDescription className="text-slate-400 mt-1">
                    {task.projects.repo_name}
                  </CardDescription>
                </div>
                <Badge className={getStatusColor(task.status)}>
                  {getStatusText(task.status)}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <p className="text-slate-300 text-sm">{task.description}</p>
              
              {task.required_skills.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {task.required_skills.map((skill, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              )}
              
              <div className="flex items-center justify-between p-3 bg-slate-800 rounded-lg">
                <div className="flex items-center gap-2">
                  <Coins className="h-4 w-4 text-purple-400" />
                  <span className="text-white font-medium">
                    {task.reward_tokens} {task.projects.token_symbol}
                  </span>
                </div>
                
                {task.profiles && (
                  <div className="flex items-center gap-2 text-slate-300 text-sm">
                    <User className="h-3 w-3" />
                    <span>{task.profiles.github_username}</span>
                  </div>
                )}
              </div>
              
              {user && task.status === 'open' && task.creator_id !== user.id && (
                <Button 
                  onClick={() => acceptTask(task.id)}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  <Clock className="h-4 w-4 mr-2" />
                  Accept Task
                </Button>
              )}
              
              {user && task.status === 'in_progress' && task.assignee_id === user.id && (
                <Button 
                  onClick={() => completeTask(task.id, task.reward_tokens)}
                  className="w-full bg-purple-600 hover:bg-purple-700"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Mark as Completed
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
      
      {tasks.length === 0 && (
        <Card className="bg-slate-900/60 border-slate-800">
          <CardContent className="text-center py-12">
            <div className="text-slate-400 text-lg">No tasks available yet</div>
            <div className="text-slate-500 text-sm mt-2">Create your first task to get started</div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
