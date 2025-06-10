
import { Navigation } from "@/components/Navigation";
import { TasksList } from "@/components/TasksList";

const Marketplace = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Task Marketplace
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Discover and accept tasks from the GitLaunch community. Earn project tokens for your contributions.
          </p>
        </div>
        
        <TasksList />
      </div>
    </div>
  );
};

export default Marketplace;
