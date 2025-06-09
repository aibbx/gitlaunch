
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Navigation } from "@/components/Navigation";
import { Github, Wallet, Coins, TrendingUp, CheckCircle } from "lucide-react";

const LaunchToken = () => {
  const [step, setStep] = useState(1);
  const [projectUrl, setProjectUrl] = useState("");
  const [tokenName, setTokenName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [initialSupply, setInitialSupply] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">发行项目代币</h1>
            <p className="text-slate-300 text-lg">基于GitHub项目在Solana上发行SPL代币</p>
          </div>

          {/* 步骤指示器 */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    step >= i ? 'bg-purple-600 text-white' : 'bg-slate-700 text-slate-400'
                  }`}>
                    {step > i ? <CheckCircle className="h-5 w-5" /> : i}
                  </div>
                  {i < 4 && <div className={`w-16 h-1 ${step > i ? 'bg-purple-600' : 'bg-slate-700'}`} />}
                </div>
              ))}
            </div>
          </div>

          <Card className="bg-slate-900/80 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">
                {step === 1 && "步骤 1: GitHub项目验证"}
                {step === 2 && "步骤 2: 代币参数设置"}
                {step === 3 && "步骤 3: Meteora流动性池配置"}
                {step === 4 && "步骤 4: 确认发行"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              
              {step === 1 && (
                <div className="space-y-4">
                  <div>
                    <Label className="text-slate-300">GitHub项目URL</Label>
                    <Input
                      value={projectUrl}
                      onChange={(e) => setProjectUrl(e.target.value)}
                      placeholder="https://github.com/username/repository"
                      className="bg-slate-800 border-slate-600 text-white"
                    />
                  </div>
                  
                  {projectUrl && (
                    <Card className="bg-slate-800 border-slate-600">
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-3 mb-3">
                          <Github className="h-5 w-5 text-purple-400" />
                          <span className="text-white font-medium">项目分析结果</span>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <div className="text-slate-400">AI评级</div>
                            <div className="text-green-400 font-bold">8.7/10</div>
                          </div>
                          <div>
                            <div className="text-slate-400">Stars</div>
                            <div className="text-white">1,247</div>
                          </div>
                          <div>
                            <div className="text-slate-400">Commits</div>
                            <div className="text-white">892</div>
                          </div>
                          <div>
                            <div className="text-slate-400">贡献者</div>
                            <div className="text-white">23</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-slate-300">代币名称</Label>
                      <Input
                        value={tokenName}
                        onChange={(e) => setTokenName(e.target.value)}
                        placeholder="Project Token"
                        className="bg-slate-800 border-slate-600 text-white"
                      />
                    </div>
                    <div>
                      <Label className="text-slate-300">代币符号</Label>
                      <Input
                        value={tokenSymbol}
                        onChange={(e) => setTokenSymbol(e.target.value)}
                        placeholder="PROJ"
                        className="bg-slate-800 border-slate-600 text-white"
                      />
                    </div>
                  </div>
                  <div>
                    <Label className="text-slate-300">初始供应量</Label>
                    <Input
                      value={initialSupply}
                      onChange={(e) => setInitialSupply(e.target.value)}
                      placeholder="1000000"
                      type="number"
                      className="bg-slate-800 border-slate-600 text-white"
                    />
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <div className="bg-slate-800 border border-slate-600 rounded-lg p-4">
                    <h3 className="text-white font-medium mb-3">Meteora DLMM池配置</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-slate-400">债券曲线类型</span>
                        <Badge className="bg-purple-600/20 text-purple-300">动态</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">交易手续费</span>
                        <span className="text-white">0.15% - 15% (动态)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">手续费分成</span>
                        <span className="text-white">平台:开发者 = 50:50</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">流动性锁定</span>
                        <span className="text-green-400">永久锁定</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-4">
                  <div className="bg-slate-800 border border-slate-600 rounded-lg p-4">
                    <h3 className="text-white font-medium mb-3">发行确认</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-400">项目:</span>
                        <span className="text-white">{projectUrl}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">代币:</span>
                        <span className="text-white">{tokenName} ({tokenSymbol})</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">供应量:</span>
                        <span className="text-white">{initialSupply}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">区块链:</span>
                        <span className="text-purple-400">Solana</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 p-3 bg-yellow-600/20 border border-yellow-500/30 rounded-lg">
                    <Wallet className="h-5 w-5 text-yellow-400" />
                    <span className="text-yellow-300 text-sm">请连接Phantom钱包以完成代币发行</span>
                  </div>
                </div>
              )}

              <div className="flex justify-between pt-6">
                <Button
                  variant="outline"
                  onClick={() => setStep(Math.max(1, step - 1))}
                  disabled={step === 1}
                  className="border-slate-600 text-slate-300"
                >
                  上一步
                </Button>
                
                {step < 4 ? (
                  <Button
                    onClick={() => setStep(step + 1)}
                    className="bg-purple-600 hover:bg-purple-700"
                    disabled={
                      (step === 1 && !projectUrl) ||
                      (step === 2 && (!tokenName || !tokenSymbol || !initialSupply))
                    }
                  >
                    下一步
                  </Button>
                ) : (
                  <Button className="bg-green-600 hover:bg-green-700">
                    <Coins className="mr-2 h-4 w-4" />
                    发行代币
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LaunchToken;
