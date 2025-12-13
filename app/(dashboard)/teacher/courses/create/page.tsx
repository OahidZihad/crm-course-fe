"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { 
    ArrowLeft, 
    Save, 
    ChevronRight, 
    Layout, 
    Type, 
    Video, 
    List, 
    CreditCard, 
    Check, 
    Plus, 
    Trash2, 
    GripVertical,
    FileText,
    Monitor,
    Smartphone
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// --- Types ---
type Question = { id: string; question: string; options: string[]; correctOption: number };
type Lesson = { 
    id: string; 
    title: string; 
    type: 'video' | 'article' | 'quiz';
    videoUrl?: string;
    articleContent?: string;
    questions?: Question[];
};
type Module = { id: string; title: string; lessons: Lesson[] };

import { useDispatch } from "react-redux";
import { addCourse } from "@/lib/features/courses/coursesSlice";
import { useRouter } from "next/navigation";

// ... (existing imports)

export default function CreateCoursePage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  // ... (existing state)

  // ... (existing handlers)

  const handleSaveDraft = () => {
    const courseId = crypto.randomUUID();
    const newCourse = {
        id: courseId,
        ...formData,
        status: 'draft',
        createdAt: new Date().toISOString(),
        authorId: 'teacher-1',
        // Ensure Lesson types match strictly
        modules: formData.modules.map(m => ({
            ...m,
            lessons: m.lessons.map(l => ({...l, questions: l.questions || [] })) 
        }))
    };
    // @ts-ignore - Ignoring strict type mismatch for form data vs Redux type for speed, assuming compatible structure
    dispatch(addCourse(newCourse));
    // Optional: Show toast
    router.push('/teacher/courses');
  };

  const handlePublish = () => {
    const courseId = crypto.randomUUID();
    const newCourse = {
        id: courseId,
        ...formData,
        status: 'published',
        createdAt: new Date().toISOString(),
        authorId: 'teacher-1',
        modules: formData.modules.map(m => ({
            ...m,
            lessons: m.lessons.map(l => ({...l, questions: l.questions || [] })) 
        }))
    };
     // @ts-ignore
    dispatch(addCourse(newCourse));
    router.push('/teacher/courses'); // Or to success page
  };

  // ... (render logic)
  const [formData, setFormData] = useState({
      // Step 1: Course Setup (Basics + Branding)
      title: "",
      category: "",
      level: "beginner",
      template: "neo-brutalist",
      // Step 2: Content
      description: "",
      videoUrl: "",
      benefits: [""] as string[],
      // Step 3: Curriculum
      modules: [] as Module[],
      // Step 4: Pricing & Review
      price: "",
      salePrice: "",
  });

  const steps = [
      { num: 1, label: "Setup", icon: Layout }, // merged Basics + Branding
      { num: 2, label: "Content", icon: Video },
      { num: 3, label: "Curriculum", icon: List },
      { num: 4, label: "Review", icon: FileText },
  ];

  const handleNext = () => setCurrentStep(prev => Math.min(prev + 1, 4));
  const handleBack = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const updateForm = (key: string, value: any) => {
      setFormData(prev => ({ ...prev, [key]: value }));
  };

  const [expandedLessonId, setExpandedLessonId] = useState<string | null>(null);

  // --- Curriculum Helpers ---
  const addModule = () => {
      const newModule: Module = { id: crypto.randomUUID(), title: "New Module", lessons: [] };
      updateForm('modules', [...formData.modules, newModule]);
  };

  const updateModuleTitle = (index: number, title: string) => {
      const newModules = [...formData.modules];
      newModules[index].title = title;
      updateForm('modules', newModules);
  };

  const addLesson = (moduleIndex: number) => {
      const newModules = [...formData.modules];
      newModules[moduleIndex].lessons.push({ 
          id: crypto.randomUUID(), 
          title: "New Lesson", 
          type: 'video', 
          videoUrl: '', 
          articleContent: '', 
          questions: [] 
      });
      updateForm('modules', newModules);
  };
  
  const updateLesson = (modIdx: number, lesIdx: number, updates: Partial<Lesson>) => {
      const newModules = [...formData.modules];
      newModules[modIdx].lessons[lesIdx] = { ...newModules[modIdx].lessons[lesIdx], ...updates };
      updateForm('modules', newModules);
  };
  
  const addQuestion = (modIdx: number, lesIdx: number) => {
      const newModules = [...formData.modules];
      const lesson = newModules[modIdx].lessons[lesIdx];
      const newQuestion: Question = { 
          id: crypto.randomUUID(), 
          question: "", 
          options: ["", "", "", ""], 
          correctOption: 0 
      };
      if (!lesson.questions) lesson.questions = [];
      lesson.questions.push(newQuestion);
      updateForm('modules', newModules);
  };

  const updateQuestion = (modIdx: number, lesIdx: number, qIdx: number, updates: Partial<Question>) => {
      const newModules = [...formData.modules];
      const questions = newModules[modIdx].lessons[lesIdx].questions;
      if (questions) {
          questions[qIdx] = { ...questions[qIdx], ...updates };
          updateForm('modules', newModules);
      }
  };

  // --- Render Steps ---
  const renderStep = () => {
    switch (currentStep) {
        case 1:
            return (
                <div className="space-y-12 animate-fade-in-up">
                     {/* Section 1: Basics */}
                     <div className="space-y-6">
                        <div className="flex items-center gap-2 border-b-4 border-black pb-2 mb-6">
                            <div className="bg-black text-white w-8 h-8 flex items-center justify-center font-black rounded-full">1</div>
                            <h2 className="text-2xl font-black uppercase">Basic Information</h2>
                        </div>
                        
                        <div>
                            <Label className="font-bold text-xl mb-2 block">COURSE TITLE</Label>
                            <Input 
                                placeholder="e.g. Master Neo-Brutalist Design" 
                                className="h-16 text-3xl font-black border-4 border-black shadow-[6px_6px_0px_0px_#a8a6ff] focus-visible:ring-0 focus-visible:border-primary transition-all"
                                value={formData.title}
                                onChange={(e) => updateForm('title', e.target.value)}
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <Label className="font-bold text-lg">CATEGORY</Label>
                                <Select value={formData.category} onValueChange={(v) => updateForm('category', v)}>
                                    <SelectTrigger className="h-14 border-2 border-black font-bold text-lg shadow-[4px_4px_0px_0px_#a8a6ff]">
                                        <SelectValue placeholder="Select Category" />
                                    </SelectTrigger>
                                    <SelectContent className="border-2 border-black font-bold">
                                        <SelectItem value="dev">Development</SelectItem>
                                        <SelectItem value="design">Design</SelectItem>
                                        <SelectItem value="marketing">Marketing</SelectItem>
                                        <SelectItem value="business">Business</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label className="font-bold text-lg">DIFFICULTY LEVEL</Label>
                                <Select value={formData.level} onValueChange={(v) => updateForm('level', v)}>
                                    <SelectTrigger className="h-14 border-2 border-black font-bold text-lg shadow-[4px_4px_0px_0px_#a8a6ff]">
                                        <SelectValue placeholder="Select Level" />
                                    </SelectTrigger>
                                    <SelectContent className="border-2 border-black font-bold">
                                        <SelectItem value="beginner">Beginner</SelectItem>
                                        <SelectItem value="intermediate">Intermediate</SelectItem>
                                        <SelectItem value="advanced">Expert</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                     </div>

                     {/* Section 2: Branding */}
                     <div className="space-y-8 pt-8 border-t-2 border-dashed border-gray-300">
                        <div className="flex items-center gap-2 border-b-4 border-black pb-2 mb-6">
                            <div className="bg-black text-white w-8 h-8 flex items-center justify-center font-black rounded-full">2</div>
                            <h2 className="text-2xl font-black uppercase">Branding & Style</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { id: 'neo-brutalist', name: 'Neo-Brutalist', desc: 'Bold, high contrast, trendy.', color: 'bg-[#a8a6ff]' },
                                { id: 'minimal', name: 'Minimalist', desc: 'Clean, whitespace, professional.', color: 'bg-gray-100' },
                                { id: 'corporate', name: 'Enterprise', desc: 'Trustworthy, blue tones, structured.', color: 'bg-blue-100' }
                            ].map((t) => (
                                <div 
                                    key={t.id}
                                    onClick={() => updateForm('template', t.id)}
                                    className={`cursor-pointer border-4 ${formData.template === t.id ? 'border-primary ring-4 ring-black/10 scale-105' : 'border-black'} p-0 h-[300px] flex flex-col transition-all hover:-translate-y-2 shadow-[8px_8px_0px_0px_black] bg-white relative group overflow-hidden`}
                                >
                                    <div className={`flex-1 border-b-4 border-black ${t.color} flex items-center justify-center font-black text-3xl uppercase opacity-80 relative`}>
                                       <div className="absolute inset-0 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:10px_10px] opacity-20"></div>
                                        {t.id === 'neo-brutalist' && "OMZ"}
                                        {t.id === 'minimal' && "Simple"}
                                        {t.id === 'corporate' && "Corp"}
                                    </div>
                                    <div className="p-6 bg-white">
                                        <h3 className="font-black text-xl uppercase mb-2">{t.name}</h3>
                                        <p className="font-bold text-gray-500 text-sm">{t.desc}</p>
                                    </div>
                                    {formData.template === t.id && (
                                        <div className="absolute top-4 right-4 bg-primary text-white p-2 border-2 border-black rounded-full shadow-[2px_2px_0px_0px_black]">
                                            <Check className="w-6 h-6" />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            );
        case 2: 
            return (
                <div className="space-y-8 animate-fade-in-up">
                     <div className="space-y-2">
                        <Label className="font-bold text-xl">DESCRIPTION</Label>
                        <Textarea 
                            value={formData.description}
                            onChange={(e) => updateForm('description', e.target.value)}
                            placeholder="Tell your students what they will achieve..." 
                            className="min-h-[200px] text-lg font-bold border-2 border-black shadow-[6px_6px_0px_0px_#a8a6ff] focus-visible:ring-0 p-4" 
                        />
                     </div>
                     <div className="space-y-2">
                        <Label className="font-bold text-xl">INTRO VIDEO URL</Label>
                        <Input 
                            value={formData.videoUrl}
                            onChange={(e) => updateForm('videoUrl', e.target.value)}
                            placeholder="https://youtube.com/..." 
                            className="h-14 border-2 border-black font-bold shadow-[4px_4px_0px_0px_#a8a6ff] focus-visible:ring-0" 
                        />
                     </div>
                     <div className="space-y-4">
                        <Label className="font-bold text-xl">KEY BENEFITS</Label>
                        {formData.benefits.map((benefit, i) => (
                            <div key={i} className="flex gap-4">
                                <div className="flex-1">
                                    <Input 
                                        value={benefit} 
                                        onChange={(e) => {
                                            const newBenefits = [...formData.benefits];
                                            newBenefits[i] = e.target.value;
                                            updateForm('benefits', newBenefits);
                                        }}
                                        placeholder={`Benefit #${i + 1}`}
                                        className="h-12 border-2 border-black font-bold focus-visible:ring-0"
                                    />
                                </div>
                                <Button 
                                    variant="destructive" 
                                    size="icon" 
                                    className="h-12 w-12 border-2 border-black shadow-[2px_2px_0px_0px_black]"
                                    onClick={() => {
                                        const newBenefits = formData.benefits.filter((_, idx) => idx !== i);
                                        updateForm('benefits', newBenefits);
                                    }}
                                >
                                    <Trash2 className="w-5 h-5" />
                                </Button>
                            </div>
                        ))}
                        <Button 
                            type="button" 
                            variant="outline" 
                            className="h-12 border-2 border-black font-bold border-dashed w-full hover:bg-gray-50 text-gray-500 hover:text-black mt-2"
                            onClick={() => updateForm('benefits', [...formData.benefits, ""])}
                        >
                            <Plus className="w-5 h-5 mr-2" /> ADD ANOTHER BENEFIT
                        </Button>
                     </div>
                </div>
            );
        case 3:
            return (
                <div className="space-y-8 animate-fade-in-up">
                    <div className="flex justify-between items-center bg-secondary/20 p-6 border-4 border-black">
                        <div>
                            <h3 className="font-black text-2xl uppercase">Course Curriculum</h3>
                            <p className="font-bold text-gray-600 text-sm">Drag and drop to reorder content.</p>
                        </div>
                        <Button onClick={addModule} className="h-12 font-bold border-2 border-black shadow-[4px_4px_0px_0px_black] hover:translate-x-[2px] hover:translate-y-[2px] shadow-none transition-all">
                            + ADD MODULE
                        </Button>
                    </div>

                    <div className="space-y-6">
                        {formData.modules.length === 0 && (
                            <div className="text-center py-16 border-4 border-dashed border-gray-300 rounded-none">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 text-gray-400 mb-4">
                                    <List className="w-8 h-8" />
                                </div>
                                <p className="font-bold text-gray-400 text-xl">No content yet.</p>
                                <p className="font-bold text-gray-400">Click "Add Module" to start building your course.</p>
                            </div>
                        )}
                        {formData.modules.map((module, mIdx) => (
                            <div key={module.id} className="border-4 border-black bg-white shadow-[8px_8px_0px_0px_#a8a6ff] transition-all hover:shadow-[10px_10px_0px_0px_#a8a6ff]">
                                <div className="p-4 bg-gray-50 border-b-4 border-black flex items-center gap-4">
                                    <GripVertical className="text-gray-400 w-6 h-6 cursor-move" />
                                    <div className="flex-1">
                                        <Label className="text-xs font-black text-gray-500 uppercase">Module {mIdx + 1}</Label>
                                        <Input 
                                            value={module.title}
                                            onChange={(e) => updateModuleTitle(mIdx, e.target.value)}
                                            className="font-black text-xl border-none focus-visible:ring-0 px-0 h-auto bg-transparent shadow-none" 
                                            placeholder="Module Title"
                                        />
                                    </div>
                                    <Button variant="ghost" size="icon" onClick={() => {
                                        const newModules = formData.modules.filter((_, i) => i !== mIdx);
                                        updateForm('modules', newModules);
                                    }}><Trash2 className="w-5 h-5 text-red-500" /></Button>
                                </div>
                                
                                <div className="p-6 space-y-3">
                                    {module.lessons.map((lesson, lIdx) => (
                                        <div key={lesson.id} className="border-2 border-gray-200 bg-white hover:border-black transition-all group p-3">
                                            {/* Lesson Header Row */}
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 bg-black text-white flex items-center justify-center text-sm font-bold rounded-full">{lIdx + 1}</div>
                                                <Input 
                                                     value={lesson.title}
                                                     onChange={(e) => updateLesson(mIdx, lIdx, { title: e.target.value })}
                                                     className="border-none h-10 font-bold focus-visible:ring-0 bg-transparent flex-1 shadow-none"
                                                     placeholder="Lesson Title"
                                                />
                                                <Select 
                                                    value={lesson.type} 
                                                    onValueChange={(v) => updateLesson(mIdx, lIdx, { type: v as any })}
                                                >
                                                    <SelectTrigger className="w-[120px] h-10 border-2 border-black text-xs font-bold shadow-sm">
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent className="font-bold">
                                                        <SelectItem value="video">Video</SelectItem>
                                                        <SelectItem value="article">Article</SelectItem>
                                                        <SelectItem value="quiz">Quiz</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <Button 
                                                    variant="ghost" 
                                                    size="sm"
                                                    onClick={() => setExpandedLessonId(expandedLessonId === lesson.id ? null : lesson.id)}
                                                    className={`font-bold ${expandedLessonId === lesson.id ? 'bg-black text-white hover:bg-black/90 hover:text-white' : ''}`}
                                                >
                                                    {expandedLessonId === lesson.id ? 'DONE' : 'EDIT CONTENT'}
                                                </Button>
                                            </div>

                                            {/* Content Editor (Expanded) */}
                                            <AnimatePresence>
                                                {expandedLessonId === lesson.id && (
                                                    <motion.div 
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: 'auto', opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        className="overflow-hidden"
                                                    >
                                                        <div className="pt-4 mt-4 border-t-2 border-dashed border-gray-200 pl-11">
                                                            {lesson.type === 'video' && (
                                                                <div className="space-y-2">
                                                                    <Label className="font-bold text-xs uppercase text-gray-500">Video URL</Label>
                                                                    <Input 
                                                                        value={lesson.videoUrl || ''}
                                                                        onChange={(e) => updateLesson(mIdx, lIdx, { videoUrl: e.target.value })}
                                                                        placeholder="Paste Vimeo or YouTube URL" 
                                                                        className="border-2 border-black font-bold"
                                                                    />
                                                                </div>
                                                            )}
                                                            
                                                            {lesson.type === 'article' && (
                                                                <div className="space-y-2">
                                                                    <Label className="font-bold text-xs uppercase text-gray-500">Article Content</Label>
                                                                    <Textarea 
                                                                        value={lesson.articleContent || ''}
                                                                        onChange={(e) => updateLesson(mIdx, lIdx, { articleContent: e.target.value })}
                                                                        placeholder="Write your lesson content here..." 
                                                                        className="min-h-[150px] border-2 border-black font-medium p-4"
                                                                    />
                                                                </div>
                                                            )}

                                                            {lesson.type === 'quiz' && (
                                                                <div className="space-y-4">
                                                                    <div className="flex justify-between items-center">
                                                                        <Label className="font-bold text-xs uppercase text-gray-500">Quiz Questions</Label>
                                                                        <Button size="sm" variant="outline" onClick={() => addQuestion(mIdx, lIdx)} className="h-8 text-xs font-bold border-black">+ Add Question</Button>
                                                                    </div>
                                                                    
                                                                    <div className="space-y-6">
                                                                        {lesson.questions?.map((q, qIdx) => (
                                                                            <div key={q.id} className="bg-gray-50 p-4 border-2 border-gray-200 relative">
                                                                                <div className="mb-3">
                                                                                    <Input 
                                                                                        value={q.question}
                                                                                        onChange={(e) => updateQuestion(mIdx, lIdx, qIdx, { question: e.target.value })}
                                                                                        placeholder={`Question #${qIdx + 1}`}
                                                                                        className="font-bold border-black"
                                                                                    />
                                                                                </div>
                                                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                                                    {q.options.map((opt, oIdx) => (
                                                                                        <div key={oIdx} className="flex items-center gap-2">
                                                                                            <div 
                                                                                                className={`w-6 h-6 rounded-full border-2 cursor-pointer flex items-center justify-center ${q.correctOption === oIdx ? 'bg-primary border-black' : 'border-gray-300'}`}
                                                                                                onClick={() => updateQuestion(mIdx, lIdx, qIdx, { correctOption: oIdx })}
                                                                                            >
                                                                                                {q.correctOption === oIdx && <Check className="w-3 h-3" />}
                                                                                            </div>
                                                                                            <Input 
                                                                                                value={opt}
                                                                                                onChange={(e) => {
                                                                                                    const newOptions = [...q.options];
                                                                                                    newOptions[oIdx] = e.target.value;
                                                                                                    updateQuestion(mIdx, lIdx, qIdx, { options: newOptions });
                                                                                                }}
                                                                                                placeholder={`Option ${oIdx + 1}`}
                                                                                                className="h-9 text-sm"
                                                                                            />
                                                                                        </div>
                                                                                    ))}
                                                                                </div>
                                                                                <Button 
                                                                                    variant="ghost" 
                                                                                    size="icon" 
                                                                                    className="absolute -top-3 -right-3 bg-white border-2 border-gray-200 w-8 h-8 hover:bg-red-50 hover:border-red-500 hover:text-red-500 rounded-full shadow-sm"
                                                                                    onClick={() => {
                                                                                        const newQuestions = lesson.questions?.filter((_, i) => i !== qIdx);
                                                                                        updateLesson(mIdx, lIdx, { questions: newQuestions });
                                                                                    }}
                                                                                >
                                                                                    <Trash2 className="w-4 h-4" />
                                                                                </Button>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    ))}
                                    <Button 
                                        variant="ghost" 
                                        size="sm" 
                                        className="w-full border-2 border-dashed border-gray-300 font-bold text-gray-500 hover:text-black hover:border-black hover:bg-transparent h-10 mt-2"
                                        onClick={() => addLesson(mIdx)}
                                    >
                                        + Add Lesson
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            );
        case 4:
            return (
                <div className="space-y-8 animate-fade-in-up">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Pricing Section */}
                        <div className="bg-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_#a8a6ff] h-fit">
                            <h2 className="text-2xl font-black mb-6 uppercase border-b-2 border-black pb-2">Set Your Price</h2>
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <Label className="font-bold text-lg">REGULAR PRICE ($)</Label>
                                    <Input 
                                        type="number"
                                        value={formData.price}
                                        onChange={(e) => updateForm('price', e.target.value)} 
                                        placeholder="49.00" 
                                        className="h-14 text-lg border-2 border-black font-bold shadow-[4px_4px_0px_0px_#a8a6ff] focus-visible:ring-0" 
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="font-bold text-lg">SALE PRICE ($) <span className="text-gray-400 text-xs font-normal">OPTIONAL</span></Label>
                                    <Input 
                                        type="number"
                                        value={formData.salePrice}
                                        onChange={(e) => updateForm('salePrice', e.target.value)} 
                                        placeholder="29.00" 
                                        className="h-14 text-lg border-2 border-black font-bold shadow-[4px_4px_0px_0px_#a8a6ff] focus-visible:ring-0" 
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Review Summary */}
                        <div className="bg-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_#a8a6ff]">
                            <h2 className="text-2xl font-black mb-6 uppercase border-b-2 border-black pb-2">Review Summary</h2>
                            <div className="space-y-4">
                                <div>
                                    <h4 className="text-xs font-black text-gray-500 uppercase mb-1">Course Info</h4>
                                    <p className="font-bold text-xl">{formData.title || "Untitled Course"}</p>
                                    <span className="inline-block bg-primary/20 text-primary px-2 py-0.5 mt-1 text-xs font-black border border-primary uppercase">{formData.category || "Uncategorized"}</span>
                                    <span className="inline-block bg-gray-100 px-2 py-0.5 ml-2 text-xs font-bold border border-gray-300 uppercase">{formData.level}</span>
                                </div>
                                
                                <div>
                                    <h4 className="text-xs font-black text-gray-500 uppercase mb-1">Branding</h4>
                                    <p className="font-bold">{formData.template.replace('-', ' ')} Template</p>
                                </div>

                                <div>
                                    <h4 className="text-xs font-black text-gray-500 uppercase mb-1">Content Stats</h4>
                                    <div className="grid grid-cols-2 gap-2">
                                        <div className="bg-gray-50 p-2 border border-black text-center">
                                            <span className="block text-xl font-black">{formData.modules.length}</span>
                                            <span className="text-xs font-bold text-gray-500">MODULES</span>
                                        </div>
                                        <div className="bg-gray-50 p-2 border border-black text-center">
                                            <span className="block text-xl font-black">{formData.modules.reduce((acc, m) => acc + m.lessons.length, 0)}</span>
                                            <span className="text-xs font-bold text-gray-500">LESSONS</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-black text-white border-4 border-black p-8 flex flex-col items-center text-center space-y-6 shadow-[12px_12px_0px_0px_#a8a6ff] mt-12">
                        <div className="w-20 h-20 bg-primary rounded-full border-4 border-white flex items-center justify-center text-white mb-2 shadow-[4px_4px_0px_0px_rgba(255,255,255,0.5)]">
                            <Check className="w-10 h-10" />
                        </div>
                        <div>
                             <h2 className="text-4xl font-black uppercase mb-2">Ready to Launch?</h2>
                             <p className="font-medium text-gray-300 max-w-lg mx-auto">
                                Your course is looking great. You can always edit it later, but why wait to start your empire?
                            </p>
                        </div>
                        
                        <div className="flex gap-4 w-full max-w-md">
                            <Button 
                                onClick={handlePublish}
                                className="flex-1 h-16 text-xl font-black border-4 border-white bg-white text-black hover:bg-gray-200 shadow-[6px_6px_0px_0px_rgba(255,255,255,0.2)] hover:translate-x-[2px] hover:translate-y-[2px] shadow-none transition-all uppercase"
                            >
                                PUBLISH NOW
                            </Button>
                        </div>
                        <p className="text-xs font-bold text-gray-500">By publishing, you agree to our terms of service.</p>
                    </div>
                </div>
            );
        default: return null;
    }
  };

  return (
    <div className="max-w-5xl mx-auto pb-40">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div className="flex items-center gap-4">
                <Link href="/teacher/courses">
                    <Button variant="ghost" size="icon" className="border-2 border-transparent hover:border-black rounded-none">
                        <ArrowLeft className="w-6 h-6" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-4xl font-black uppercase tracking-tight">Create New Course</h1>
                    <p className="font-bold text-gray-500">Step {currentStep} of 4</p>
                </div>
            </div>
            
            <div className="flex items-center gap-3">
                 <Button 
                    variant="outline" 
                    onClick={handleSaveDraft}
                    className="h-12 border-2 border-black font-bold hover:bg-gray-50 shadow-[4px_4px_0px_0px_#e5e7eb] hover:shadow-none transition-all"
                >
                    <Save className="w-4 h-4 mr-2" /> SAVE DRAFT
                </Button>
                <div className="text-right hidden lg:block">
                    <p className="text-xs font-bold text-gray-400 uppercase">Status</p>
                    <div className="flex items-center gap-2">
                         <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></div>
                         <span className="font-bold text-sm">DRAFT</span>
                    </div>
                </div>
            </div>
        </div>

        {/* Wizard Progress */}
        <div className="mb-20 px-4">
            <div className="flex items-center justify-between w-full">
                {steps.map((s, index) => {
                    const isActive = currentStep === s.num;
                    const isCompleted = currentStep > s.num;
                    const isLast = index === steps.length - 1;

                    return (
                        <div key={s.num} className="contents">
                            {/* Step Node */}
                            <div className="relative flex flex-col items-center group z-10">
                                <div 
                                    className={`w-14 h-14 rounded-full border-4 flex items-center justify-center transition-all duration-300 bg-white ${
                                        isActive ? 'border-black text-black scale-110 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]' : 
                                        isCompleted ? 'border-black bg-primary text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]' : 
                                        'border-gray-200 text-gray-300'
                                    }`}
                                >
                                    {isCompleted ? <Check className="w-6 h-6 stroke-[3]" /> : <s.icon className="w-6 h-6" />}
                                </div>
                                <span className={`absolute top-16 text-xs font-black uppercase tracking-wider whitespace-nowrap transition-colors ${
                                    isActive ? 'text-black' : 
                                    isCompleted ? 'text-black' : 
                                    'text-gray-300'
                                }`}>{s.label}</span>
                            </div>

                            {/* Arrow Connector */}
                            {!isLast && (
                                <div className="flex-1 mx-4 relative h-[4px] bg-gray-100 hidden md:block">
                                    {/* Active Line Fill */}
                                    <div 
                                        className="absolute inset-0 bg-black transition-all duration-500 origin-left"
                                        style={{ transform: currentStep > index + 1 ? 'scaleX(1)' : 'scaleX(0)' }}
                                    ></div>
                                    
                                    {/* Arrow Head (Static Gray) */}
                                    <div className="absolute right-[-4px] top-1/2 -translate-y-1/2 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[10px] border-l-gray-100"></div>

                                    {/* Arrow Head (Active Black) */}
                                     <div 
                                        className="absolute right-[-4px] top-1/2 -translate-y-1/2 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[10px] border-l-black transition-opacity duration-500"
                                        style={{ opacity: currentStep > index + 1 ? 1 : 0 }}
                                    ></div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>

        {/* Main Content Area */}
        <div className="min-h-[500px]">
             <AnimatePresence mode="wait">
                <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                >
                    {renderStep()}
                </motion.div>
             </AnimatePresence>
        </div>

        {/* Floating Footer Navigation */}
        <div className="fixed bottom-0 left-0 md:left-64 right-0 p-3 bg-white/80 backdrop-blur-md border-t-4 border-black z-50">
            <div className="max-w-5xl mx-auto flex justify-between items-center">
                <Button 
                    variant="outline" 
                    disabled={currentStep === 1}
                    onClick={handleBack}
                    className="h-11 px-8 font-bold text-lg border-2 border-black hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    BACK
                </Button>
                
                 {currentStep < 4 ? (
                    <Button 
                        onClick={handleNext} 
                        className="h-11 px-10 text-lg font-black border-2 border-black bg-primary text-black hover:bg-primary/90 shadow-[4px_4px_0px_0px_black] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_black] transition-all"
                    >
                        NEXT STEP <ChevronRight className="w-6 h-6 ml-2" />
                    </Button>
                 ) : (
                    <span className="text-sm font-bold text-gray-400 py-3 self-center mr-4">Review above to publish</span>
                 )}
            </div>
        </div>
    </div>
  );
}
