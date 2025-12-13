import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";

export default function PricingPage() {
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="text-center mb-16 animate-fade-in-down opacity-0 [animation-fill-mode:forwards]">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 uppercase">Simple Pricing</h1>
        <p className="text-xl font-bold max-w-2xl mx-auto">
          No hidden fees. No nonsense. Choose the plan that fits your empire.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
        {[
          {
            name: "STARTER",
            price: "Free",
            desc: "For new creators just getting started.",
            color: "bg-white",
            features: ["Unlimited Students", "1 Course", "5% Transaction Fee", "Basic Analytics"]
          },
          {
            name: "PRO",
            price: "$29",
            period: "/mo",
            desc: "For serious creators scaling their business.",
            color: "bg-primary",
            popular: true,
            features: ["Unlimited Courses", "0% Transaction Fee", "Custom Domain", "Priority Support", "Advanced Analytics"]
          },
          {
            name: "AGENCY",
            price: "$99",
            period: "/mo",
            desc: "For multiple instructors and big operations.",
            color: "bg-secondary",
            features: ["Everything in Pro", "5 Admin Accounts", "Bulk Import/Export", "API Access", "White Labeling"]
          }
        ].map((plan, i) => (
          <div key={i} className={`relative border-4 border-border p-8 shadow-[8px_8px_0px_0px_#a8a6ff] flex flex-col ${plan.color} animate-fade-in-up opacity-0 [animation-fill-mode:forwards]`} style={{ animationDelay: `${i * 150}ms` }}>
            {plan.popular && (
               <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-accent border-2 border-border px-4 py-1 font-bold text-sm uppercase shadow-[2px_2px_0px_0px_#a8a6ff] animate-bounce-in">
                 Most Popular
               </div>
            )}
            <h3 className="text-3xl font-bold mb-2">{plan.name}</h3>
            <div className="mb-4">
              <span className="text-5xl font-bold">{plan.price}</span>
              {plan.period && <span className="text-lg font-bold">{plan.period}</span>}
            </div>
            <p className="font-bold text-sm mb-8 border-b-2 border-border pb-4">{plan.desc}</p>
            
            <ul className="space-y-4 mb-8 flex-1">
              {plan.features.map((feat, j) => (
                <li key={j} className="flex items-start gap-3 font-bold">
                  <div className="bg-black text-white p-0.5 mt-0.5">
                    <Check className="w-3 h-3" />
                  </div>
                  {feat}
                </li>
              ))}
            </ul>
            
            <Link href="/register">
              <Button className="w-full text-lg h-12 border-2 border-border bg-black text-white hover:bg-gray-800 shadow-[4px_4px_0px_0px_#a8a6ff] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0px_0px_#a8a6ff] transition-all font-bold group">
                CHOOSE {plan.name} <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform inline-block" />
              </Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
