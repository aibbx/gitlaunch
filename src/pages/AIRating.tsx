
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const AIRating = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            AI Rating System
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Understand how our AI evaluates GitHub repositories for token creation eligibility.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="bg-slate-900/60 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white">Rating Formula</CardTitle>
              <CardDescription>How we calculate project ratings</CardDescription>
            </CardHeader>
            <CardContent className="text-slate-300 space-y-4">
              <div>
                <h4 className="font-semibold text-white mb-2">Stars Score (Max 20 points)</h4>
                <p>Based on GitHub stars: (Stars ÷ 100) × 20</p>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">Commits Score (Max 30 points)</h4>
                <p>Based on total commits: (Commits ÷ 10) × 30</p>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">Forks Score (Max 20 points)</h4>
                <p>Based on repository forks: (Forks ÷ 50) × 20</p>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">Issues Activity (Max 30 points)</h4>
                <p>Based on issue resolution rate: (Closed Issues ÷ Total Issues) × 30</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-900/60 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white">Rating Thresholds</CardTitle>
              <CardDescription>What each rating level means</CardDescription>
            </CardHeader>
            <CardContent className="text-slate-300 space-y-4">
              <div className="p-4 bg-red-900/20 border border-red-800 rounded-lg">
                <h4 className="font-semibold text-red-300 mb-2">Pending (0-79)</h4>
                <p>Project needs improvement before token creation</p>
              </div>
              <div className="p-4 bg-purple-900/20 border border-purple-800 rounded-lg">
                <h4 className="font-semibold text-purple-300 mb-2">Inner Pool (80-84)</h4>
                <p>Eligible for inner pool token creation</p>
              </div>
              <div className="p-4 bg-green-900/20 border border-green-800 rounded-lg">
                <h4 className="font-semibold text-green-300 mb-2">Graduated (85+)</h4>
                <p>Can graduate to Meteora DLMM pool</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AIRating;
