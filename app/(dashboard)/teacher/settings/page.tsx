import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function TeacherSettingsPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-8 pb-20">
      <div>
        <h1 className="text-4xl font-bold uppercase mb-1">Settings</h1>
        <p className="font-bold text-gray-600">Manage your profile and preferences.</p>
      </div>

      <div className="bg-white border-4 border-border p-8 shadow-[8px_8px_0px_0px_#a8a6ff] space-y-8">
         {/* Profile */}
         <section className="space-y-4">
             <h2 className="text-xl font-bold uppercase border-b-2 border-border pb-2">Profile</h2>
             <div className="flex items-center gap-4">
                 <Avatar className="w-20 h-20 border-2 border-border">
                     <AvatarImage src="https://github.com/shadcn.png" />
                     <AvatarFallback>TB</AvatarFallback>
                 </Avatar>
                 <Button variant="outline" className="border-2 border-border font-bold shadow-[2px_2px_0px_0px_#a8a6ff]">
                    CHANGE PHOTO
                 </Button>
             </div>
             
             <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label className="font-bold">FIRST NAME</Label>
                    <Input className="border-2 border-border h-12 font-bold focus-visible:ring-0 focus-visible:border-border" defaultValue="Teacher" />
                </div>
                 <div className="space-y-2">
                    <Label className="font-bold">LAST NAME</Label>
                    <Input className="border-2 border-border h-12 font-bold focus-visible:ring-0 focus-visible:border-border" defaultValue="Bot" />
                </div>
             </div>
             
             <div className="space-y-2">
                <Label className="font-bold">BIO</Label>
                <Input className="border-2 border-border h-12 font-bold focus-visible:ring-0 focus-visible:border-border" defaultValue="I teach how to build brutalist UIs." />
            </div>
         </section>

         {/* Notifications */}
         <section className="space-y-4">
             <h2 className="text-xl font-bold uppercase border-b-2 border-border pb-2">Notifications</h2>
             <div className="space-y-4">
                 <div className="flex items-center justify-between">
                     <Label className="font-bold cursor-pointer" htmlFor="n1">Email me when a course is purchased</Label>
                     <Switch id="n1" />
                 </div>
                 <div className="flex items-center justify-between">
                     <Label className="font-bold cursor-pointer" htmlFor="n2">Email me when a student comments</Label>
                     <Switch id="n2" defaultChecked />
                 </div>
                 <div className="flex items-center justify-between">
                     <Label className="font-bold cursor-pointer" htmlFor="n3">Weekly performance report</Label>
                     <Switch id="n3" defaultChecked />
                 </div>
             </div>
         </section>
         
         {/* Payment */}
          <section className="space-y-4">
             <h2 className="text-xl font-bold uppercase border-b-2 border-border pb-2">Payout Method</h2>
             <div className="flex items-center gap-4 border-2 border-border p-4 bg-gray-50">
                 <div className="font-bold text-xl">STRIPE</div>
                 <div className="flex-1 text-sm font-bold text-gray-500">Connected account: acct_1234...</div>
                 <Button variant="link" className="text-destructive font-bold">DISCONNECT</Button>
             </div>
         </section>

         <Button size="lg" className="w-full text-lg font-bold border-2 border-border bg-primary text-black hover:bg-primary/90 shadow-[4px_4px_0px_0px_#a8a6ff] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#a8a6ff] transition-all">
            SAVE CHANGES
         </Button>
      </div>
    </div>
  );
}
