"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GripVertical, Plus, Video, FileText, HelpCircle, Trash2, Pencil } from "lucide-react";

export default function CurriculumPage() {
  const sections = [
    {
      title: "Module 1: Introduction to Brutalism",
      lessons: [
        { title: "What is Neo Brutalism?", type: "video", duration: "10:24" },
        { title: "History of Web Design", type: "text", duration: "5 mins" },
      ]
    },
    {
      title: "Module 2: Core Design Principles",
      lessons: [
        { title: "Typography Choices", type: "video", duration: "15:30" },
        { title: "Color Theory in Brutalism", type: "video", duration: "12:45" },
        { title: "Module 2 Quiz", type: "quiz", duration: "10 questions" },
      ]
    }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case "video": return <Video className="w-4 h-4" />;
      case "text": return <FileText className="w-4 h-4" />;
      case "quiz": return <HelpCircle className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold uppercase">Curriculum</h1>
          <p className="font-bold text-gray-600">Drag and drop to organize your lessons.</p>
        </div>
        <Button className="h-12 text-lg font-bold border-2 border-border bg-primary text-black hover:bg-primary/90 shadow-[4px_4px_0px_0px_#a8a6ff] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#a8a6ff] transition-all">
          <Plus className="mr-2 w-5 h-5" /> ADD MODULE
        </Button>
      </div>

      <div className="space-y-6">
        {sections.map((section, i) => (
          <div key={i} className="border-4 border-border bg-white shadow-[8px_8px_0px_0px_#a8a6ff]">
             <div className="bg-gray-100 p-4 border-b-4 border-border flex items-center justify-between">
                <div className="flex items-center gap-3">
                   <GripVertical className="w-5 h-5 text-gray-400 cursor-move" />
                   <h3 className="text-xl font-bold uppercase text-black">{section.title}</h3>
                </div>
                <div className="flex gap-2">
                   <Button size="icon" variant="ghost" className="h-8 w-8 hover:bg-white border-2 border-transparent hover:border-border rounded-none">
                      <Pencil className="w-4 h-4" />
                   </Button>
                   <Button size="icon" variant="ghost" className="h-8 w-8 hover:bg-destructive hover:text-white border-2 border-transparent hover:border-border rounded-none">
                      <Trash2 className="w-4 h-4" />
                   </Button>
                </div>
             </div>
             
             <div className="p-4 space-y-3">
                {section.lessons.map((lesson, j) => (
                  <div key={j} className="flex items-center justify-between p-3 border-2 border-border bg-white hover:bg-gray-50 shadow-[2px_2px_0px_0px_#a8a6ff] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all cursor-pointer">
                     <div className="flex items-center gap-3">
                        <GripVertical className="w-4 h-4 text-gray-400" />
                        <div className={`p-1 border border-border ${lesson.type === 'video' ? 'bg-blue-200' : lesson.type === 'quiz' ? 'bg-yellow-200' : 'bg-gray-200'}`}>
                           {getIcon(lesson.type)}
                        </div>
                        <span className="font-bold">{lesson.title}</span>
                     </div>
                     <span className="text-sm font-bold text-gray-500">{lesson.duration}</span>
                  </div>
                ))}
                
                <Button variant="outline" className="w-full border-2 border-dashed border-border hover:bg-secondary font-bold">
                   <Plus className="mr-2 w-4 h-4" /> ADD LESSON
                </Button>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}
