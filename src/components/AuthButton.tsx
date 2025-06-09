
import { Button } from "@/components/ui/button";
import { Github, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export const AuthButton = () => {
  const { user, signInWithGitHub, signOut } = useAuth();

  if (user) {
    return (
      <Button onClick={signOut} variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800">
        <LogOut className="mr-2 h-4 w-4" />
        Sign Out
      </Button>
    );
  }

  return (
    <Button onClick={signInWithGitHub} className="bg-purple-600 hover:bg-purple-700 text-white">
      <Github className="mr-2 h-4 w-4" />
      Connect GitHub
    </Button>
  );
};
