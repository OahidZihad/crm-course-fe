import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function AdminFinancialsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold uppercase mb-1">Financials</h1>
          <p className="font-bold text-gray-600">Platform revenue and teacher payouts.</p>
        </div>
        <Button variant="outline" className="h-12 font-bold border-2 border-border shadow-[4px_4px_0px_0px_#a8a6ff] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#a8a6ff] transition-all">
          <Download className="mr-2 w-5 h-5" /> EXPORT EXCEL
        </Button>
      </div>

       <div className="grid gap-6 md:grid-cols-3">
        <Card className="border-4 border-border bg-primary shadow-[8px_8px_0px_0px_#a8a6ff] rounded-none">
           <CardHeader className="pb-2">
             <CardTitle className="text-sm font-bold uppercase">Gross Volume</CardTitle>
           </CardHeader>
           <CardContent>
             <div className="text-4xl font-bold">$424,500.00</div>
           </CardContent>
        </Card>
        <Card className="border-4 border-border bg-white shadow-[8px_8px_0px_0px_#a8a6ff] rounded-none">
           <CardHeader className="pb-2">
             <CardTitle className="text-sm font-bold uppercase">Net Revenue (Fees)</CardTitle>
           </CardHeader>
           <CardContent>
             <div className="text-4xl font-bold text-green-600">$21,225.00</div>
             <div className="text-sm font-bold text-gray-500 mt-2">Avg 5% take rate</div>
           </CardContent>
        </Card>
         <Card className="border-4 border-border bg-white shadow-[8px_8px_0px_0px_#a8a6ff] rounded-none">
           <CardHeader className="pb-2">
             <CardTitle className="text-sm font-bold uppercase">Teacher Payouts</CardTitle>
           </CardHeader>
           <CardContent>
             <div className="text-4xl font-bold text-gray-800">$403,275.00</div>
             <div className="text-sm font-bold text-gray-500 mt-2">Pending this month: $45k</div>
           </CardContent>
        </Card>
       </div>
       
       <div className="bg-white border-4 border-border shadow-[8px_8px_0px_0px_#a8a6ff]">
        <div className="p-4 border-b-2 border-border bg-gray-100">
            <h3 className="font-bold uppercase">Recent Transactions</h3>
        </div>
        <Table>
          <TableHeader className="border-b-2 border-border">
            <TableRow>
              <TableHead className="font-bold text-black">ID</TableHead>
              <TableHead className="font-bold text-black">TYPE</TableHead>
              <TableHead className="font-bold text-black">AMOUNT</TableHead>
              <TableHead className="font-bold text-black">FEE</TableHead>
              <TableHead className="font-bold text-black">DATE</TableHead>
              <TableHead className="font-bold text-black text-right">STATUS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
             {[1, 2, 3, 4, 5].map((i) => (
                <TableRow key={i} className="border-b-2 border-border hover:bg-gray-50">
                    <TableCell className="font-mono font-bold">#TRX-{2000+i}</TableCell>
                    <TableCell className="font-bold">Course Sale</TableCell>
                    <TableCell className="font-bold">$49.00</TableCell>
                    <TableCell className="font-bold text-green-600">$2.45</TableCell>
                    <TableCell className="font-bold text-gray-500">Dec 12, 2025</TableCell>
                    <TableCell className="text-right font-bold text-green-600">COMPLETED</TableCell>
                </TableRow>
             ))}
          </TableBody>
        </Table>
       </div>
    </div>
  );
}
