"use client";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { 
    ChevronLeft, 
    PlayCircle, 
    FileText, 
    HelpCircle, 
    CheckCircle, 
    Menu,
    ChevronDown,
    ChevronRight,
    Lock,
    X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export default function CoursePlayerPage() {
    const params = useParams();
    const router = useRouter();
    const courseId = params.courseId as string;
    
    // Fetch course from Redux
    const { courses } = useSelector((state: RootState) => state.courses);
    const course = courses.find(c => c.id === courseId);

    // State
    const [activeLessonId, setActiveLessonId] = useState<string | null>(null);
    const [expandedModules, setExpandedModules] = useState<string[]>([]);
    const [completedLessons, setCompletedLessons] = useState<string[]>([]);
    const [sidebarOpen, setSidebarOpen] = useState(true); // Control internal sidebar

    // Initialize state
    useEffect(() => {
        if (course && course.modules.length > 0 && !activeLessonId) {
            const firstModule = course.modules[0];
            setExpandedModules([firstModule.id]);
            if (firstModule.lessons.length > 0) {
                setActiveLessonId(firstModule.lessons[0].id);
            }
        }
    }, [course, activeLessonId]);

    // Derived state for navigation
    const allLessons = course ? course.modules.flatMap(m => m.lessons) : [];
    const activeLessonIndex = allLessons.findIndex(l => l.id === activeLessonId);
    const isFirstLesson = activeLessonIndex === 0;
    const isLastLesson = activeLessonIndex === allLessons.length - 1;

    const handlePreviousLesson = () => {
        if (activeLessonIndex > 0) {
            const prevLesson = allLessons[activeLessonIndex - 1];
            setActiveLessonId(prevLesson.id);
            // Ensure previous module is exposed if needed
            const prevModule = course?.modules.find(m => m.lessons.some(l => l.id === prevLesson.id));
            if (prevModule && !expandedModules.includes(prevModule.id)) {
                setExpandedModules(prev => [...prev, prevModule.id]);
            }
        }
    };

    const handleLessonComplete = () => {
        if (!activeLessonId || !course) return;
        
        // 1. Mark complete
        if (!completedLessons.includes(activeLessonId)) {
            setCompletedLessons([...completedLessons, activeLessonId]);
        }

        // 2. Find next lesson
        if (activeLessonIndex < allLessons.length - 1) {
            const nextLesson = allLessons[activeLessonIndex + 1];
            setActiveLessonId(nextLesson.id);
            // Ensure next module is exposed
            const nextModule = course.modules.find(m => m.lessons.some(l => l.id === nextLesson.id));
            if (nextModule && !expandedModules.includes(nextModule.id)) {
                setExpandedModules(prev => [...prev, nextModule.id]);
            }
        }
    };

    if (!course) {
        return <div className="p-10 text-center font-bold text-xl">Course not found.</div>;
    }

    // Helpers
    const activeModule = course.modules.find(m => m.lessons.some(l => l.id === activeLessonId));
    const activeLesson = activeModule?.lessons.find(l => l.id === activeLessonId);

    const toggleModule = (modId: string) => {
        setExpandedModules(prev => 
            prev.includes(modId) ? prev.filter(id => id !== modId) : [...prev, modId]
        );
    };

    const SidebarContent = () => (
        <div className="h-full flex flex-col bg-white border-r-4 border-black">
            <div className="p-4 border-b-4 border-black bg-sidebar-primary flex justify-between items-start">
                <div className="flex items-center justify-between w-full h-7">
                    <h2 className="font-black text-xl leading-tight line-clamp-2">{course.title}</h2>
                    <Link href="/student/courses" className="flex items-center text-sm font-bold hover:underline">
                        <ChevronLeft className="w-4 h-4 mr-1" /> Back
                    </Link>
                </div>
            </div>

             <div className="p-4 border-b-4 border-black bg-white">
                <div className="text-xs font-bold text-gray-600 flex items-center justify-between gap-2 mb-1">
                     <span>Course Progress</span>
                     <span>{Math.round((completedLessons.length / allLessons.length) * 100)}%</span>
                </div>
                <div className="flex-1 bg-gray-100 h-3 border-2 border-black rounded-full overflow-hidden">
                    <div 
                        className="bg-green-500 h-full transition-all duration-500" 
                        style={{ width: `${Math.round((completedLessons.length / allLessons.length) * 100)}%` }}
                    ></div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar">
                {course.modules.map((module, idx) => (
                    <div key={module.id} className="border-b-2 border-gray-200 last:border-0">
                        <button 
                            onClick={() => toggleModule(module.id)}
                            className="w-full text-left p-4 bg-gray-50 flex items-center justify-between font-black uppercase hover:bg-gray-100 transition-colors group"
                        >
                            <span className="text-sm group-hover:underline">Module {idx + 1}: {module.title}</span>
                            {expandedModules.includes(module.id) ? (
                                <ChevronDown className="w-5 h-5 flex-shrink-0" />
                            ) : (
                                <ChevronRight className="w-5 h-5 flex-shrink-0" />
                            )}
                        </button>
                        
                        {expandedModules.includes(module.id) && (
                            <div className="divide-y divide-gray-100 border-t-2 border-gray-100">
                                {module.lessons.map((lesson) => (
                                    <button
                                        key={lesson.id}
                                        onClick={() => setActiveLessonId(lesson.id)}
                                        className={cn(
                                            "w-full text-left p-3 pl-6 flex items-start gap-3 transition-all hover:bg-sidebar-accent border-l-4",
                                            activeLessonId === lesson.id 
                                                ? "bg-primary/10 border-primary" 
                                                : "bg-white border-transparent"
                                        )}
                                    >
                                        <div className="mt-0.5 text-gray-500">
                                            {completedLessons.includes(lesson.id) ? (
                                                <CheckCircle className="w-5 h-5 text-green-600 fill-green-100" />
                                            ) : (
                                                lesson.type === 'video' ? <PlayCircle className="w-5 h-5" /> :
                                                lesson.type === 'article' ? <FileText className="w-5 h-5" /> :
                                                <HelpCircle className="w-5 h-5" />
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <p className={cn(
                                                "text-sm font-bold leading-tight",
                                                activeLessonId === lesson.id ? "text-black" : "text-gray-600"
                                            )}>
                                                {lesson.title}
                                            </p>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className="h-screen flex flex-col md:flex-row overflow-hidden bg-background">
            {/* Desktop Sidebar (Collapsible) */}
            <div 
                className={cn(
                    "hidden md:block flex-shrink-0 h-full transition-all duration-300 ease-in-out overflow-hidden relative",
                    sidebarOpen ? "w-[350px]" : "w-0"
                )}
            >
                <SidebarContent />
            </div>

            {/* Sidebar Toggle Button (Desktop) */}
            <div className="hidden md:block absolute bottom-6 left-6 z-50">
                 {/* Controlled by content area usually, but let's float it if closed */}
                 {!sidebarOpen && (
                    <Button 
                        onClick={() => setSidebarOpen(true)}
                        className="h-10 w-10 rounded-full border-2 border-black bg-primary text-black shadow-[2px_2px_0px_0px_black] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none"
                    >
                        <Menu className="w-5 h-5" />
                    </Button>
                 )}
            </div>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col h-full bg-stone-50 overflow-hidden relative">
                 {/* Top Bar (Mobile + Desktop Controls) */}
                 <div className="h-16 border-b-4 border-black bg-white flex items-center justify-between px-4 md:px-6 flex-shrink-0 z-10">
                    <div className="flex items-center gap-4">
                        {/* Mobile Menu Trigger */}
                        <div className="md:hidden">
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button variant="outline" size="icon" className="border-2 border-black">
                                        <Menu className="w-5 h-5" />
                                    </Button>
                                </SheetTrigger>
                                <SheetContent side="left" className="p-0 w-[300px]">
                                    <SidebarContent />
                                </SheetContent>
                            </Sheet>
                        </div>

                         {/* Desktop Sidebar Toggle */}
                        <Button 
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            variant="ghost" 
                            size="icon" 
                            className="hidden md:flex hover:bg-gray-100"
                            title={sidebarOpen ? "Close Sidebar" : "Open Sidebar"}
                        >
                            {sidebarOpen ? <ChevronLeft className="w-6 h-6" /> : <ChevronRight className="w-6 h-6" />}
                        </Button>
                        
                        <h1 className="font-black text-lg md:text-xl uppercase truncate max-w-[200px] md:max-w-md">
                            {course.title}
                        </h1>
                    </div>

                    <div className="flex items-center gap-2">
                        {/* Next / Prev buttons could go here too */}
                        <span className="text-xs font-bold uppercase bg-black text-white px-3 py-1 hidden sm:inline-block">Learning Mode</span>
                    </div>
                 </div>

                 {/* Scrollable Content */}
                 <div className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-12">
                    {activeLesson ? (
                        <div className="max-w-5xl mx-auto space-y-6">
                            
                            {/* Breadcrumb-ish */}
                             <div className="flex items-center gap-2 text-sm font-bold text-gray-500 mb-2">
                                <span>{activeModule?.title}</span>
                                <ChevronRight className="w-4 h-4" />
                                <span className="text-black">{activeLesson.title}</span>
                            </div>

                            {/* Content Viewer */}
                            <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_black] overflow-hidden">
                                {activeLesson.type === 'video' && (
                                    <div className="aspect-video bg-black relative group">
                                        {activeLesson.videoUrl ? (
                                             <iframe 
                                                width="100%" 
                                                height="100%" 
                                                src={activeLesson.videoUrl.replace("watch?v=", "embed/")} 
                                                title="Video player" 
                                                frameBorder="0" 
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                                allowFullScreen
                                            ></iframe>
                                        ) : (
                                            <div className="flex flex-col items-center justify-center h-full text-white">
                                                <PlayCircle className="w-16 h-16 opacity-50 mb-4" />
                                                <p className="font-bold">No Video Source</p>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {activeLesson.type === 'article' && (
                                    <div className="p-8 md:p-12 prose prose-lg prose-headings:font-black prose-p:font-medium max-w-none">
                                        <h1 className="uppercase font-black border-b-4 border-black pb-4 mb-6">{activeLesson.title}</h1>
                                        {activeLesson.articleContent ? (
                                            <div className="whitespace-pre-wrap">{activeLesson.articleContent}</div>
                                        ) : (
                                            <p className="text-gray-400 italic">No content written.</p>
                                        )}
                                    </div>
                                )}
                                
                                {activeLesson.type === 'quiz' && (
                                    <div className="p-8 md:p-12">
                                        <h1 className="uppercase font-black text-3xl mb-8 flex items-center gap-3">
                                            <HelpCircle className="w-10 h-10 text-primary" /> 
                                            Quiz Time
                                        </h1>
                                        <div className="space-y-6">
                                            {activeLesson.questions?.map((q: any, i: number) => (
                                                <div key={i} className="bg-gray-50 border-2 border-black p-6">
                                                    <p className="font-bold text-lg mb-4">{i+1}. {q.question}</p>
                                                    <div className="space-y-2 pl-4">
                                                        {q.options.map((opt: string, oi: number) => (
                                                            <label key={oi} className="flex items-center gap-3 cursor-pointer">
                                                                <input type="radio" name={`q-${i}`} className="w-5 h-5 accent-black" />
                                                                <span className="font-medium">{opt}</span>
                                                            </label>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Info & Navigation */}
                            <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white border-4 border-black p-6 shadow-[4px_4px_0px_0px_#ccc]">
                                <div>
                                    <h2 className="text-2xl font-black uppercase leading-none">{activeLesson.title}</h2>
                                    <p className="text-sm font-bold text-gray-500 mt-1">{activeLesson.type} • Lesson {parseInt(activeLesson.id)}</p>
                                </div>
                                <div className="flex items-center gap-3 w-full md:w-auto">
                                    <Button 
                                        variant="outline" 
                                        onClick={handlePreviousLesson}
                                        disabled={isFirstLesson}
                                        className={cn(
                                            "flex-1 md:flex-none border-2 border-black font-bold hover:bg-gray-100",
                                            isFirstLesson && "opacity-0 pointer-events-none"
                                        )}
                                    >
                                        Previous
                                    </Button>
                                    <Button 
                                        onClick={handleLessonComplete}
                                        className={cn(
                                            "flex-1 md:flex-none px-8 font-black border-2 border-black shadow-[2px_2px_0px_0px_black] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all uppercase",
                                            completedLessons.includes(activeLesson.id) 
                                                ? "bg-green-400 hover:bg-green-500 text-black" 
                                                : "bg-primary hover:bg-primary/90 text-black"
                                        )}
                                    >
                                        {completedLessons.includes(activeLesson.id) ? "Completed" : "Next Lesson"}
                                        <ChevronRight className="w-4 h-4 ml-2" />
                                    </Button>
                                </div>
                            </div>

                        </div>
                    ) : (
                         <div className="flex flex-col items-center justify-center h-full text-center p-10">
                            <Lock className="w-20 h-20 text-gray-200 mb-6" />
                            <h2 className="text-3xl font-black uppercase text-gray-300">Start Learning</h2>
                            <p className="font-bold text-gray-400">Select a lesson from the menu to begin.</p>
                        </div>
                    )}
                 </div>
            </main>
        </div>
    );
}
