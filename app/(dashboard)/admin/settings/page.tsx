import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AdminSettingsPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-8 pb-20">
      <div>
        <h1 className="text-4xl font-bold uppercase mb-1">Platform Settings</h1>
        <p className="font-bold text-gray-600">Configure your marketplace.</p>
      </div>

      <div className="bg-white border-4 border-border p-8 shadow-[8px_8px_0px_0px_#a8a6ff] space-y-8">
         {/* General */}
         <section className="space-y-4">
             <h2 className="text-xl font-bold uppercase border-b-2 border-border pb-2">General</h2>
             
             <div className="space-y-2">
                <Label className="font-bold">PLATFORM NAME</Label>
                <Input className="border-2 border-border h-12 font-bold focus-visible:ring-0 focus-visible:border-border" defaultValue="OMZ LAB" />
             </div>
             
             <div className="space-y-2">
                <Label className="font-bold">SUPPORT EMAIL</Label>
                <Input className="border-2 border-border h-12 font-bold focus-visible:ring-0 focus-visible:border-border" defaultValue="help@omz.lab" />
            </div>
         </section>

         {/* Commission */}
         <section className="space-y-4">
             <h2 className="text-xl font-bold uppercase border-b-2 border-border pb-2">Commission & Fees</h2>
             <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-2">
                    <Label className="font-bold">PLATFORM FEE (%)</Label>
                    <Input type="number" className="border-2 border-border h-12 font-bold focus-visible:ring-0 focus-visible:border-border" defaultValue="5" />
                 </div>
                 <div className="space-y-2">
                    <Label className="font-bold">PAYOUT SCHEDULE</Label>
                     <Select defaultValue="weekly">
                      <SelectTrigger className="border-2 border-border h-12 font-bold shadow-[4px_4px_0px_0px_#a8a6ff] focus:ring-0">
                        <SelectValue placeholder="Select..." />
                      </SelectTrigger>
                      <SelectContent className="border-2 border-border font-bold">
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                 </div>
             </div>
         </section>
         
         {/* Features */}
          <section className="space-y-4">
             <h2 className="text-xl font-bold uppercase border-b-2 border-border pb-2">Feature Toggles</h2>
             <div className="space-y-4">
                 <div className="flex items-center justify-between">
                     <Label className="font-bold cursor-pointer" htmlFor="f1">Allow Teacher Registration</Label>
                     <Switch id="f1" defaultChecked />
                 </div>
                 <div className="flex items-center justify-between">
                     <Label className="font-bold cursor-pointer" htmlFor="f2">Maintenance Mode</Label>
                     <Switch id="f2" />
                 </div>
                 <div className="flex items-center justify-between">
                     <Label className="font-bold cursor-pointer" htmlFor="f3">Enable Reviews</Label>
                     <Switch id="f3" defaultChecked />
                 </div>
             </div>
         </section>

         <Button size="lg" className="w-full text-lg font-bold border-2 border-border bg-primary text-black hover:bg-primary/90 shadow-[4px_4px_0px_0px_#a8a6ff] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#a8a6ff] transition-all">
            SAVE CONFIGURATION
         </Button>
      </div>
    </div>
  );
}
