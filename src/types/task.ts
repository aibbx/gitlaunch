
export interface Task {
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
