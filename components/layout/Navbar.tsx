"use client"

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

export function Navbar() {
  const navLinks = [
    { href: "/features", label: "FEATURES" },
    { href: "/pricing", label: "PRICING" },
    { href: "/about", label: "ABOUT" },
    { href: "/#faq", label: "FAQ" },
    { href: "/#contact", label: "CONTACT" },
  ];

  return (
    <nav className="border-b-4 border-border bg-background sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 sm:h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary border-2 border-black shadow-[4px_4px_0px_0px_var(--shadow-color)] flex items-center justify-center font-bold text-sm group-hover:rotate-6 group-hover:scale-110 transition-all duration-300 text-white">
            O
          </div>
          <span className="font-bold text-2xl tracking-tighter group-hover:tracking-normal transition-all duration-300">OMZ LAB</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8 font-bold">
          {navLinks.map((link) => (
            <Link 
              key={link.href} 
              href={link.href} 
              className="hover:underline decoration-4 underline-offset-4 decoration-primary text-sm lg:text-base"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-2 lg:gap-4">
          <Link href="/login">
            <Button variant="ghost" className="font-bold border-2 border-transparent hover:border-border hover:bg-transparent text-sm">
              LOGIN
            </Button>
          </Link>
          <Link href="/courses">
            <Button className="font-bold border-2 border-border bg-primary text-black shadow-[4px_4px_0px_0px_#a8a6ff] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#a8a6ff] transition-all text-sm">
              COURSES
            </Button>
          </Link>
        </div>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden border-2 border-border shadow-[4px_4px_0px_0px_#a8a6ff] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] h-10 w-10"
            >
              <Menu className="w-5 h-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[280px] sm:w-[320px] border-l-4 border-border p-0">
            <div className="flex flex-col h-full">
              {/* Mobile Menu Header */}
              <div className="p-4 border-b-4 border-border flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-primary border-2 border-border shadow-[3px_3px_0px_0px_#a8a6ff] flex items-center justify-center font-bold">
                    C
                  </div>
                  <span className="font-bold text-lg tracking-tighter">COURSE.OS</span>
                </Link>
              </div>

              {/* Mobile Nav Links */}
              <nav className="flex-1 p-4 space-y-2">
                {navLinks.map((link) => (
                  <SheetClose asChild key={link.href}>
                    <Link 
                      href={link.href}
                      className="block py-3 px-4 font-bold border-2 border-border bg-white hover:bg-primary transition-colors shadow-[4px_4px_0px_0px_#a8a6ff] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#a8a6ff]"
                    >
                      {link.label}
                    </Link>
                  </SheetClose>
                ))}
              </nav>

              {/* Mobile Auth Buttons */}
              <div className="p-4 border-t-4 border-border space-y-3">
                <SheetClose asChild>
                  <Link href="/login" className="block">
                    <Button variant="outline" className="w-full h-12 font-bold border-2 border-border">
                      LOGIN
                    </Button>
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link href="/courses" className="block">
                    <Button className="w-full h-12 font-bold border-2 border-border bg-primary text-black shadow-[4px_4px_0px_0px_#a8a6ff]">
                      COURSES
                    </Button>
                  </Link>
                </SheetClose>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}

