import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, Ban, Banknote } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function AdminTeachersPage() {
  const teachers = [
    { id: 1, name: "Jane Doe", email: "jane@example.com", courses: 5, students: 120, status: "active", revenue: "$12,450" },
    { id: 2, name: "John Smith", email: "john@example.com", courses: 2, students: 45, status: "active", revenue: "$3,200" },
    { id: 3, name: "Bob Wilson", email: "bob@example.com", courses: 0, students: 0, status: "pending", revenue: "$0" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold uppercase mb-1">Teacher Management</h1>
        <p className="font-bold text-gray-600">Oversee instructors and payouts.</p>
      </div>

      <div className="bg-white border-4 border-border shadow-[8px_8px_0px_0px_#a8a6ff]">
        <Table>
          <TableHeader className="bg-gray-100 border-b-2 border-border">
            <TableRow>
              <TableHead className="font-bold text-black">TEACHER</TableHead>
              <TableHead className="font-bold text-black">STATS</TableHead>
              <TableHead className="font-bold text-black">STATUS</TableHead>
              <TableHead className="font-bold text-black">REVENUE</TableHead>
              <TableHead className="text-right font-bold text-black">ACTIONS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {teachers.map((teacher) => (
              <TableRow key={teacher.id} className="border-b-2 border-border hover:bg-gray-50">
                <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                        <Avatar className="border-2 border-border">
                             <AvatarImage src={`https://i.pravatar.cc/150?u=${teacher.id}`} />
                             <AvatarFallback>TC</AvatarFallback>
                        </Avatar>
                        <div>
                            <div className="font-bold">{teacher.name}</div>
                            <div className="text-xs text-gray-500 font-bold">{teacher.email}</div>
                        </div>
                    </div>
                </TableCell>
                <TableCell>
                    <div className="text-sm">
                        <div className="font-bold">{teacher.courses} Courses</div>
                        <div className="text-gray-500">{teacher.students} Students</div>
                    </div>
                </TableCell>
                <TableCell>
                  <Badge variant={teacher.status === 'active' ? 'default' : 'secondary'} className="rounded-none border-2 border-border font-bold uppercase shadow-[2px_2px_0px_0px_#a8a6ff]">
                    {teacher.status}
                  </Badge>
                </TableCell>
                <TableCell className="font-bold">{teacher.revenue}</TableCell>
                <TableCell className="text-right">
                   <div className="flex justify-end gap-2">
                        <Button size="icon" variant="ghost" className="h-8 w-8 border-2 border-transparent hover:border-border rounded-none">
                          <Banknote className="h-4 w-4 text-green-600" />
                        </Button>
                        <Button size="icon" variant="ghost" className="h-8 w-8 border-2 border-transparent hover:border-border rounded-none">
                          <Ban className="h-4 w-4 text-destructive" />
                        </Button>
                   </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
