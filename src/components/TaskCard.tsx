
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Coins, User, Clock, CheckCircle } from "lucide-react";
import { useAuth } from '@/hooks/useAuth';
import { Task } from '@/types/task';
import { getStatusColor, getStatusText } from '@/utils/taskUtils';

interface TaskCardProps {
  task: Task;
  onAccept: (taskId: string) => void;
  onComplete: (taskId: string, rewardTokens: number) => void;
}

export const TaskCard = ({ task, onAccept, onComplete }: TaskCardProps) => {
  const { user } = useAuth();

  return (
    <Card className="bg-slate-900/60 border-slate-800 hover:border-purple-600/50 transition-colors">
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
            onClick={() => onAccept(task.id)}
            className="w-full bg-green-600 hover:bg-green-700"
          >
            <Clock className="h-4 w-4 mr-2" />
            Accept Task
          </Button>
        )}
        
        {user && task.status === 'in_progress' && task.assignee_id === user.id && (
          <Button 
            onClick={() => onComplete(task.id, task.reward_tokens)}
            className="w-full bg-purple-600 hover:bg-purple-700"
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            Mark as Completed
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
