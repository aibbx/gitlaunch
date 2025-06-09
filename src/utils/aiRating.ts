
// AI Rating calculation based on GitHub repository data
export interface RepoData {
  stars: number;
  commits: number;
  forks: number;
  issues: number;
  openIssues: number;
  closedIssues: number;
}

export const calculateAIRating = (data: RepoData): number => {
  // Rating formula based on product document
  const starsScore = Math.min((data.stars / 100) * 20, 20);
  const commitsScore = Math.min((data.commits / 10) * 30, 30);
  const forksScore = Math.min((data.forks / 50) * 20, 20);
  
  // Issues activity score (higher ratio of closed issues is better)
  const issuesRatio = data.issues > 0 ? data.closedIssues / data.issues : 0;
  const issuesScore = issuesRatio * 30;
  
  const totalScore = starsScore + commitsScore + forksScore + issuesScore;
  return Math.round(Math.min(totalScore, 100) * 10) / 10; // Round to 1 decimal place
};

export const getProjectStatus = (rating: number) => {
  if (rating >= 85) return 'graduated';
  if (rating >= 80) return 'inner_pool';
  return 'pending';
};

export const canCreateInnerToken = (rating: number) => rating >= 80;
export const canGraduate = (rating: number, volume: number) => rating >= 85 && volume >= 10000;
