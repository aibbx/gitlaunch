
-- Create enum types
CREATE TYPE project_status AS ENUM ('pending', 'inner_pool', 'graduated');
CREATE TYPE task_status AS ENUM ('open', 'in_progress', 'completed', 'cancelled');
CREATE TYPE transaction_type AS ENUM ('task_reward', 'platform_fee', 'burn', 'trade');

-- Projects table for GitHub repositories
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  repo_url TEXT NOT NULL,
  repo_name TEXT NOT NULL,
  description TEXT,
  stars INTEGER DEFAULT 0,
  commits INTEGER DEFAULT 0,
  forks INTEGER DEFAULT 0,
  issues INTEGER DEFAULT 0,
  rating DECIMAL(3,1) DEFAULT 0,
  status project_status DEFAULT 'pending',
  token_symbol TEXT,
  token_balance BIGINT DEFAULT 0,
  total_volume DECIMAL(15,2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(repo_url)
);

-- Tasks table for C2C task matching
CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  creator_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  assignee_id UUID REFERENCES auth.users(id),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  required_skills TEXT[],
  reward_tokens BIGINT NOT NULL,
  status task_status DEFAULT 'open',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Token transactions for tracking all token movements
CREATE TABLE token_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id),
  task_id UUID REFERENCES tasks(id),
  type transaction_type NOT NULL,
  amount BIGINT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Meteora DLMM pools simulation
CREATE TABLE dlmm_pools (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  token_symbol TEXT NOT NULL,
  liquidity_sol DECIMAL(15,2) DEFAULT 0,
  liquidity_tokens BIGINT DEFAULT 0,
  current_price DECIMAL(10,6) DEFAULT 0,
  fee_percentage DECIMAL(5,3) DEFAULT 0.25,
  total_fees_collected DECIMAL(15,2) DEFAULT 0,
  platform_fees DECIMAL(15,2) DEFAULT 0,
  developer_fees DECIMAL(15,2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User profiles for storing GitHub data and skills
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  github_username TEXT,
  avatar_url TEXT,
  bio TEXT,
  programming_languages TEXT[],
  total_commits INTEGER DEFAULT 0,
  github_score INTEGER DEFAULT 0,
  total_tokens_earned BIGINT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on all tables
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE token_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE dlmm_pools ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies for projects
CREATE POLICY "Users can view all projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Users can create their own projects" ON projects FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own projects" ON projects FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for tasks
CREATE POLICY "Users can view all tasks" ON tasks FOR SELECT USING (true);
CREATE POLICY "Users can create tasks for their projects" ON tasks FOR INSERT WITH CHECK (
  auth.uid() = creator_id AND 
  EXISTS (SELECT 1 FROM projects WHERE id = project_id AND user_id = auth.uid())
);
CREATE POLICY "Task creators and assignees can update" ON tasks FOR UPDATE USING (
  auth.uid() = creator_id OR auth.uid() = assignee_id
);

-- RLS Policies for token_transactions
CREATE POLICY "Users can view their transactions" ON token_transactions FOR SELECT USING (
  auth.uid() = user_id OR 
  EXISTS (SELECT 1 FROM projects WHERE id = project_id AND user_id = auth.uid())
);
CREATE POLICY "System can insert transactions" ON token_transactions FOR INSERT WITH CHECK (true);

-- RLS Policies for dlmm_pools
CREATE POLICY "Users can view all pools" ON dlmm_pools FOR SELECT USING (true);
CREATE POLICY "Project owners can manage pools" ON dlmm_pools FOR ALL USING (
  EXISTS (SELECT 1 FROM projects WHERE id = project_id AND user_id = auth.uid())
);

-- RLS Policies for profiles
CREATE POLICY "Users can view all profiles" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can manage their own profile" ON profiles FOR ALL USING (auth.uid() = id);

-- Create indexes for performance
CREATE INDEX idx_projects_user_id ON projects(user_id);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_rating ON projects(rating);
CREATE INDEX idx_tasks_project_id ON tasks(project_id);
CREATE INDEX idx_tasks_status ON tasks(status);
CREATE INDEX idx_tasks_assignee_id ON tasks(assignee_id);
CREATE INDEX idx_token_transactions_user_id ON token_transactions(user_id);
CREATE INDEX idx_token_transactions_project_id ON token_transactions(project_id);

-- Function to handle new user registration
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, github_username, avatar_url)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'user_name',
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user registration
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();
