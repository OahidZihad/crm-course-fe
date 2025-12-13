import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MoreVertical, Pencil, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function TeacherCoursesPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold uppercase mb-1">My Courses</h1>
          <p className="font-bold text-gray-600">Manage your content and curriculum.</p>
        </div>
         <Link href="/teacher/courses/create">
            <Button className="h-12 text-lg font-bold border-2 border-border bg-primary text-black hover:bg-primary/90 shadow-[4px_4px_0px_0px_#a8a6ff] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#a8a6ff] transition-all">
            + NEW COURSE
            </Button>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="group relative border-4 border-border bg-white shadow-[8px_8px_0px_0px_#a8a6ff] hover:translate-y-[-2px] transition-transform">
             {/* Status Badge */}
             <div className="absolute top-4 left-4 z-10">
                 <span className={`px-2 py-1 border-2 border-border font-bold text-xs uppercase ${i === 1 ? 'bg-yellow-400' : 'bg-green-400'}`}>
                    {i === 1 ? 'Draft' : 'Published'}
                 </span>
             </div>

             <div className="aspect-video bg-gray-100 border-b-4 border-border relative">
                {/* Mock Image */}
                <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-bold uppercase tracking-widest">
                    Course Thumbnail
                </div>
             </div>

             <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold leading-tight">Advanced React Patterns & Performance</h3>
                     <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0 border-2 border-transparent hover:border-border rounded-none">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="border-2 border-border shadow-[4px_4px_0px_0px_#a8a6ff] rounded-none">
                        <DropdownMenuItem className="font-bold cursor-pointer focus:bg-primary focus:text-black">
                            <Pencil className="mr-2 h-4 w-4" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="font-bold cursor-pointer focus:bg-destructive focus:text-white text-destructive">
                             <Trash className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                
                <div className="flex justify-between items-center text-sm font-bold text-gray-500 mb-6">
                    <span>12 Lessons</span>
                    <span>24 Students</span>
                </div>

                <div className="flex gap-2">
                     <Button size="sm" variant="outline" className="flex-1 font-bold border-2 border-border shadow-[2px_2px_0px_0px_#a8a6ff] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]">
                        ANALYTICS
                     </Button>
                     <Button size="sm" className="flex-1 font-bold border-2 border-border bg-black text-white hover:bg-gray-800 shadow-[2px_2px_0px_0px_#a8a6ff] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]">
                        EDIT
                     </Button>
                </div>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}
