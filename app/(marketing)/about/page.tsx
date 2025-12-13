import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-6 sm:mb-10 uppercase tracking-tighter animate-fade-in-down opacity-0 [animation-fill-mode:forwards] leading-tight">
          We built this for <span className="bg-primary px-2 text-white border-4 border-border shadow-[4px_4px_0px_0px_#a8a6ff]">creators</span>, not corporations.
        </h1>
        
        <div className="prose prose-xl prose-p:font-bold prose-headings:font-bold mb-20 border-l-8 border-border pl-8">
          <p className="text-2xl leading-relaxed animate-fade-in-left delay100 opacity-0 [animation-fill-mode:forwards]">
            OMZ LAB was born out of frustration. Existing platforms take too much of your money and give you too little control. We believe in total ownership and radical simplicity.
          </p>
          <p className="animate-fade-in-left delay200 opacity-0 [animation-fill-mode:forwards]">
            Our mission is to empower 1 million creators to build independent education empires. No gatekeepers. No hidden fees. Just you and your students.
          </p>
        </div>

        <section className="mb-20">
          <h2 className="text-4xl font-bold mb-8 border-b-4 border-border inline-block">The Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className={`border-4 border-border p-4 bg-white shadow-[8px_8px_0px_0px_#a8a6ff] animate-zoom-in opacity-0 [animation-fill-mode:forwards]`} style={{ animationDelay: `${i * 150 + 300}ms` }}>
                <div className="bg-gray-200 h-64 w-full mb-4 border-2 border-border grayscale"></div>
                <h3 className="text-xl font-bold">Jane Doe</h3>
                <p className="font-bold text-accent-foreground">Co-Founder</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-accent border-4 border-border p-10 shadow-[8px_8px_0px_0px_#a8a6ff] text-center">
            <h2 className="text-3xl font-bold mb-4">Join the revolution.</h2>
            <Link href="/#contact">
                <Button size="lg" className="border-2 border-border bg-white text-black font-bold hover:bg-gray-100 shadow-[4px_4px_0px_0px_#a8a6ff]">
                    VIEW CAREERS
                </Button>
            </Link>
        </section>
      </div>
    </div>
  );
}
