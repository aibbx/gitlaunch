
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Coins } from "lucide-react";
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/components/ui/use-toast';

interface Project {
  id: string;
  repo_name: string;
  token_symbol: string;
  token_balance: number;
}

export const TaskCreation = ({ projects }: { projects: Project[] }) => {
  const { user } = useAuth();
  const [selectedProject, setSelectedProject] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [rewardTokens, setRewardTokens] = useState('');
  const [skills, setSkills] = useState('');
  const [loading, setLoading] = useState(false);

  const availableProjects = projects.filter(p => p.token_symbol && p.token_balance > 0);

  const createTask = async () => {
    if (!user || !selectedProject || !title || !description || !rewardTokens) {
      toast({ title: "Error", description: "Please fill in all required fields", variant: "destructive" });
      return;
    }

    const reward = parseInt(rewardTokens);
    const project = availableProjects.find(p => p.id === selectedProject);
    
    if (!project || reward > project.token_balance) {
      toast({ title: "Error", description: "Insufficient token balance", variant: "destructive" });
      return;
    }

    try {
      setLoading(true);
      
      const { error } = await supabase.from('tasks').insert({
        project_id: selectedProject,
        creator_id: user.id,
        title,
        description,
        required_skills: skills ? skills.split(',').map(s => s.trim()) : [],
        reward_tokens: reward,
      });
      
      if (error) throw error;
      
      // Update project token balance
      await supabase
        .from('projects')
        .update({ token_balance: project.token_balance - reward })
        .eq('id', selectedProject);
      
      toast({ title: "Success", description: "Task created successfully!" });
      
      // Reset form
      setSelectedProject('');
      setTitle('');
      setDescription('');
      setRewardTokens('');
      setSkills('');
      
    } catch (error) {
      toast({ title: "Error", description: "Failed to create task", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <Card className="bg-slate-900/60 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white">Connect GitHub to Create Tasks</CardTitle>
          <CardDescription>Sign in with GitHub to create tasks for your projects</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  if (availableProjects.length === 0) {
    return (
      <Card className="bg-slate-900/60 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white">No Projects Available</CardTitle>
          <CardDescription>You need projects with inner pool tokens to create tasks</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="bg-slate-900/60 border-slate-800">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Create New Task
        </CardTitle>
        <CardDescription>
          Create tasks for your projects and reward contributors with tokens
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium text-slate-300 mb-2 block">Project</label>
          <Select value={selectedProject} onValueChange={setSelectedProject}>
            <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
              <SelectValue placeholder="Select a project" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700">
              {availableProjects.map((project) => (
                <SelectItem key={project.id} value={project.id} className="text-white">
                  <div className="flex items-center justify-between w-full">
                    <span>{project.repo_name}</span>
                    <Badge className="ml-2 bg-purple-600">
                      <Coins className="h-3 w-3 mr-1" />
                      {(project.token_balance / 1000).toFixed(0)}K {project.token_symbol}
                    </Badge>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label className="text-sm font-medium text-slate-300 mb-2 block">Task Title</label>
          <Input
            placeholder="e.g., Implement user authentication"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-slate-800 border-slate-700 text-white"
          />
        </div>
        
        <div>
          <label className="text-sm font-medium text-slate-300 mb-2 block">Description</label>
          <Textarea
            placeholder="Describe the task requirements, acceptance criteria, and any additional details..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="bg-slate-800 border-slate-700 text-white min-h-[100px]"
          />
        </div>
        
        <div>
          <label className="text-sm font-medium text-slate-300 mb-2 block">Required Skills (comma-separated)</label>
          <Input
            placeholder="e.g., JavaScript, React, Node.js"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            className="bg-slate-800 border-slate-700 text-white"
          />
        </div>
        
        <div>
          <label className="text-sm font-medium text-slate-300 mb-2 block">Reward Tokens</label>
          <Input
            type="number"
            placeholder="e.g., 1000"
            value={rewardTokens}
            onChange={(e) => setRewardTokens(e.target.value)}
            className="bg-slate-800 border-slate-700 text-white"
          />
        </div>
        
        <Button 
          onClick={createTask} 
          disabled={loading} 
          className="w-full bg-purple-600 hover:bg-purple-700"
        >
          {loading ? 'Creating Task...' : 'Create Task'}
        </Button>
      </CardContent>
    </Card>
  );
};
