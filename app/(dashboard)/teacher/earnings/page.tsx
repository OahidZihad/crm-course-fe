import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, TrendingUp } from "lucide-react";

export default function EarningsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold uppercase mb-1">Earnings</h1>
          <p className="font-bold text-gray-600">Track your revenue and payouts.</p>
        </div>
        <Button variant="outline" className="h-12 font-bold border-2 border-border shadow-[4px_4px_0px_0px_#a8a6ff] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#a8a6ff] transition-all">
          <Download className="mr-2 w-5 h-5" /> EXPORT REPORT
        </Button>
      </div>

       <div className="grid gap-6 md:grid-cols-3">
        <Card className="border-4 border-border bg-primary shadow-[8px_8px_0px_0px_#a8a6ff] rounded-none">
           <CardHeader className="pb-2">
             <CardTitle className="text-sm font-bold uppercase">Total Revenue</CardTitle>
           </CardHeader>
           <CardContent>
             <div className="text-4xl font-bold">$12,450.00</div>
           </CardContent>
        </Card>
        <Card className="border-4 border-border bg-white shadow-[8px_8px_0px_0px_#a8a6ff] rounded-none">
           <CardHeader className="pb-2">
             <CardTitle className="text-sm font-bold uppercase">Pending Payout</CardTitle>
           </CardHeader>
           <CardContent>
             <div className="text-4xl font-bold">$2,450.00</div>
             <div className="text-sm font-bold text-gray-500 mt-2">Next payout: Dec 15</div>
           </CardContent>
        </Card>
         <Card className="border-4 border-border bg-white shadow-[8px_8px_0px_0px_#a8a6ff] rounded-none">
           <CardHeader className="pb-2">
             <CardTitle className="text-sm font-bold uppercase">Platform Fees</CardTitle>
           </CardHeader>
           <CardContent>
             <div className="text-4xl font-bold text-destructive">$622.50</div>
             <div className="text-sm font-bold text-gray-500 mt-2">5% Transaction Fee</div>
           </CardContent>
        </Card>
       </div>

       <Card className="border-4 border-border shadow-[8px_8px_0px_0px_#a8a6ff] rounded-none">
         <CardHeader className="border-b-2 border-border bg-muted">
           <CardTitle className="font-bold uppercase">Transaction History</CardTitle>
         </CardHeader>
         <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-100 border-b-2 border-border">
                  <tr>
                    <th className="p-4 font-bold">DATE</th>
                    <th className="p-4 font-bold">COURSE</th>
                    <th className="p-4 font-bold">STUDENT</th>
                    <th className="p-4 font-bold text-right">AMOUNT</th>
                  </tr>
                </thead>
                <tbody className="divide-y-2 divide-black">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="p-4 font-bold text-gray-600">Dec 12, 2025</td>
                      <td className="p-4 font-bold">Advanced React Patterns</td>
                      <td className="p-4">John Smith</td>
                      <td className="p-4 text-right font-bold text-green-600">+$49.00</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
         </CardContent>
       </Card>
    </div>
  );
}
