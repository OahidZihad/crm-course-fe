"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import Link from "next/link";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function StudentCoursesPage() {
  const { courses } = useSelector((state: RootState) => state.courses);
  const publishedCourses = courses.filter(c => c.status === 'published');

  return (
    <div className="space-y-8 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b-4 border-black pb-8">
        <div>
           <h1 className="text-4xl font-black uppercase tracking-tight mb-2">My Learning</h1>
           <p className="font-bold text-gray-500">Continue where you left off or find new skills.</p>
        </div>
        <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 font-bold" />
            <Input 
                placeholder="Search your library..." 
                className="h-14 pl-12 text-lg border-4 border-black font-bold shadow-[4px_4px_0px_0px_#a8a6ff] focus-visible:ring-0" 
            />
        </div>
      </div>

      {/* Course Grid */}
      {publishedCourses.length === 0 ? (
          <div className="text-center py-20 border-4 border-dashed border-gray-300">
              <h2 className="text-2xl font-black text-gray-400 uppercase mb-4">No Courses Yet</h2>
              <p className="font-bold text-gray-400 mb-8">You haven't enrolled in any courses yet.</p>
              <Link href="/courses">
                <Button className="h-14 px-8 text-xl font-black border-4 border-black bg-primary text-black hover:bg-primary/90 shadow-[4px_4px_0px_0px_black] hover:translate-x-[2px] hover:translate-y-[2px] shadow-none transition-all uppercase">
                    Browse Catalog
                </Button>
              </Link>
          </div>
      ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {publishedCourses.map((course) => (
                  <Link href={`/student/courses/${course.id}`} key={course.id} className="group h-full">
                      <div className="border-4 border-black bg-white h-full flex flex-col transition-all hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_black]">
                          {/* Thumbnail */}
                          <div className={`h-48 border-b-4 border-black relative ${
                              course.template === 'neo-brutalist' ? 'bg-[#a8a6ff]' :
                              course.template === 'minimal' ? 'bg-gray-100' : 'bg-blue-100'
                          } flex items-center justify-center overflow-hidden`}>
                              <div className="absolute inset-0 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:10px_10px] opacity-20"></div>
                              <h3 className="text-3xl font-black uppercase text-center px-4 leading-tight relative z-10 opacity-80">
                                  {course.title.substring(0, 20)}...
                              </h3>
                          </div>
                          
                          <div className="p-6 flex-1 flex flex-col">
                              <div className="flex justify-between items-start mb-4">
                                  <span className="inline-block bg-black text-white px-2 py-1 text-xs font-black uppercase">
                                      {course.category}
                                  </span>
                                  <span className="text-xs font-black uppercase text-gray-500 border-2 border-gray-200 px-2 py-0.5">
                                      {course.modules.length} Modules
                                  </span>
                              </div>
                              
                              <h3 className="text-xl font-black uppercase mb-2 line-clamp-2 flex-1">
                                  {course.title}
                              </h3>
                              
                              <div className="mt-8 pt-4 border-t-2 border-black flex items-center justify-between">
                                  <span className="text-xs font-black text-gray-500 uppercase">Start Learning</span>
                                  <span className="w-8 h-8 flex items-center justify-center bg-primary border-2 border-black font-black text-sm group-hover:scale-110 transition-transform">
                                      →
                                  </span>
                              </div>
                          </div>
                      </div>
                  </Link>
              ))}
          </div>
      )}
    </div>
  );
}
