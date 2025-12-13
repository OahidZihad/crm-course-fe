import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mail, MoreHorizontal } from "lucide-react";

export default function StudentsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold uppercase mb-1">Students</h1>
          <p className="font-bold text-gray-600">Manage enrollment and progress.</p>
        </div>
      </div>

       <Card className="border-4 border-border shadow-[8px_8px_0px_0px_#a8a6ff] rounded-none">
         <CardHeader className="border-b-2 border-border bg-secondary">
           <CardTitle className="font-bold uppercase">Enrolled Students</CardTitle>
         </CardHeader>
         <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-100 border-b-2 border-border">
                  <tr>
                    <th className="p-4 font-bold">STUDENT</th>
                    <th className="p-4 font-bold">COURSE</th>
                    <th className="p-4 font-bold">PROGRESS</th>
                    <th className="p-4 font-bold">JOINED</th>
                    <th className="p-4 font-bold text-right">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="divide-y-2 divide-black">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="border-2 border-border w-10 h-10">
                             <AvatarImage src={`https://i.pravatar.cc/150?u=${i}`} />
                             <AvatarFallback className="font-bold">ST</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-bold">Student Name</div>
                            <div className="text-xs font-bold text-gray-500">student@example.com</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 font-bold">Mastering Brutalism</td>
                      <td className="p-4">
                         <div className="flex items-center gap-2">
                            <div className="w-24 bg-gray-200 h-2 border border-border rounded-full overflow-hidden">
                                <div className="bg-primary h-full w-[65%]"></div>
                            </div>
                            <span className="font-bold text-xs">65%</span>
                         </div>
                      </td>
                      <td className="p-4 font-bold text-gray-600">2 days ago</td>
                      <td className="p-4 text-right">
                         <div className="flex justify-end gap-2">
                           <Button size="icon" variant="ghost" className="h-8 w-8 hover:bg-secondary border-2 border-transparent hover:border-border rounded-none">
                             <Mail className="w-4 h-4" />
                           </Button>
                           <Button size="icon" variant="ghost" className="h-8 w-8 hover:bg-gray-200 border-2 border-transparent hover:border-border rounded-none">
                             <MoreHorizontal className="w-4 h-4" />
                           </Button>
                         </div>
                      </td>
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
