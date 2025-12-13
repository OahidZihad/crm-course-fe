import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Users, BookOpen, Star, TrendingUp, Monitor, Smartphone, Globe, ArrowUpRight } from "lucide-react";
import Link from "next/link";

// Mock Data for Chart
const revenueData = [
  { month: "Jan", amount: 4500 },
  { month: "Feb", amount: 5200 },
  { month: "Mar", amount: 4800 },
  { month: "Apr", amount: 6100 },
  { month: "May", amount: 5900 },
  { month: "Jun", amount: 7500 },
];

export default function TeacherDashboard() {
  const stats = [
    { label: "Total Revenue", value: "$42,450", icon: DollarSign, color: "bg-primary" },
    { label: "Active Students", value: "843", icon: Users, color: "bg-secondary" },
    { label: "Course Sales", value: "1,240", icon: BookOpen, color: "bg-accent" },
    { label: "Avg. Rating", value: "4.8", icon: Star, color: "bg-yellow-400" },
  ];

  // Helper to calculate SVG points for chart
  const maxVal = Math.max(...revenueData.map(d => d.amount));
  const points = revenueData.map((d, i) => {
    const x = (i / (revenueData.length - 1)) * 100;
    const y = 100 - (d.amount / maxVal) * 80; // Leave some headroom
    return `${x},${y}`;
  }).join(" ");
  
  const areaPath = `M0,100 ${points} 100,100 Z`;

  return (
    <div className="space-y-8 pb-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-black uppercase mb-1">Teacher Dashboard</h1>
          <p className="font-bold text-gray-600">Your empire at a glance.</p>
        </div>
        <Link href="/teacher/courses/create" className="animate-fade-in-left delay200 opacity-0 [animation-fill-mode:forwards]">
            <Button className="h-12 text-lg font-bold border-2 border-black bg-black text-white hover:bg-gray-800 shadow-[4px_4px_0px_0px_#a8a6ff] hover:translate-x-[2px] hover:translate-y-[2px] shadow-none transition-all">
            + NEW COURSE
            </Button>
        </Link>
      </div>

      {/* Top Stats */}
      <div className="grid gap-4 sm:gap-6 grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <Card key={i} className={`border-4 border-black shadow-[8px_8px_0px_0px_#a8a6ff] rounded-none ${stat.color} animate-fade-in-up opacity-0 [animation-fill-mode:forwards] relative overflow-hidden group`} style={{ animationDelay: `${i * 100}ms` }}>
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-110 duration-500">
               <stat.icon className="w-24 h-24" />
            </div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 border-b-2 border-black/10">
              <CardTitle className="text-sm font-black uppercase text-black">{stat.label}</CardTitle>
              <stat.icon className="h-5 w-5 text-black" />
            </CardHeader>
            <CardContent className="pt-4 relative z-10">
              <div className="text-3xl font-black text-black">{stat.value}</div>
              <p className="text-xs font-bold text-black/70 mt-1 flex items-center">
                <TrendingUp className="w-3 h-3 mr-1" />
                +20% from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts & Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Revenue Chart */}
          <Card className="lg:col-span-2 border-4 border-black shadow-[8px_8px_0px_0px_#a8a6ff] rounded-none animate-fade-in-up delay200 opacity-0 [animation-fill-mode:forwards]">
              <CardHeader className="border-b-2 border-black bg-gray-50 flex flex-row items-center justify-between">
                  <div className="space-y-1">
                      <CardTitle className="font-black uppercase text-xl">Earnings Overview</CardTitle>
                      <p className="text-sm font-bold text-gray-500">Revenue / 6 Months</p>
                  </div>
                  <Button variant="outline" size="sm" className="font-bold border-2 border-black hidden sm:flex">
                      DOWNLOAD REPORT
                  </Button>
              </CardHeader>
              <CardContent className="p-6">
                  <div className="h-[300px] w-full relative group">
                      {/* Grid Lines */}
                      <div className="absolute inset-x-0 bottom-0 h-px bg-gray-200"></div>
                      <div className="absolute inset-x-0 bottom-[25%] h-px bg-gray-200 border-dashed border-gray-200"></div>
                      <div className="absolute inset-x-0 bottom-[50%] h-px bg-gray-200 border-dashed border-gray-200"></div>
                      <div className="absolute inset-x-0 bottom-[75%] h-px bg-gray-200 border-dashed border-gray-200"></div>
                      
                      {/* SVG Chart */}
                      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full overflow-visible">
                          <linearGradient id="fillGradient" x1="0" x2="0" y1="0" y2="1">
                              <stop offset="0%" stopColor="#a8a6ff" stopOpacity="0.5" />
                              <stop offset="100%" stopColor="#a8a6ff" stopOpacity="0" />
                          </linearGradient>
                          
                          {/* Area Fill */}
                          <path d={areaPath} fill="url(#fillGradient)" className="transition-all duration-1000 ease-out" />
                          
                          {/* Line Stroke */}
                          <polyline 
                             fill="none" 
                             stroke="black" 
                             strokeWidth="0.5" 
                             points={points}
                             vectorEffect="non-scaling-stroke"
                             className="drop-shadow-md"
                          />
                          
                          {/* Data Points */}
                          {revenueData.map((d, i) => {
                             const x = (i / (revenueData.length - 1)) * 100;
                             const y = 100 - (d.amount / maxVal) * 80;
                             return (
                                 <circle 
                                   key={i}
                                   cx={x} 
                                   cy={y} 
                                   r="1" 
                                   className="fill-black stroke-white stroke-[0.5] hover:r-2 transition-all cursor-pointer" 
                                   vectorEffect="non-scaling-stroke"
                                 >
                                     <title>${d.amount}</title>
                                 </circle>
                             );
                          })}
                      </svg>
                      
                      {/* X-Axis Labels */}
                      <div className="flex justify-between mt-2 text-xs font-bold text-gray-500 uppercase">
                          {revenueData.map((d, i) => (
                              <span key={i}>{d.month}</span>
                          ))}
                      </div>
                  </div>
              </CardContent>
          </Card>

          {/* Visitor Stats */}
          <Card className="border-4 border-black shadow-[8px_8px_0px_0px_#a8a6ff] rounded-none animate-fade-in-up delay300 opacity-0 [animation-fill-mode:forwards]">
             <CardHeader className="border-b-2 border-black bg-gray-50">
                 <CardTitle className="font-black uppercase text-xl">Site Stats</CardTitle>
             </CardHeader>
             <CardContent className="p-6 space-y-8">
                 {/* Device Stats */}
                 <div className="space-y-4">
                     <h4 className="font-bold text-sm uppercase text-gray-500">Traffic by Device</h4>
                     <div className="space-y-3">
                         <div className="flex items-center gap-3">
                             <div className="w-8 h-8 bg-gray-100 border-2 border-black flex items-center justify-center">
                                 <Monitor className="w-4 h-4" />
                             </div>
                             <div className="flex-1">
                                 <div className="flex justify-between mb-1">
                                     <span className="font-bold text-sm">Desktop</span>
                                     <span className="font-bold text-sm">65%</span>
                                 </div>
                                 <div className="h-2 w-full bg-gray-100 border border-black rounded-full overflow-hidden">
                                     <div className="h-full bg-primary w-[65%]"></div>
                                 </div>
                             </div>
                         </div>
                         <div className="flex items-center gap-3">
                             <div className="w-8 h-8 bg-gray-100 border-2 border-black flex items-center justify-center">
                                 <Smartphone className="w-4 h-4" />
                             </div>
                             <div className="flex-1">
                                 <div className="flex justify-between mb-1">
                                     <span className="font-bold text-sm">Mobile</span>
                                     <span className="font-bold text-sm">35%</span>
                                 </div>
                                 <div className="h-2 w-full bg-gray-100 border border-black rounded-full overflow-hidden">
                                     <div className="h-full bg-secondary w-[35%]"></div>
                                 </div>
                             </div>
                         </div>
                     </div>
                 </div>

                 <div className="border-t-2 border-dashed border-gray-300"></div>

                 {/* Traffic Sources */}
                 <div className="space-y-4">
                     <h4 className="font-bold text-sm uppercase text-gray-500">Top Sources</h4>
                     <div className="space-y-2">
                         {[
                             { name: "Google Search", val: "45%", color: "bg-black" },
                             { name: "Direct", val: "30%", color: "bg-gray-600" },
                             { name: "Social", val: "25%", color: "bg-gray-400" },
                         ].map((s, i) => (
                             <div key={i} className="flex items-center justify-between text-sm font-bold group hover:bg-gray-50 p-1 rounded transition-colors cursor-pointer">
                                 <div className="flex items-center gap-2">
                                     <div className={`w-3 h-3 ${s.color} border border-black`}></div>
                                     {s.name}
                                 </div>
                                 <span>{s.val}</span>
                             </div>
                         ))}
                     </div>
                 </div>
             </CardContent>
          </Card>
      </div>

      {/* Bottom Section */}
      <div className="grid gap-6 lg:gap-8 grid-cols-1 lg:grid-cols-2">
        {/* Top Courses */}
        <Card className="border-4 border-black shadow-[8px_8px_0px_0px_#a8a6ff] rounded-none animate-fade-in-up delay400 opacity-0 [animation-fill-mode:forwards]">
          <CardHeader className="border-b-2 border-black bg-muted flex flex-row items-center justify-between">
            <CardTitle className="font-black uppercase">Top Courses</CardTitle>
            <Button variant="link" className="font-bold underline">View All</Button>
          </CardHeader>
          <CardContent className="p-0">
             <div className="divide-y-2 divide-black">
               {[
                   { name: "UI Design Fundamentals", rev: "$12,400", students: 124, progress: "w-[85%]" },
                   { name: "Advanced React Patterns", rev: "$8,250", students: 85, progress: "w-[60%]" },
                   { name: "Brutalist Web Design", rev: "$5,100", students: 42, progress: "w-[40%]" },
               ].map((c, i) => (
                 <div key={i} className="p-4 hover:bg-gray-50 transition-colors group">
                    <div className="flex justify-between items-start mb-2">
                         <div>
                             <h4 className="font-bold group-hover:text-primary transition-colors cursor-pointer">{c.name}</h4>
                             <p className="text-xs font-bold text-gray-500">{c.students} Students Enrolled</p>
                         </div>
                         <span className="font-black text-lg bg-yellow-300 px-1 border border-black shadow-[2px_2px_0px_0px_black]">{c.rev}</span>
                    </div>
                    <div className="flex items-center gap-2">
                         <div className="w-full bg-gray-100 h-3 border-2 border-black rounded-full overflow-hidden">
                             <div className={`bg-primary h-full ${c.progress} group-hover:bg-black transition-colors`}></div>
                         </div>
                         <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-black" />
                    </div>
                 </div>
               ))}
             </div>
          </CardContent>
        </Card>

        {/* Recent Sales */}
        <Card className="border-4 border-black shadow-[8px_8px_0px_0px_#a8a6ff] rounded-none animate-fade-in-up delay500 opacity-0 [animation-fill-mode:forwards]">
          <CardHeader className="border-b-2 border-black bg-muted">
            <CardTitle className="font-black uppercase">Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
             <div className="divide-y-2 divide-black">
               {[1, 2, 3, 4, 5].map((i) => (
                 <div key={i} className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors group cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-gray-200 border-2 border-black flex-shrink-0 flex items-center justify-center font-bold text-xs">IMG</div>
                      <div>
                        <p className="font-bold text-sm group-hover:underline">Student Name {i}</p>
                        <p className="text-xs text-gray-500 font-bold">Bought "UI Design Fundamentals"</p>
                      </div>
                    </div>
                    <div className="font-black text-green-600 bg-green-100 px-2 py-0.5 border border-black text-sm">+$49.00</div>
                 </div>
               ))}
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
