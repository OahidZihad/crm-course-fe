"use client";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Check, Star, PlayCircle, Lock } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CourseLandingPage() {
  const pathname = usePathname();
  const courseId = pathname.split("/").pop(); // Mock ID fetch

  return (
    <div className="pb-20">
      {/* Hero */}
      <div className="bg-secondary border-b-4 border-border py-20 px-4">
         <div className="container mx-auto max-w-5xl grid md:grid-cols-2 gap-10 items-center">
            <div>
                 <span className="bg-black text-white px-2 py-1 font-bold uppercase text-sm mb-4 inline-block">Design</span>
                 <h1 className="text-4xl md:text-5xl font-bold uppercase mb-6 leading-tight">Mastering Neo Brutalism UI Design</h1>
                 <p className="text-xl font-bold mb-8">Learn to build bold, high-contrast user interfaces that stand out. From theory to implementation.</p>
                 
                 <div className="flex items-center gap-4 mb-8">
                    <div className="flex -space-x-4">
                        {[1, 2, 3].map((i) => (
                            <Avatar key={i} className="border-2 border-border w-12 h-12">
                                <AvatarImage src={`https://i.pravatar.cc/150?u=${i}`} />
                                <AvatarFallback>ST</AvatarFallback>
                            </Avatar>
                        ))}
                    </div>
                    <div className="font-bold">
                        <div className="flex text-yellow-500"><Star className="fill-current w-4 h-4"/><Star className="fill-current w-4 h-4"/><Star className="fill-current w-4 h-4"/><Star className="fill-current w-4 h-4"/><Star className="fill-current w-4 h-4"/></div>
                        <span className="text-sm">4.9/5 (120 ratings)</span>
                    </div>
                 </div>

                 <div className="flex gap-4">
                    <Link href={`/student/checkout?course=${courseId}`}>
                        <Button className="h-14 px-8 text-xl font-bold border-2 border-border bg-black text-white hover:bg-gray-800 shadow-[4px_4px_0px_0px_#a8a6ff] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#a8a6ff] transition-all">
                            ENROLL NOW - $49
                        </Button>
                    </Link>
                 </div>
            </div>
            <div className="relative">
                 <div className="aspect-video bg-white border-4 border-border shadow-[8px_8px_0px_0px_#a8a6ff] flex items-center justify-center group cursor-pointer">
                     <PlayCircle className="w-20 h-20 text-black opacity-80 group-hover:scale-110 transition-transform" />
                 </div>
            </div>
         </div>
      </div>

      <div className="container mx-auto max-w-5xl px-4 py-16 grid md:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-12">
               <section>
                  <h2 className="text-3xl font-bold uppercase mb-6 border-b-4 border-border inline-block">What you'll learn</h2>
                  <ul className="grid md:grid-cols-2 gap-4">
                      {[
                          "Core principles of Brutalism", 
                          "Typography and Accessibility",
                          "CSS Grid & Flexbox Layouts",
                          "Framer Motion Animations",
                          "Design System Architecture",
                          "Responsive Design Patterns"
                      ].map((item, i) => (
                          <li key={i} className="flex items-start gap-3 font-bold border-2 border-border p-3 bg-white shadow-[2px_2px_0px_0px_#a8a6ff]">
                              <Check className="w-5 h-5 text-green-600 shrink-0" />
                              {item}
                          </li>
                      ))}
                  </ul>
               </section>

               <section>
                   <h2 className="text-3xl font-bold uppercase mb-6 border-b-4 border-border inline-block">Curriculum</h2>
                   <div className="space-y-4">
                       {[
                           { title: "Module 1: Introduction", lessons: 3, time: "45m" },
                           { title: "Module 2: Foundations", lessons: 5, time: "1h 20m" },
                           { title: "Module 3: Building Components", lessons: 8, time: "2h 15m" },
                           { title: "Module 4: Final Project", lessons: 2, time: "3h 00m" },
                       ].map((mod, i) => (
                           <div key={i} className="border-4 border-border bg-white p-4">
                               <div className="flex justify-between items-center mb-2">
                                   <h3 className="text-xl font-bold">{mod.title}</h3>
                                   <span className="font-bold text-gray-500">{mod.lessons} lessons • {mod.time}</span>
                               </div>
                               <div className="space-y-2 pl-4 border-l-2 border-gray-200">
                                   <div className="flex items-center gap-2 text-sm font-bold">
                                       <PlayCircle className="w-4 h-4" /> Lesson 1: Overview
                                       <span className="ml-auto bg-gray-100 text-xs px-1 border border-border">PREVIEW</span>
                                   </div>
                                   <div className="flex items-center gap-2 text-sm font-bold text-gray-400">
                                       <Lock className="w-4 h-4" /> Lesson 2: History
                                   </div>
                               </div>
                           </div>
                       ))}
                   </div>
               </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
              <div className="border-4 border-border bg-white p-6 sticky top-24 shadow-[8px_8px_0px_0px_#a8a6ff]">
                   <div className="text-4xl font-bold mb-4">$49.00</div>
                   <Link href={`/student/checkout?course=${courseId}`}>
                       <Button className="w-full h-12 text-lg font-bold border-2 border-border bg-primary text-black hover:bg-primary/90 shadow-[4px_4px_0px_0px_#a8a6ff] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_#a8a6ff] transition-all mb-4">
                           BUY NOW
                       </Button>
                   </Link>
                   <ul className="text-sm font-bold space-y-2 text-gray-600">
                       <li>30-Day Money-Back Guarantee</li>
                       <li>Full Lifetime Access</li>
                       <li>Certificate of Completion</li>
                   </ul>
              </div>
          </div>
      </div>
    </div>
  );
}
