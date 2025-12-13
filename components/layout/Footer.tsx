import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="border-t-4 border-border bg-white mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 group cursor-pointer">
              <div className="w-8 h-8 bg-primary border-2 border-black shadow-[4px_4px_0px_0px_var(--shadow-color)] flex items-center justify-center font-bold text-sm group-hover:rotate-6 group-hover:scale-110 transition-all duration-300 text-white">
                O
              </div>
              <span className="font-bold text-3xl tracking-tighter group-hover:tracking-normal transition-all duration-300">OMZ LAB</span>
            </div>
            <p className="text-sm font-bold max-w-xs">
              The ultimate platform for creators to sell courses and digital assets with zero friction.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold text-lg mb-4 bg-accent inline-block px-2 border-2 border-border shadow-[3px_3px_0px_0px_#a8a6ff]">PLATFORM</h4>
            <ul className="space-y-2 font-bold text-sm">
              <li><Link href="/features" className="hover:text-primary transition-colors">Features</Link></li>
              <li><Link href="/pricing" className="hover:text-primary transition-colors">Pricing</Link></li>
              <li><Link href="/#contact" className="hover:text-primary transition-colors">Contact</Link></li>
              <li><Link href="/#faq" className="hover:text-primary transition-colors">FAQ</Link></li>
            </ul>
          </div>

          <div>
             <h4 className="font-bold text-lg mb-4 bg-primary inline-block px-2 border-2 border-border shadow-[3px_3px_0px_0px_#a8a6ff]">LEGAL</h4>
             <ul className="space-y-2 font-bold text-sm">
              <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link href="/security" className="hover:text-primary transition-colors">Security</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-bold text-lg mb-4">STAY UPDATED</h4>
            <div className="flex flex-col gap-2">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="border-2 border-border p-2 font-bold focus:outline-none focus:ring-0 shadow-[4px_4px_0px_0px_#a8a6ff]"
              />
              <Button className="border-2 border-border bg-black text-white hover:bg-gray-800 shadow-[4px_4px_0px_0px_#a8a6ff] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0px_0px_#a8a6ff] transition-all font-bold">
                SUBSCRIBE
              </Button>
            </div>
            <div className="flex gap-4 mt-6">
              {[Twitter, Facebook, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="p-2 border-2 border-border hover:bg-secondary transition-all duration-300 shadow-[3px_3px_0px_0px_#a8a6ff] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_#a8a6ff] hover:rotate-6 active:scale-95">
                  <Icon className="w-5 h-5 transition-transform hover:scale-110" />
                </a>
              ))}
            </div>
          </div>
        </div>
        
        <div className="border-t-2 border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 font-bold text-sm">
          <p>© 2025 COURSE.OS. All rights reserved.</p>
          <div className="flex gap-4">
            <Mail className="w-5 h-5" />
            <span>contact@course.os</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
