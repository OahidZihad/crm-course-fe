import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Users, BookOpen, Activity, TrendingUp } from "lucide-react";

export default function AdminDashboard() {
  const stats = [
    { label: "Total Platform Revenue", value: "$424,500", icon: DollarSign, color: "bg-primary" },
    { label: "Active Teachers", value: "145", icon: Users, color: "bg-secondary" },
    { label: "Total Students", value: "12,450", icon: Users, color: "bg-accent" },
    { label: "Active Courses", value: "840", icon: BookOpen, color: "bg-chart-1" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold uppercase mb-1">Admin Overview</h1>
        <p className="font-bold text-gray-600">Platform health and performance.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <Card key={i} className={`border-4 border-border shadow-[8px_8px_0px_0px_#a8a6ff] rounded-none ${stat.color}`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 border-b-2 border-border">
              <CardTitle className="text-sm font-bold uppercase text-black">{stat.label}</CardTitle>
              <stat.icon className="h-5 w-5 text-black" />
            </CardHeader>
            <CardContent className="pt-4">
              <div className="text-3xl font-bold text-black">{stat.value}</div>
              <p className="text-xs font-bold text-black/70 mt-1 flex items-center">
                <TrendingUp className="w-3 h-3 mr-1" />
                +12.5% from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card className="border-4 border-border shadow-[8px_8px_0px_0px_#a8a6ff] rounded-none">
          <CardHeader className="border-b-2 border-border bg-muted">
            <CardTitle className="font-bold uppercase">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
             <div className="divide-y-2 divide-black">
               {[1, 2, 3, 4, 5].map((i) => (
                 <div key={i} className="flex items-center justify-between p-4 hover:bg-gray-50">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-black text-white font-bold text-xs">
                          Sys
                      </div>
                      <div>
                        <p className="font-bold text-sm">New Course Submitted</p>
                        <p className="text-xs text-gray-500 font-bold">"Advanced CSS Layouts" by Jane Doe</p>
                      </div>
                    </div>
                    <div className="text-xs font-bold text-gray-400">2 min ago</div>
                 </div>
               ))}
             </div>
          </CardContent>
        </Card>

        <Card className="border-4 border-border shadow-[8px_8px_0px_0px_#a8a6ff] rounded-none">
          <CardHeader className="border-b-2 border-border bg-muted">
             <CardTitle className="font-bold uppercase">Top Teachers</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
             <div className="divide-y-2 divide-black">
               {[1, 2, 3].map((i) => (
                 <div key={i} className="p-4 hover:bg-gray-50">
                    <div className="flex justify-between items-center mb-1">
                         <div className="flex items-center gap-2">
                            <span className="font-bold text-lg">#{i}</span>
                            <span className="font-bold">Teacher Name</span>
                         </div>
                         <span className="font-bold text-green-600">$12,450</span>
                    </div>
                    <div className="text-xs font-bold text-gray-500 pl-6">245 Students Enrolled</div>
                 </div>
               ))}
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
