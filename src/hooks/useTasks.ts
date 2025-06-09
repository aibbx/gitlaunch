
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/components/ui/use-toast';
import { Task } from '@/types/task';

export const useTasks = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .select(`
          *,
          projects!inner(repo_name, token_symbol),
          profiles(github_username)
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
      const { error: taskError } = await supabase
        .from('tasks')
        .update({ status: 'completed' })
        .eq('id', taskId);
      
      if (taskError) throw taskError;
      
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

  useEffect(() => {
    fetchTasks();
  }, []);

  return {
    tasks,
    loading,
    acceptTask,
    completeTask,
    refetchTasks: fetchTasks
  };
};
