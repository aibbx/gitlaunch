
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Github, Star, GitFork, GitCommit, AlertCircle, Coins } from "lucide-react";
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { calculateAIRating, getProjectStatus, canCreateInnerToken } from '@/utils/aiRating';
import { toast } from '@/components/ui/use-toast';

export const ProjectSubmission = () => {
  const { user } = useAuth();
  const [repoUrl, setRepoUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  const extractRepoInfo = (url: string) => {
    const match = url.match(/github\.com\/([^\/]+)\/([^\/]+)/);
    if (!match) throw new Error('Invalid GitHub URL');
    return { owner: match[1], repo: match[2] };
  };

  const simulateGitHubAPI = async (owner: string, repo: string) => {
    // Simulate GitHub API response with mock data
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockData = {
      full_name: `${owner}/${repo}`,
      description: `A sample ${repo} project for GitLaunch demo`,
      stargazers_count: Math.floor(Math.random() * 2000) + 100,
      forks_count: Math.floor(Math.random() * 500) + 10,
      open_issues_count: Math.floor(Math.random() * 50) + 5,
      // Simulate commits and closed issues
      commits_count: Math.floor(Math.random() * 1000) + 50,
      closed_issues: Math.floor(Math.random() * 100) + 20,
    };
    
    return mockData;
  };

  const analyzeProject = async () => {
    if (!repoUrl.trim()) {
      toast({ title: "Error", description: "Please enter a repository URL", variant: "destructive" });
      return;
    }

    try {
      setAnalyzing(true);
      const { owner, repo } = extractRepoInfo(repoUrl);
      
      // Simulate GitHub API call
      const repoData = await simulateGitHubAPI(owner, repo);
      
      const ratingData = {
        stars: repoData.stargazers_count,
        commits: repoData.commits_count,
        forks: repoData.forks_count,
        issues: repoData.open_issues_count + repoData.closed_issues,
        openIssues: repoData.open_issues_count,
        closedIssues: repoData.closed_issues,
      };
      
      const rating = calculateAIRating(ratingData);
      const status = getProjectStatus(rating);
      const canCreateToken = canCreateInnerToken(rating);
      
      setAnalysisResult({
        ...repoData,
        ...ratingData,
        rating,
        status,
        canCreateToken,
        tokenSymbol: canCreateToken ? `${repo.toUpperCase().slice(0, 4)}` : null,
      });
      
    } catch (error) {
      toast({ title: "Error", description: "Failed to analyze repository", variant: "destructive" });
    } finally {
      setAnalyzing(false);
    }
  };

  const submitProject = async () => {
    if (!user || !analysisResult) return;
    
    try {
      setLoading(true);
      
      const { error } = await supabase.from('projects').insert({
        user_id: user.id,
        repo_url: repoUrl,
        repo_name: analysisResult.full_name,
        description: analysisResult.description,
        stars: analysisResult.stars,
        commits: analysisResult.commits,
        forks: analysisResult.forks,
        issues: analysisResult.issues,
        rating: analysisResult.rating,
        status: analysisResult.status,
        token_symbol: analysisResult.tokenSymbol,
        token_balance: analysisResult.canCreateToken ? 1000000 : 0, // 1M tokens for inner pool
      });
      
      if (error) throw error;
      
      toast({ title: "Success", description: "Project submitted successfully!" });
      setRepoUrl('');
      setAnalysisResult(null);
      
    } catch (error) {
      toast({ title: "Error", description: "Failed to submit project", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <Card className="bg-slate-900/60 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white">Connect GitHub to Submit Projects</CardTitle>
          <CardDescription>Sign in with GitHub to analyze and submit your repositories</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="bg-slate-900/60 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Github className="h-5 w-5" />
            Submit GitHub Repository
          </CardTitle>
          <CardDescription>
            Submit your repository for AI analysis and potential token creation
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="https://github.com/username/repository"
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
              className="bg-slate-800 border-slate-700 text-white"
            />
            <Button onClick={analyzeProject} disabled={analyzing} className="bg-purple-600 hover:bg-purple-700">
              {analyzing ? 'Analyzing...' : 'Analyze'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {analysisResult && (
        <Card className="bg-slate-900/60 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white">Analysis Results</CardTitle>
            <CardDescription>{analysisResult.full_name}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-yellow-400">
                  <Star className="h-4 w-4" />
                  <span className="font-semibold">{analysisResult.stars}</span>
                </div>
                <div className="text-sm text-slate-400">Stars</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-blue-400">
                  <GitCommit className="h-4 w-4" />
                  <span className="font-semibold">{analysisResult.commits}</span>
                </div>
                <div className="text-sm text-slate-400">Commits</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-green-400">
                  <GitFork className="h-4 w-4" />
                  <span className="font-semibold">{analysisResult.forks}</span>
                </div>
                <div className="text-sm text-slate-400">Forks</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-red-400">
                  <AlertCircle className="h-4 w-4" />
                  <span className="font-semibold">{analysisResult.issues}</span>
                </div>
                <div className="text-sm text-slate-400">Issues</div>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-slate-800 rounded-lg">
              <div>
                <div className="text-2xl font-bold text-white">
                  AI Rating: {analysisResult.rating}/100
                </div>
                <div className="flex gap-2 mt-2">
                  <Badge variant={analysisResult.status === 'graduated' ? 'default' : 
                                analysisResult.status === 'inner_pool' ? 'secondary' : 'outline'}>
                    {analysisResult.status.replace('_', ' ').toUpperCase()}
                  </Badge>
                  {analysisResult.canCreateToken && (
                    <Badge className="bg-purple-600">
                      <Coins className="h-3 w-3 mr-1" />
                      {analysisResult.tokenSymbol} Token
                    </Badge>
                  )}
                </div>
              </div>
              <Button onClick={submitProject} disabled={loading} className="bg-green-600 hover:bg-green-700">
                {loading ? 'Submitting...' : 'Submit Project'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
