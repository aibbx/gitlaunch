
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useTasks } from '@/hooks/useTasks';
import { TaskCard } from './TaskCard';

export const TasksList = () => {
  const { tasks, loading, acceptTask, completeTask } = useTasks();

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
          <TaskCard
            key={task.id}
            task={task}
            onAccept={acceptTask}
            onComplete={completeTask}
          />
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
