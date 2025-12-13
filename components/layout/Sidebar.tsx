"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  DollarSign, 
  Settings, 
  LogOut,
  ShoppingBag,
  Award,
  ShieldCheck,
  CreditCard,
  Menu
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

export function Sidebar() {
  const pathname = usePathname();
  
  // Precise role detection using startsWith
  const isTeacher = pathname.startsWith("/teacher");
  const isAdmin = pathname.startsWith("/admin");
  const isStudent = pathname.startsWith("/student");
  
  // If no role matches (e.g. public /courses), do not render sidebar
  if (!isTeacher && !isAdmin && !isStudent) {
    return null;
  }

  const links = [
    // Teacher Links
    ...(isTeacher ? [
      { name: "Dashboard", href: "/teacher/dashboard", icon: LayoutDashboard },
      { name: "My Courses", href: "/teacher/courses", icon: BookOpen },
      { name: "Students", href: "/teacher/students", icon: Users },
      { name: "Earnings", href: "/teacher/earnings", icon: DollarSign },
      { name: "Settings", href: "/teacher/settings", icon: Settings },
    ] : []),
    
    // Student Links
    ...(isStudent ? [
      { name: "Dashboard", href: "/student/dashboard", icon: LayoutDashboard },
      { name: "Courses", href: "/courses", icon: ShoppingBag },
      { name: "My Learning", href: "/student/courses", icon: BookOpen },
      { name: "Settings", href: "/student/settings", icon: Settings },
    ] : []),
    
    // Admin Links
    ...(isAdmin ? [
      { name: "Overview", href: "/admin/dashboard", icon: LayoutDashboard },
      { name: "Courses", href: "/admin/courses", icon: BookOpen },
      { name: "Teachers", href: "/admin/teachers", icon: Users },
      { name: "Financials", href: "/admin/financials", icon: CreditCard },
      { name: "Platform", href: "/admin/settings", icon: ShieldCheck },
    ] : []),
  ];

  const SidebarContent = ({ isMobile = false }: { isMobile?: boolean }) => (
    <>
      <div className="h-16 md:h-20 flex items-center justify-center border-b-4 border-border bg-sidebar-primary">
          <Link href="/" className="flex items-center gap-2 px-6 group">
            <div className="w-8 h-8 bg-primary border-2 border-black shadow-[4px_4px_0px_0px_var(--shadow-color)] flex items-center justify-center font-bold text-sm group-hover:rotate-6 group-hover:scale-110 transition-all duration-300 text-white">
              O
            </div>
            <span className="font-bold text-2xl tracking-tighter group-hover:tracking-normal transition-all duration-300">OMZ LAB</span>
          </Link>
      </div>

      <nav className="flex-1 p-3 md:p-4 space-y-2 overflow-y-auto">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;
          const LinkWrapper = isMobile ? SheetClose : 'div';
          
          return (
            <LinkWrapper key={link.href} asChild={isMobile}>
              <Link 
                href={link.href}
                className={cn(
                  "flex items-center gap-3 px-3 md:px-4 py-2.5 md:py-3 font-bold border-2 transition-all shadow-[4px_4px_0px_0px_#a8a6ff] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#a8a6ff] text-sm md:text-base",
                  isActive 
                    ? "bg-primary border-border text-black" 
                    : "bg-white border-border hover:bg-sidebar-accent"
                )}
              >
                <Icon className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                <span className="truncate">{link.name}</span>
              </Link>
            </LinkWrapper>
          );
        })}
      </nav>

      <div className="p-3 md:p-4 border-t-4 border-border">
        <Button variant="ghost" className="w-full border-2 border-border font-bold hover:bg-destructive hover:text-white shadow-[4px_4px_0px_0px_#a8a6ff] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#a8a6ff] transition-all justify-start px-3 md:px-4 gap-3 text-sm">
          <LogOut className="w-4 h-4 md:w-5 md:h-5" />
          LOGOUT
        </Button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Header with Menu Toggle */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-14 bg-background border-b-4 border-border z-40 flex items-center px-4 justify-between">
        <Link href="/" className="font-bold text-lg tracking-tighter">COURSE.OS</Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon"
              className="border-2 border-border shadow-[3px_3px_0px_0px_#a8a6ff] h-9 w-9"
            >
              <Menu className="w-5 h-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[260px] p-0 border-r-4 border-border">
            <div className="flex flex-col h-full bg-sidebar">
              <SidebarContent isMobile={true} />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 border-r-4 border-border bg-sidebar h-screen flex-col fixed left-0 top-0 overflow-y-auto">
        <SidebarContent isMobile={false} />
      </aside>
    </>
  );
}

