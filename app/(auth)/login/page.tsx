"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, Lock } from "lucide-react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { login } from "@/lib/features/auth/authSlice";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Mock logic based on email
      let role: 'teacher' | 'student' | 'admin' = 'student';
      if (email.includes("teacher")) role = 'teacher';
      if (email.includes("admin")) role = 'admin';

      dispatch(login({
        id: "1",
        name: "Test User",
        email: email,
        role: role
      }));

      if (role === 'teacher') router.push('/teacher/dashboard');
      else if (role === 'admin') router.push('/admin/dashboard');
      else router.push('/courses');
      
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left: Brand / Art */}
      <div className="hidden lg:flex flex-col justify-between p-12 bg-primary border-r-4 border-black relative overflow-hidden">
         <div className="absolute inset-0 bg-secondary/10 opacity-50 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]"></div>
         
         <div className="relative z-10">
            <Link href="/" className="flex items-center gap-2 mb-10 group">
                <div className="w-12 h-12 bg-primary border-2 border-black shadow-[4px_4px_0px_0px_var(--shadow-color)] flex items-center justify-center font-bold text-lg group-hover:rotate-6 group-hover:scale-110 transition-all duration-300 text-white">O</div>
                <span className="font-bold text-3xl tracking-tighter group-hover:tracking-normal transition-all duration-300">OMZ LAB</span>
            </Link>
            <h2 className="text-6xl font-black uppercase leading-tight">
               Build your<br/>
               Empire.<br/>
               <span className="bg-white px-2 text-black">Today.</span>
            </h2>
         </div>

         <div className="relative z-10 font-bold border-l-4 border-black pl-6 py-2">
             "The only platform that treats creators like business owners, not content farms."
         </div>
      </div>

      {/* Right: Form */}
      <div className="flex items-center justify-center p-8 bg-background">
         <div className="w-full max-w-md space-y-8">
            <div className="text-center lg:text-left">
                <h1 className="text-4xl font-black uppercase mb-2">Welcome Back</h1>
                <p className="font-bold text-gray-500">Enter your details to access your dashboard.</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6 bg-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_#a8a6ff]">
                <div className="space-y-2">
                    <Label htmlFor="email" className="font-bold">EMAIL ADDRESS</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="teacher@example.com" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-12 border-2 border-black font-bold focus-visible:ring-0 focus-visible:border-primary shadow-[4px_4px_0px_0px_#e5e7eb] focus-visible:shadow-none transition-all"
                      required
                    />
                </div>
                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <Label htmlFor="password" className="font-bold">PASSWORD</Label>
                        <Link href="/forgot" className="text-xs font-bold text-gray-500 hover:text-black hover:underline">Forgot password?</Link>
                    </div>
                    <Input 
                      id="password" 
                      type="password" 
                      placeholder="••••••••" 
                      className="h-12 border-2 border-black font-bold focus-visible:ring-0 focus-visible:border-primary shadow-[4px_4px_0px_0px_#e5e7eb] focus-visible:shadow-none transition-all"
                      required
                    />
                </div>

                <Button disabled={loading} className="w-full h-14 text-xl font-bold border-2 border-black bg-black text-white hover:bg-gray-800 shadow-[6px_6px_0px_0px_#a8a6ff] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_#a8a6ff] transition-all">
                    {loading ? "LOGGING IN..." : "LOGIN"} <ArrowRight className="ml-2 w-5 h-5" />
                </Button>

                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t-2 border-gray-200"></span>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-white px-2 text-gray-500 font-bold">Or continue with</span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <Button type="button" variant="outline" className="border-2 border-black font-bold hover:bg-gray-50">Github</Button>
                    <Button type="button" variant="outline" className="border-2 border-black font-bold hover:bg-gray-50">Google</Button>
                </div>
            </form>

            <p className="text-center font-bold text-gray-600">
                Don't have an account? <Link href="/register" className="text-black underline decoration-2 underline-offset-2 hover:bg-primary/20">Create one now</Link>
            </p>
         </div>
      </div>
    </div>
  );
}
