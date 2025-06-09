
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Navigation } from "@/components/Navigation";
import { 
  TrendingUp,
  TrendingDown,
  Search,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  DollarSign
} from "lucide-react";

const Marketplace = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const tokens = [
    {
      symbol: "ECO",
      name: "EcoChain Protocol",
      price: 0.0248,
      change24h: 12.4,
      volume24h: 45670,
      marketCap: 1240000,
      rating: 9.2,
      trending: "up"
    },
    {
      symbol: "DATA",
      name: "DataDAO Core",
      price: 0.0356,
      change24h: -3.2,
      volume24h: 28340,
      marketCap: 890000,
      rating: 8.7,
      trending: "down"
    },
    {
      symbol: "DEV",
      name: "DevFi Protocol",
      price: 0.0489,
      change24h: 8.7,
      volume24h: 67890,
      marketCap: 2400000,
      rating: 9.5,
      trending: "up"
    },
    {
      symbol: "CHAIN",
      name: "ChainBuilder",
      price: 0.0167,
      change24h: -1.8,
      volume24h: 15670,
      marketCap: 567000,
      rating: 7.8,
      trending: "down"
    }
  ];

  const recentTrades = [
    { symbol: "ECO", type: "buy", amount: "5,000", price: "0.0248", time: "2分钟前" },
    { symbol: "DATA", type: "sell", amount: "2,500", price: "0.0356", time: "5分钟前" },
    { symbol: "DEV", type: "buy", amount: "8,000", price: "0.0489", time: "7分钟前" },
    { symbol: "ECO", type: "buy", amount: "3,200", price: "0.0247", time: "12分钟前" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">C2C交易市场</h1>
            <p className="text-slate-300">基于Meteora DLMM的代码资产交易</p>
          </div>

          {/* 搜索和筛选 */}
          <div className="mb-6">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="搜索代币..."
                className="pl-10 bg-slate-900 border-slate-700 text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* 代币列表 */}
            <div className="lg:col-span-2">
              <Card className="bg-slate-900/80 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">代币市场</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {tokens.map((token, index) => (
                      <div key={index} className="bg-slate-800 rounded-lg p-4 hover:bg-slate-700 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                              <span className="text-white font-bold text-sm">{token.symbol[0]}</span>
                            </div>
                            <div>
                              <h3 className="text-white font-medium">{token.name}</h3>
                              <div className="flex items-center space-x-2">
                                <Badge className="bg-purple-600/20 text-purple-300 text-xs">
                                  {token.symbol}
                                </Badge>
                                <div className="flex items-center text-xs">
                                  <span className="text-slate-400 mr-1">AI评级:</span>
                                  <span className="text-green-400 font-medium">{token.rating}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <div className="text-white font-bold">${token.price.toFixed(4)}</div>
                            <div className={`text-sm flex items-center ${
                              token.change24h > 0 ? 'text-green-400' : 'text-red-400'
                            }`}>
                              {token.trending === 'up' ? (
                                <TrendingUp className="h-3 w-3 mr-1" />
                              ) : (
                                <TrendingDown className="h-3 w-3 mr-1" />
                              )}
                              {Math.abs(token.change24h)}%
                            </div>
                          </div>
                          
                          <div className="text-right text-sm">
                            <div className="text-slate-400">24h成交量</div>
                            <div className="text-white">${token.volume24h.toLocaleString()}</div>
                          </div>
                          
                          <div className="flex space-x-2">
                            <Button size="sm" className="bg-green-600 hover:bg-green-700">
                              买入
                            </Button>
                            <Button size="sm" variant="outline" className="border-red-600 text-red-400 hover:bg-red-600/10">
                              卖出
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 交易面板和最近交易 */}
            <div className="space-y-6">
              {/* 交易面板 */}
              <Card className="bg-slate-900/80 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">快速交易</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-slate-300 text-sm">选择代币</label>
                    <select className="w-full mt-1 bg-slate-800 border border-slate-600 rounded-md p-2 text-white">
                      <option>ECO - EcoChain Protocol</option>
                      <option>DATA - DataDAO Core</option>
                      <option>DEV - DevFi Protocol</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="text-slate-300 text-sm">数量</label>
                    <Input
                      placeholder="输入数量"
                      className="bg-slate-800 border-slate-600 text-white"
                    />
                  </div>
                  
                  <div className="bg-slate-800 rounded-lg p-3">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-400">当前价格</span>
                      <span className="text-white">$0.0248</span>
                    </div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-400">Meteora手续费</span>
                      <span className="text-white">0.25%</span>
                    </div>
                    <div className="flex justify-between text-sm border-t border-slate-700 pt-2">
                      <span className="text-slate-400">预估总价</span>
                      <span className="text-white font-medium">$0.00</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <Button className="bg-green-600 hover:bg-green-700">
                      <ArrowUpRight className="mr-2 h-4 w-4" />
                      买入
                    </Button>
                    <Button variant="outline" className="border-red-600 text-red-400 hover:bg-red-600/10">
                      <ArrowDownRight className="mr-2 h-4 w-4" />
                      卖出
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* 最近交易 */}
              <Card className="bg-slate-900/80 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Activity className="mr-2 h-5 w-5" />
                    最近交易
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentTrades.map((trade, index) => (
                      <div key={index} className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-2">
                          <Badge className={`${
                            trade.type === 'buy' ? 'bg-green-600/20 text-green-300' : 'bg-red-600/20 text-red-300'
                          } text-xs`}>
                            {trade.type === 'buy' ? '买入' : '卖出'}
                          </Badge>
                          <span className="text-white">{trade.symbol}</span>
                        </div>
                        <div className="text-right">
                          <div className="text-white">{trade.amount}</div>
                          <div className="text-slate-400 text-xs">${trade.price}</div>
                        </div>
                        <div className="text-slate-400 text-xs">{trade.time}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
