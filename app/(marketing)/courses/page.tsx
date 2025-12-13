"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, Filter, Star, ShoppingBag } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function CoursesPage() {
  const courses = [
    { id: 1, title: "Neo Brutalism Design Masterclass", category: "Design", price: "$49", rating: 4.8, students: 1205, color: "bg-primary" },
    { id: 2, title: "Advanced React Patterns", category: "Development", price: "$59", rating: 4.9, students: 850, color: "bg-secondary" },
    { id: 3, title: "Digital Marketing 101", category: "Business", price: "$29", rating: 4.5, students: 2100, color: "bg-accent" },
    { id: 4, title: "Figma to Code Workflow", category: "Design", price: "$39", rating: 4.7, students: 600, color: "bg-chart-1" },
    { id: 5, title: "Next.js 14 Full Course", category: "Development", price: "$69", rating: 4.9, students: 3000, color: "bg-chart-2" },
    { id: 6, title: "Copywriting for Beginners", category: "Marketing", price: "$24", rating: 4.6, students: 900, color: "bg-chart-3" },
    { id: 7, title: "UI Components System", category: "Design", price: "$45", rating: 4.8, students: 1500, color: "bg-chart-4" },
    { id: 8, title: "Fullstack SaaS Building", category: "Development", price: "$89", rating: 5.0, students: 400, color: "bg-chart-5" },
  ];

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div>
           <div className="inline-flex items-center gap-2 bg-black text-white px-3 py-1 font-bold text-sm uppercase mb-2 shadow-[4px_4px_0px_0px_var(--shadow-color)] animate-fade-in-down delay100 opacity-0 [animation-fill-mode:forwards]">
              <ShoppingBag className="w-4 h-4" /> Catalog
           </div>
           <h1 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight animate-fade-in-down opacity-0 [animation-fill-mode:forwards]">Explore Courses</h1>
           <p className="font-bold text-gray-600 text-lg mt-2 max-w-xl animate-fade-in-right delay200 opacity-0 [animation-fill-mode:forwards]">Find your next skill. Level up today with our premium selection of brutalist courses.</p>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white border-2 border-black p-6 shadow-[4px_4px_0px_0px_var(--shadow-color)] flex flex-col lg:flex-row gap-4 items-end mb-12 animate-fade-in-up delay300 opacity-0 [animation-fill-mode:forwards]">
         <div className="flex-1 space-y-2 w-full">
            <Label className="font-bold" htmlFor="search">SEARCH</Label>
            <div className="relative">
                <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400 font-bold" />
                <Input id="search" placeholder="What do you want to learn?" className="pl-10 border-2 border-black h-12 font-bold shadow-[4px_4px_0px_0px_#e5e7eb] focus-visible:ring-0 focus-visible:border-black focus-visible:shadow-none transition-all" />
            </div>
         </div>
         <div className="w-full lg:w-56 space-y-2">
            <Label className="font-bold">CATEGORY</Label>
            <Select>
              <SelectTrigger className="border-2 border-black h-12 font-bold shadow-[4px_4px_0px_0px_#e5e7eb] focus:ring-0 focus:shadow-none bg-white">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent className="border-2 border-black font-bold">
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="dev">Development</SelectItem>
                <SelectItem value="design">Design</SelectItem>
                <SelectItem value="business">Business</SelectItem>
              </SelectContent>
            </Select>
         </div>
         <Button className="h-12 w-full lg:w-auto px-8 text-lg font-bold border-2 border-black bg-primary text-black hover:bg-primary/80 shadow-[4px_4px_0px_0px_black] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_black] transition-all">
            <Filter className="mr-2 h-5 w-5" /> FILTER
         </Button>
      </div>

      {/* Course Grid - 4 Columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
        {courses.map((course, i) => (
          <Card key={course.id} className={`border-2 border-black bg-white rounded-none hover:-translate-y-3 hover:shadow-[12px_12px_0px_0px_var(--shadow-color)] transition-all duration-300 ease-out group cursor-pointer animate-fade-in-up opacity-0 [animation-fill-mode:forwards]`} style={{ animationDelay: `${i * 100 + 400}ms` }}>
             <div className={`aspect-[4/3] ${course.color} border-b-4 border-black relative flex items-center justify-center p-8 overflow-hidden`}>
                 <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors"></div>
                 <span className="font-black text-3xl uppercase text-center opacity-40 mix-blend-multiply group-hover:scale-110 transition-transform duration-500">{course.category}</span>
             </div>
             <CardContent className="p-5 flex flex-col h-[220px]">
                <div className="flex justify-between items-start mb-3">
                    <span className="bg-black text-white px-2 py-0.5 text-[10px] font-black uppercase tracking-wider">{course.category}</span>
                    <div className="flex items-center font-bold text-xs bg-yellow-100 px-2 py-0.5 border border-black">
                        <Star className="w-3 h-3 text-yellow-600 fill-current mr-1" />
                        {course.rating}
                    </div>
                </div>
                
                <h3 className="text-xl font-black leading-tight mb-auto line-clamp-2" title={course.title}>{course.title}</h3>
                
                <div className="space-y-4 pt-4 mt-2 border-t-2 border-dashed border-gray-300">
                    <div className="flex justify-between items-end">
                        <div>
                             <p className="text-xs font-bold text-gray-500 uppercase">Price</p>
                             <p className="text-2xl font-black text-primary">{course.price}</p>
                        </div>
                        <div className="text-right">
                             <p className="text-xs font-bold text-gray-500 uppercase">Students</p>
                             <p className="font-bold">{course.students}</p>
                        </div>
                    </div>
                    <Link href={`/courses/${course.id}`} className="block">
                        <Button className="w-full border-2 border-black bg-white text-black hover:bg-black hover:text-white font-black shadow-[2px_2px_0px_0px_black] hover:shadow-none hover:translate-x-[1px] hover:translate-y-[1px]">
                            VIEW COURSE
                        </Button>
                    </Link>
                </div>
             </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
