
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Github, 
  Zap, 
  Shield, 
  Users, 
  LineChart, 
  Code, 
  Rocket,
  CheckCircle,
  Lock,
  ArrowRight
} from "lucide-react";

export const FeaturesSection = () => {
  return (
    <section className="py-20 px-4 relative" id="features">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-purple-600/20 text-purple-300 border-purple-500/30 px-4 py-2">
            Features
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            For Developers, By Developers
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            GitLaunch combines GitHub verification with decentralized token creation for trustless project launches.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1: GitHub Authentication */}
          <Card className="bg-slate-900/60 border-slate-800 hover:border-purple-600/60 transition-colors">
            <CardHeader>
              <Github className="h-12 w-12 text-purple-400 mb-4" />
              <CardTitle className="text-white text-2xl">GitHub Authentication</CardTitle>
              <CardDescription className="text-slate-400">
                Link your identity to your GitHub profile
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300">
                Connect your GitHub account to verify your developer identity and establish trust through your code contributions.
              </p>
              <div className="mt-4 space-y-2">
                <div className="flex items-center text-slate-400">
                  <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                  <span>OAuth Integration</span>
                </div>
                <div className="flex items-center text-slate-400">
                  <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                  <span>Repository Analysis</span>
                </div>
                <div className="flex items-center text-slate-400">
                  <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                  <span>Developer Identity</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Feature 2: AI Verification */}
          <Card className="bg-slate-900/60 border-slate-800 hover:border-purple-600/60 transition-colors">
            <CardHeader>
              <Shield className="h-12 w-12 text-green-400 mb-4" />
              <CardTitle className="text-white text-2xl">AI Verification & Rating</CardTitle>
              <CardDescription className="text-slate-400">
                Get scored on real developer activity
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300">
                Our AI model evaluates your GitHub repositories, commit history, and community engagement to generate a credibility score.
              </p>
              <div className="mt-4 space-y-2">
                <div className="flex items-center text-slate-400">
                  <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                  <span>Commit Analysis</span>
                </div>
                <div className="flex items-center text-slate-400">
                  <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                  <span>Reputation Scoring</span>
                </div>
                <div className="flex items-center text-slate-400">
                  <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                  <span>Fraud Detection</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Feature 3: Token Launch */}
          <Card className="bg-slate-900/60 border-slate-800 hover:border-purple-600/60 transition-colors">
            <CardHeader>
              <Rocket className="h-12 w-12 text-blue-400 mb-4" />
              <CardTitle className="text-white text-2xl">Token Launch Process</CardTitle>
              <CardDescription className="text-slate-400">
                Deploy tokens with minimal friction
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300">
                Streamlined token creation and deployment on multiple blockchains with automated smart contract generation.
              </p>
              <div className="mt-4 space-y-2">
                <div className="flex items-center text-slate-400">
                  <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                  <span>Multi-chain Support</span>
                </div>
                <div className="flex items-center text-slate-400">
                  <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                  <span>Smart Contract Automation</span>
                </div>
                <div className="flex items-center text-slate-400">
                  <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                  <span>Liquidity Pool Creation</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Feature 4: Community Validation */}
          <Card className="bg-slate-900/60 border-slate-800 hover:border-purple-600/60 transition-colors">
            <CardHeader>
              <Users className="h-12 w-12 text-yellow-400 mb-4" />
              <CardTitle className="text-white text-2xl">Community Validation</CardTitle>
              <CardDescription className="text-slate-400">
                Leverage your existing developer community
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300">
                Incorporate community feedback through GitHub stars, issues, and pull requests to build project credibility.
              </p>
              <div className="mt-4 space-y-2">
                <div className="flex items-center text-slate-400">
                  <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                  <span>Social Proof</span>
                </div>
                <div className="flex items-center text-slate-400">
                  <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                  <span>Contribution Metrics</span>
                </div>
                <div className="flex items-center text-slate-400">
                  <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                  <span>Community Engagement</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Feature 5: Liquidity */}
          <Card className="bg-slate-900/60 border-slate-800 hover:border-purple-600/60 transition-colors">
            <CardHeader>
              <LineChart className="h-12 w-12 text-purple-400 mb-4" />
              <CardTitle className="text-white text-2xl">Liquidity Provision</CardTitle>
              <CardDescription className="text-slate-400">
                Instant market access for your tokens
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300">
                Automatic liquidity pool creation on major DEXs to ensure immediate market access for your project tokens.
              </p>
              <div className="mt-4 space-y-2">
                <div className="flex items-center text-slate-400">
                  <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                  <span>DEX Integration</span>
                </div>
                <div className="flex items-center text-slate-400">
                  <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                  <span>Auto Pool Creation</span>
                </div>
                <div className="flex items-center text-slate-400">
                  <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                  <span>Market Access</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Feature 6: Security */}
          <Card className="bg-slate-900/60 border-slate-800 hover:border-purple-600/60 transition-colors">
            <CardHeader>
              <Lock className="h-12 w-12 text-green-400 mb-4" />
              <CardTitle className="text-white text-2xl">Security & Compliance</CardTitle>
              <CardDescription className="text-slate-400">
                Built-in protections for projects and investors
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300">
                KYC/AML integration and smart contract audits to ensure trust, safety, and regulatory compliance.
              </p>
              <div className="mt-4 space-y-2">
                <div className="flex items-center text-slate-400">
                  <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                  <span>Smart Contract Audits</span>
                </div>
                <div className="flex items-center text-slate-400">
                  <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                  <span>KYC Integration</span>
                </div>
                <div className="flex items-center text-slate-400">
                  <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                  <span>Regulatory Compliance</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
