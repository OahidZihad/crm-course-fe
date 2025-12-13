import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Trophy, Clock, PlayCircle } from "lucide-react";
import Link from "next/link";

export default function StudentDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold uppercase mb-1">My Dashboard</h1>
        <p className="font-bold text-gray-600 text-sm sm:text-base">Welcome back, Student. Ready to learn?</p>
      </div>

        {/* Stats */}
        {/* Stats */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-3">
        {[
            { label: "Courses In Progress", value: "3", icon: BookOpen, color: "bg-primary" },
            { label: "Hours Learned", value: "24.5", icon: Clock, color: "bg-secondary" },
            { label: "Certificates", value: "1", icon: Trophy, color: "bg-accent" },
        ].map((stat, i) => (
           <Card key={i} className={`border-4 border-border shadow-[6px_6px_0px_0px_#a8a6ff] rounded-none ${stat.color} animate-fade-in-up opacity-0 [animation-fill-mode:forwards]`} style={{ animationDelay: `${i * 100}ms` }}>
              <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
                  <CardTitle className="text-sm font-bold uppercase text-black">{stat.label}</CardTitle>
                  <stat.icon className="w-5 h-5 text-black" />
              </CardHeader>
              <CardContent>
                  <div className="text-4xl font-bold text-black">{stat.value}</div>
              </CardContent>
           </Card>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
         {/* Continue Learning */}
         <div className="lg:col-span-2 space-y-8">
            <h2 className="text-2xl font-bold uppercase border-b-4 border-border inline-block">Continue Learning</h2>
            
            <div className="space-y-6">
                {[1, 2].map((i) => (
                  <div key={i} className={`border-4 border-border bg-white p-6 shadow-[8px_8px_0px_0px_#a8a6ff] flex flex-col md:flex-row gap-6 animate-fade-in-right opacity-0 [animation-fill-mode:forwards]`} style={{ animationDelay: `${i * 150 + 300}ms` }}>
                     <div className="w-full md:w-48 aspect-video bg-gray-200 border-2 border-border shrink-0 relative flex items-center justify-center group cursor-pointer hover:scale-105 transition-transform duration-300">
                        <PlayCircle className="w-12 h-12 text-black opacity-50 group-hover:opacity-100 transition-opacity" />
                     </div>
                     <div className="flex-1 flex flex-col justify-between">
                        <div>
                            <h3 className="text-xl font-bold uppercase mb-2">Neo Brutalism Design Masterclass</h3>
                            <div className="w-full bg-gray-100 h-4 border-2 border-border mb-2">
                                <div className="bg-primary h-full w-[65%] border-r-2 border-border relative">
                                    <span className="absolute -right-2 -top-1 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-black"></span>
                                </div>
                            </div>
                            <div className="flex justify-between text-xs font-bold text-gray-500">
                                <span>65% Complete</span>
                                <span>Module 3: Typography</span>
                            </div>
                        </div>
                        <div className="mt-4">
                             <Button className="w-full md:w-auto font-bold border-2 border-border bg-black text-white hover:bg-gray-800 shadow-[4px_4px_0px_0px_#a8a6ff] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#a8a6ff] transition-all">
                                RESUME LESSON
                             </Button>
                        </div>
                     </div>
                  </div>
                ))}
            </div>
         </div>

         {/* Achievements / Leaderboard sidebar mock */}
         <div className="space-y-6">
            <Card className="border-4 border-border bg-white shadow-[8px_8px_0px_0px_#a8a6ff] rounded-none animate-zoom-in delay400 opacity-0 [animation-fill-mode:forwards]">
               <CardHeader className="border-b-2 border-border bg-yellow-300">
                  <CardTitle className="font-bold uppercase flex items-center gap-2">
                    <Trophy className="w-5 h-5" /> Recent Achievements
                  </CardTitle>
               </CardHeader>
               <CardContent className="p-4 space-y-4">
                  {[
                      { title: "Fast Learner", desc: "Completed 5 lessons in 1 day", icon: "🚀" },
                      { title: "Quiz Master", desc: "Scored 100% on a quiz", icon: "🎯" },
                  ].map((ach, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 border-2 border-border dashed">
                          <div className="text-2xl">{ach.icon}</div>
                          <div>
                              <div className="font-bold text-sm">{ach.title}</div>
                              <div className="text-xs font-bold text-gray-500">{ach.desc}</div>
                          </div>
                      </div>
                  ))}
                  <Button variant="ghost" className="w-full border-2 border-border font-bold hover:bg-black hover:text-white">VIEW ALL</Button>
               </CardContent>
            </Card>
         </div>
      </div>
    </div>
  );
}
