import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Laptop, Layout, CreditCard, Users, BarChart3, Shield } from "lucide-react";

export default function FeaturesPage() {
  const features = [
    {
      title: "Course Builder",
      desc: "Intuitive drag-and-drop builder. Support for video, text, quizzes, and assignments.",
      icon: Layout,
      color: "bg-primary"
    },
    {
      title: "Secure Payments",
      desc: "Accept payments from 135+ countries. Automated tax handling and instant payouts.",
      icon: CreditCard,
      color: "bg-secondary"
    },
    {
      title: "Student Experience",
      desc: "Distraction-free learning environment. Progress tracking and certificates.",
      icon: Laptop,
      color: "bg-accent"
    },
    {
      title: "Community Tools",
      desc: "Built-in discussions, student profiles, and engagement metrics.",
      icon: Users,
      color: "bg-chart-1" 
    },
    {
      title: "Deep Analytics",
      desc: "Track revenue, retention, and student progress with detailed reports.",
      icon: BarChart3,
      color: "bg-chart-2"
    },
    {
      title: "Content Protection",
      desc: "Secure video hosting and DRM protection to keep your content safe.",
      icon: Shield,
      color: "bg-chart-3"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-20 text-center">
      <h1 className="text-5xl md:text-6xl font-bold mb-6 uppercase inline-block border-b-8 border-accent px-4 transform -rotate-1">
        Powerful Features
      </h1>
      <p className="text-xl font-bold max-w-2xl mx-auto mb-20">
        Everything you need to build, sell, and manage your online courses.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {features.map((feat, i) => (
          <div key={i} className="group border-4 border-border p-8 bg-white shadow-[8px_8px_0px_0px_#a8a6ff] text-left hover:-translate-y-2 transition-transform">
            <div className={`w-14 h-14 ${feat.color} border-2 border-border flex items-center justify-center mb-6 shadow-[4px_4px_0px_0px_#a8a6ff] group-hover:shadow-[6px_6px_0px_0px_#a8a6ff] transition-all`}>
              <feat.icon className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-bold mb-3">{feat.title}</h3>
            <p className="font-bold text-gray-600 leading-relaxed">
              {feat.desc}
            </p>
          </div>
        ))}
      </div>
      
      <div className="mt-20 bg-black text-white p-12 border-4 border-primary shadow-[8px_8px_0px_0px_var(--color-primary)]">
        <h2 className="text-4xl font-bold mb-6">Ready to start your journey?</h2>
        <Link href="/register">
          <Button size="lg" className="text-xl h-14 px-10 border-4 border-white bg-primary text-black font-bold hover:bg-white hover:border-primary transition-colors">
            GET STARTED FOR FREE
          </Button>
        </Link>
      </div>
    </div>
  );
}
