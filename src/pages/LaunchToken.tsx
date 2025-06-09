
import { Navigation } from "@/components/Navigation";
import { ProjectSubmission } from "@/components/ProjectSubmission";
import { ProjectsList } from "@/components/ProjectsList";

const LaunchToken = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Launch Your Token
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Submit your GitHub repository for AI evaluation. Projects with ratings ≥80 can create inner pool tokens.
          </p>
        </div>
        
        <div className="space-y-12">
          <ProjectSubmission />
          <ProjectsList />
        </div>
      </div>
    </div>
  );
};

export default LaunchToken;
