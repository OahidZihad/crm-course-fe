import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, BookOpen, DollarSign, Users, Zap, Check, Star, Shield, Layout, Globe, Quote, Mail } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function LandingPage() {
  const faqs = [
    {
      q: "How much does it cost?",
      a: "Our Starter plan is free forever. Pro is $29/mo. We only make money when you do."
    },
    {
      q: "Can I use my own domain?",
      a: "Yes! On the Pro plan, you can connect any custom domain to your course site."
    },
    {
      q: "Do you handle taxes?",
      a: "We integrate with Stripe Tax to automatically calculate and collect VAT/Sales tax based on your customer's location."
    },
    {
      q: "Can I sell digital downloads?",
      a: "Absolutely. Ebooks, templates, presets, video files - if it's digital, you can sell it."
    }
  ];

  const testimonials = [
      {
          name: "Sarah J.",
          role: "Design Instructor",
          text: "I switched from Teachable and doubled my conversion rate. The layout just works.",
          img: "/images/avatar_1.png"
      },
      {
          name: "Mike T.",
          role: "Coding Bootcamp",
          text: "Finally, a platform that doesn't feel like a corporate LMS. My students love the vibe.",
          img: "/images/avatar_2.png"
      },
      {
          name: "Jessica P.",
          role: "Marketing Coach",
          text: "Setup took 15 minutes. Got my first sale an hour later. Insane speed.",
          img: "/images/avatar_3.png"
      }
  ];

  return (
    <div className="flex flex-col gap-0 pb-0">
      {/* Hero Section - Full Height */}
      <section className="relative bg-background border-b-4 border-black min-h-[calc(100vh-80px)] flex flex-col justify-center overflow-hidden py-20">
        {/* Dotted Background Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#999_1px,transparent_1px)] [background-size:24px_24px] opacity-100"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white border-2 border-black px-4 py-1.5 font-bold mb-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] uppercase tracking-wider text-sm transform -rotate-1 hover:rotate-0 hover:scale-105 transition-all duration-300 cursor-default animate-fade-in-down">
            <Star className="w-4 h-4 fill-primary text-primary animate-[wiggle_2s_ease-in-out_infinite]" /> The #1 Platform for Creators
          </div>
          
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-8xl font-black mb-6 sm:mb-8 tracking-tighter uppercase drop-shadow-[4px_4px_0_rgba(255,255,255,1)] leading-[0.95] animate-fade-in-up delay100 opacity-0 [animation-fill-mode:forwards]">
            Sell Courses<br/>
            <span className="text-black bg-primary px-2 border-4 border-black transform -rotate-2 inline-block shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:rotate-0 hover:scale-105 transition-all duration-300">Keep 100%</span> Control
          </h1>
          <p className="text-xl font-bold md:text-2xl mb-12 max-w-2xl mx-auto text-gray-700 animate-fade-in-up delay200 opacity-0 [animation-fill-mode:forwards]">
            The no-nonsense platform for creators. Build your site, host your content, and manage your students without the fluff.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 animate-fade-in-up delay300 opacity-0 [animation-fill-mode:forwards]">
            <Link href="/register">
             <Button size="lg" className="group text-base sm:text-xl h-14 sm:h-16 px-6 sm:px-10 border-4 border-black bg-black text-white font-black shadow-[6px_6px_0px_0px_#a8a6ff] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[3px_3px_0px_0px_#a8a6ff] transition-all duration-300 hover:bg-black/90 w-full sm:w-auto active:scale-95">
              START TEACHING <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Button>
            </Link>
            <Link href="/courses">
            <Button size="lg" variant="outline" className="text-base sm:text-xl h-14 sm:h-16 px-6 sm:px-10 border-4 border-black bg-white font-black shadow-[6px_6px_0px_0px_#a8a6ff] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[3px_3px_0px_0px_#a8a6ff] transition-all duration-300 hover:bg-gray-50 w-full sm:w-auto active:scale-95">
              BROWSE COURSES
            </Button>
            </Link>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 border-4 border-black bg-primary rotate-12 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] opacity-100 hidden xl:block animate-[float_4s_ease-in-out_infinite]"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 rounded-full border-4 border-black bg-secondary -rotate-12 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] opacity-100 hidden xl:block animate-[float_5s_ease-in-out_infinite_0.5s]"></div>
        <div className="absolute top-1/2 right-20 w-16 h-16 border-4 border-black bg-accent rotate-45 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] opacity-80 hidden xl:block animate-[wiggle_3s_ease-in-out_infinite]"></div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 border-b-4 border-black bg-white">
        <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black uppercase mb-4 inline-block border-b-8 border-primary px-2">Why Choose Us?</h2>
              <p className="text-xl font-bold text-gray-600 mt-4">We built this because the other options suck.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Zero Friction",
                  desc: "Drag, drop, and done. Create stunning course pages in minutes with our brutalist builder.",
                  icon: Zap,
                  color: "bg-primary"
                },
                {
                  title: "Instant Payouts",
                  desc: "Get paid immediately. Connect Stripe or PayPal and keep your cash flow moving.",
                  icon: DollarSign,
                  color: "bg-secondary"
                },
                {
                  title: "Student Community",
                  desc: "Built-in engagement tools. Comments, quizzes, and leaderboards to keep students hooked.",
                  icon: Users,
                  color: "bg-accent"
                }
              ].map((item, i) => (
                <div key={i} className={`group border-4 border-black p-8 bg-white shadow-[8px_8px_0px_0px_#a8a6ff] hover:-translate-y-3 hover:shadow-[12px_12px_0px_0px_#a8a6ff] transition-all duration-300 ease-out cursor-pointer animate-fade-in-up opacity-0 [animation-fill-mode:forwards]`} style={{ animationDelay: `${i * 150}ms` }}>
                  <div className={`w-16 h-16 ${item.color} border-4 border-black flex items-center justify-center mb-6 shadow-[4px_4px_0px_0px_black] group-hover:rotate-12 group-hover:scale-110 transition-all duration-300`}>
                    <item.icon className="w-8 h-8 text-black group-hover:scale-110 transition-transform" />
                  </div>
                  <h3 className="text-3xl font-black mb-4 uppercase">{item.title}</h3>
                  <p className="font-bold text-gray-600 text-lg leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
        </div>
      </section>

      {/* Our Value Section */}
      <section className="py-24 border-b-4 border-black bg-secondary/20">
         <div className="container mx-auto px-4">
             <div className="grid lg:grid-cols-2 gap-16 items-center">
                 <div className="space-y-8">
                     <h2 className="text-5xl md:text-6xl font-black uppercase leading-none">
                         Built for <span className="bg-black text-white px-2">Total</span><br/>
                         Ownership.
                     </h2>
                     <p className="text-xl font-bold text-gray-700 leading-relaxed">
                         Most platforms hold your students hostage. Not us. You get full access to emails, analytics, and revenue. No hidden algorithms, no "marketplace fees" eating your lunch.
                     </p>
                     <ul className="space-y-4">
                         {[
                             "100% Data Ownership",
                             "Direct Stripe Connect",
                             "Custom Domain Support",
                             "White-label Friendly"
                         ].map((val, i) => (
                             <li key={i} className="flex items-center gap-3 text-xl font-black uppercase">
                                 <div className="bg-primary border-2 border-black p-1 shadow-[3px_3px_0px_0px_black]">
                                    <Check className="w-4 h-4 text-white" />
                                 </div>
                                 {val}
                             </li>
                         ))}
                     </ul>
                 </div>
                  <div className="relative animate-zoom-in delay300 opacity-0 [animation-fill-mode:forwards]">
                      <div className="aspect-square bg-white border-4 border-black shadow-[12px_12px_0px_0px_black] flex flex-col items-center justify-end p-8 relative z-10 overflow-hidden group">
                          <Image 
                             src="/images/your_rules.png" 
                             alt="Your Rules Shield" 
                             fill 
                             className="object-cover group-hover:scale-110 transition-transform duration-500"
                           />
                           <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10 hidden group-hover:block transition-all"></div>
                          <div className="text-center space-y-2 relative z-20 bg-white/90 border-2 border-black p-4 shadow-[4px_4px_0px_0px_black] group-hover:-translate-y-2 transition-transform duration-300">
                              <h3 className="text-2xl font-black uppercase">Your Rules</h3>
                              <p className="font-bold text-gray-700 text-sm">We don't gatekeep your success.</p>
                          </div>
                      </div>
                      <div className="absolute inset-0 border-4 border-black bg-primary translate-x-4 translate-y-4 -z-0"></div>
                  </div>
             </div>
         </div>
      </section>
      
      {/* Featured Courses Preview */}
      <section className="py-24 border-b-4 border-black">
        <div className="container mx-auto px-4">
            <div className="bg-white border-4 border-black p-8 md:p-12 shadow-[12px_12px_0px_0px_#a8a6ff] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -z-10"></div>
                
                <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6 relative z-10">
                <div>
                    <h2 className="text-4xl md:text-5xl font-black uppercase mb-2">Trending Now</h2>
                    <p className="font-bold text-gray-600 text-xl">Top rated courses from our best creators.</p>
                </div>
                <Link href="/courses">
                    <Button className="border-4 border-black bg-white text-black hover:bg-primary hover:text-white font-black text-lg h-14 px-8 shadow-[4px_4px_0px_0px_black] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
                        VIEW ALL COURSES
                    </Button>
                </Link>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((n) => (
                    <div key={n} className="bg-white border-2 border-black p-4 shadow-[4px_4px_0px_0px_#e5e7eb] hover:border-primary hover:shadow-[6px_6px_0px_0px_var(--primary)] transition-all cursor-pointer group">
                    <div className="bg-gray-100 h-48 w-full mb-4 border-2 border-black group-hover:scale-[1.02] transition-transform relative overflow-hidden">
                            <div className="absolute inset-0 flex items-center justify-center text-gray-300 font-black text-4xl opacity-20">IMG</div>
                    </div>
                    <h4 className="font-black text-xl leading-tight mb-3 group-hover:text-primary transition-colors">Mastering The Art of Brutalism</h4>
                    <div className="flex justify-between items-center font-bold">
                        <span className="bg-black text-white px-2 py-0.5 text-xs uppercase">Design</span>
                        <span className="text-lg">$49</span>
                    </div>
                    </div>
                ))}
                </div>
            </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 border-b-4 border-black bg-primary/5">
         <div className="container mx-auto px-4">
             <h2 className="text-4xl md:text-5xl font-black uppercase mb-16 text-center">Creator Stories</h2>
             <div className="grid md:grid-cols-3 gap-8">
                 {testimonials.map((t, i) => (
                     <div key={i} className="bg-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_black] relative">
                         <Quote className="absolute top-4 right-4 w-8 h-8 text-secondary/20 fill-current" />
                         <p className="text-xl font-bold mb-6 italic leading-relaxed">"{t.text}"</p>
                          <div className="flex items-center gap-4 border-t-2 border-dashed border-gray-300 pt-4">
                              <div className="w-12 h-12 bg-black rounded-full border-2 border-black overflow-hidden relative">
                                  <Image src={t.img} alt={t.name} fill className="object-cover" />
                              </div>
                             <div>
                                 <p className="font-black text-lg">{t.name}</p>
                                 <p className="font-bold text-sm text-gray-500 uppercase">{t.role}</p>
                             </div>
                         </div>
                     </div>
                 ))}
             </div>
         </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 border-b-4 border-black bg-white" id="faq">
         <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black uppercase mb-4">You ask, we answer</h2>
            </div>
            <div className="space-y-6">
            <Accordion type="single" collapsible className="w-full space-y-4">
                {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-4 border-black shadow-[6px_6px_0px_0px_#a8a6ff] bg-white px-6">
                    <AccordionTrigger className="text-xl font-black hover:no-underline py-6 text-left">
                    {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-lg font-bold pb-8 text-gray-600 leading-relaxed">
                    {faq.a}
                    </AccordionContent>
                </AccordionItem>
                ))}
            </Accordion>
            </div>
         </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 border-b-4 border-black bg-secondary/10" id="contact">
          <div className="container mx-auto px-4 max-w-2xl">
              <div className="bg-white border-4 border-black p-10 shadow-[12px_12px_0px_0px_black]">
                   <div className="text-center mb-10">
                       <Mail className="w-12 h-12 mx-auto mb-4" />
                       <h2 className="text-4xl font-black uppercase mb-2">Get in Touch</h2>
                       <p className="font-bold text-gray-600">Got a question? We respond fast.</p>
                   </div>
                   
                   <form className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="name" className="font-bold">NAME</Label>
                                <Input id="name" placeholder="John Doe" className="h-12 border-2 border-black font-bold shadow-sm" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email" className="font-bold">EMAIL</Label>
                                <Input id="email" type="email" placeholder="john@example.com" className="h-12 border-2 border-black font-bold shadow-sm" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="message" className="font-bold">MESSAGE</Label>
                            <Textarea id="message" placeholder="Tell us everything..." className="min-h-[150px] border-2 border-black font-bold shadow-sm" />
                        </div>
                        <Button className="w-full h-14 text-xl font-black border-2 border-black bg-primary text-black hover:bg-black hover:text-white shadow-[6px_6px_0px_0px_black] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[3px_3px_0px_0px_black] transition-all">
                            SEND MESSAGE
                        </Button>
                   </form>
              </div>
          </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="bg-black text-white p-12 md:p-20 text-center border-4 border-black shadow-[12px_12px_0px_0px_var(--primary)] relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:20px_20px] opacity-30"></div>
                <div className="relative z-10 max-w-3xl mx-auto space-y-8">
                    <h2 className="text-4xl md:text-6xl font-black uppercase leading-tight">
                        Ready to build your<br/><span className="text-primary">Empire?</span>
                    </h2>
                    <p className="text-xl font-bold text-gray-400">Join 10,000+ creators who are owning their audience today.</p>
                    <Link href="/register">
                        <Button size="lg" className="text-xl h-16 px-12 border-4 border-white bg-white text-black font-black hover:bg-primary hover:border-black hover:text-white transition-all shadow-[6px_6px_0px_0px_rgba(255,255,255,0.2)]">
                            GET STARTED FOR FREE
                        </Button>
                    </Link>
                </div>
            </div>
          </div>
      </section>
    </div>
  );
}
