"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function RegisterPage() {
  const [role, setRole] = useState<'student' | 'teacher'>('student');

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
       {/* Left: Brand / Art */}
       <div className="hidden lg:flex flex-col justify-between p-12 bg-black text-white border-r-4 border-black relative overflow-hidden">
         <div className="absolute inset-0 bg-[#222] opacity-50 bg-[radial-gradient(#444_1px,transparent_1px)] [background-size:20px_20px]"></div>
         
         <div className="relative z-10">
            <div className="text-center mb-8">
                <Link href="/" className="inline-flex items-center gap-2 mb-6 group">
                    <div className="w-10 h-10 bg-primary border-2 border-black shadow-[4px_4px_0px_0px_var(--shadow-color)] flex items-center justify-center font-bold text-sm group-hover:rotate-6 group-hover:scale-110 transition-all duration-300 text-white">
                        O
                    </div>
                    <span className="font-bold text-2xl tracking-tighter group-hover:tracking-normal transition-all duration-300">OMZ LAB</span>
                </Link>
                <h1 className="text-3xl font-black uppercase mb-2">Join the Revolution</h1>
                <p className="font-bold text-gray-500">Create your account and start selling today.</p>
            </div>
            <ul className="space-y-4 font-bold text-lg text-gray-300">
                <li className="flex items-center gap-3"><Check className="text-primary" /> Zero hidden fees</li>
                <li className="flex items-center gap-3"><Check className="text-primary" /> Instant payouts</li>
                <li className="flex items-center gap-3"><Check className="text-primary" /> Own your data</li>
            </ul>
         </div>

         <div className="relative z-10 font-bold border-l-4 border-primary pl-6 py-2 text-gray-400">
             "Started with one course, now I run a 6-figure academy. Course.OS made it possible."
         </div>
      </div>

       {/* Right: Form */}
       <div className="flex items-center justify-center p-8 bg-background">
         <div className="w-full max-w-md space-y-8">
            <div className="text-center lg:text-left">
                <h1 className="text-4xl font-black uppercase mb-2">Create Account</h1>
                <p className="font-bold text-gray-500">Choose your path and get started.</p>
            </div>

            <div className="bg-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_#a8a6ff]">
                <div className="flex gap-4 mb-8">
                    <button 
                        onClick={() => setRole('student')}
                        className={`flex-1 py-3 font-black border-2 transition-all ${role === 'student' ? 'border-black bg-primary text-black shadow-[4px_4px_0px_0px_black]' : 'border-gray-200 text-gray-400 hover:border-black'}`}
                    >
                        LEARN
                    </button>
                    <button 
                         onClick={() => setRole('teacher')}
                        className={`flex-1 py-3 font-black border-2 transition-all ${role === 'teacher' ? 'border-black bg-primary text-black shadow-[4px_4px_0px_0px_black]' : 'border-gray-200 text-gray-400 hover:border-black'}`}
                    >
                        TEACH
                    </button>
                </div>

                <form className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="fname" className="font-bold">FIRST NAME</Label>
                            <Input id="fname" className="h-12 border-2 border-black font-bold focus-visible:ring-0 shadow-sm" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="lname" className="font-bold">LAST NAME</Label>
                            <Input id="lname" className="h-12 border-2 border-black font-bold focus-visible:ring-0 shadow-sm" />
                        </div>
                    </div>
                    
                    <div className="space-y-2">
                        <Label htmlFor="email" className="font-bold">EMAIL ADDRESS</Label>
                        <Input id="email" type="email" className="h-12 border-2 border-black font-bold focus-visible:ring-0 shadow-sm" />
                    </div>
                    
                    <div className="space-y-2">
                        <Label htmlFor="password" className="font-bold">PASSWORD</Label>
                        <Input id="password" type="password" className="h-12 border-2 border-black font-bold focus-visible:ring-0 shadow-sm" />
                    </div>

                    <Button className="w-full h-14 text-xl font-bold border-2 border-black bg-black text-white hover:bg-gray-800 shadow-[6px_6px_0px_0px_#a8a6ff] hover:translate-x-[2px] hover:translate-y-[2px] shadow-none transition-all mt-4">
                        CREATE ACCOUNT <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                </form>
            </div>
            
             <p className="text-center font-bold text-gray-600">
                Already have an account? <Link href="/login" className="text-black underline decoration-2 underline-offset-2 hover:bg-primary/20">Login here</Link>
            </p>
         </div>
       </div>
    </div>
  );
}
