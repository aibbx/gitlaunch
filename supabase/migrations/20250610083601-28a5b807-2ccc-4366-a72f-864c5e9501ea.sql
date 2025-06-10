
-- 先删除现有的表和类型（如果存在）
DROP TABLE IF EXISTS token_transactions CASCADE;
DROP TABLE IF EXISTS dlmm_pools CASCADE;
DROP TABLE IF EXISTS tasks CASCADE;
DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;

-- 删除现有的枚举类型（如果存在）
DROP TYPE IF EXISTS project_status CASCADE;
DROP TYPE IF EXISTS task_status CASCADE;
DROP TYPE IF EXISTS transaction_type CASCADE;

-- 重新创建枚举类型
CREATE TYPE project_status AS ENUM ('pending', 'inner_pool', 'graduated');
CREATE TYPE task_status AS ENUM ('open', 'in_progress', 'completed', 'cancelled');
CREATE TYPE transaction_type AS ENUM ('task_reward', 'platform_fee', 'burn', 'trade');

-- 用户配置表
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

-- 项目表
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  repo_url TEXT NOT NULL UNIQUE,
  repo_name TEXT NOT NULL,
  description TEXT,
  stars INTEGER DEFAULT 0,
  commits INTEGER DEFAULT 0,
  forks INTEGER DEFAULT 0,
  issues INTEGER DEFAULT 0,
  rating DECIMAL(4,1) DEFAULT 0,
  status project_status DEFAULT 'pending',
  token_symbol TEXT,
  token_balance BIGINT DEFAULT 0,
  total_volume DECIMAL(15,2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 任务表
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

-- 代币交易记录表
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

-- Meteora DLMM 池模拟表
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

-- 启用RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE token_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE dlmm_pools ENABLE ROW LEVEL SECURITY;

-- RLS策略
CREATE POLICY "Users can view all profiles" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can manage own profile" ON profiles FOR ALL USING (auth.uid() = id);

CREATE POLICY "Anyone can view projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Users can create own projects" ON projects FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own projects" ON projects FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Anyone can view tasks" ON tasks FOR SELECT USING (true);
CREATE POLICY "Users can create tasks for own projects" ON tasks FOR INSERT WITH CHECK (
  auth.uid() = creator_id AND 
  EXISTS (SELECT 1 FROM projects WHERE id = project_id AND user_id = auth.uid())
);
CREATE POLICY "Task participants can update" ON tasks FOR UPDATE USING (
  auth.uid() = creator_id OR auth.uid() = assignee_id
);

CREATE POLICY "Users can view relevant transactions" ON token_transactions FOR SELECT USING (
  auth.uid() = user_id OR 
  EXISTS (SELECT 1 FROM projects WHERE id = project_id AND user_id = auth.uid())
);
CREATE POLICY "System can insert transactions" ON token_transactions FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can view pools" ON dlmm_pools FOR SELECT USING (true);
CREATE POLICY "Project owners can manage pools" ON dlmm_pools FOR ALL USING (
  EXISTS (SELECT 1 FROM projects WHERE id = project_id AND user_id = auth.uid())
);

-- 创建索引
CREATE INDEX idx_projects_user_id ON projects(user_id);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_rating ON projects(rating);
CREATE INDEX idx_tasks_project_id ON tasks(project_id);
CREATE INDEX idx_tasks_status ON tasks(status);
CREATE INDEX idx_tasks_assignee_id ON tasks(assignee_id);
CREATE INDEX idx_token_transactions_user_id ON token_transactions(user_id);
CREATE INDEX idx_token_transactions_project_id ON token_transactions(project_id);

-- 删除现有触发器和函数（如果存在）
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS handle_new_user();

-- 用户注册触发器
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

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();
