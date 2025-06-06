
import { Card, CardContent } from "@/components/ui/card";
import { CircleDashed, Code, Rocket, Users } from "lucide-react";

export const StatsSection = () => {
  return (
    <section className="py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <StatCard 
            icon={<Users className="h-8 w-8 text-purple-400" />}
            value="1,247+"
            label="Verified Developers"
          />
          <StatCard 
            icon={<Rocket className="h-8 w-8 text-blue-400" />}
            value="83"
            label="Tokens Launched"
          />
          <StatCard 
            icon={<Code className="h-8 w-8 text-green-400" />}
            value="$12M+"
            label="Capital Raised"
          />
          <StatCard 
            icon={<CircleDashed className="h-8 w-8 text-yellow-400" />}
            value="3"
            label="Blockchains Supported"
          />
        </div>
      </div>
    </section>
  );
};

const StatCard = ({ icon, value, label }: { 
  icon: React.ReactNode;
  value: string;
  label: string;
}) => {
  return (
    <Card className="bg-slate-900/60 border-slate-800">
      <CardContent className="p-6 text-center">
        <div className="flex justify-center mb-4">
          {icon}
        </div>
        <h3 className="text-3xl font-bold text-white mb-1">{value}</h3>
        <p className="text-slate-400">{label}</p>
      </CardContent>
    </Card>
  );
};
