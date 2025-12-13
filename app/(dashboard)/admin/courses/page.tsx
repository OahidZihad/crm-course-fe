import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, Check, X, Eye } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function AdminCoursesPage() {
  const courses = [
    { id: 1, title: "Neo Brutalism Fundamentals", instructor: "Jane Doe", status: "pending", price: "$49", date: "Dec 12, 2025" },
    { id: 2, title: "React Performance Masterclass", instructor: "John Smith", status: "published", price: "$59", date: "Dec 10, 2025" },
    { id: 3, title: "Digital Marketing Basics", instructor: "Alice Johnson", status: "rejected", price: "$29", date: "Dec 08, 2025" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold uppercase mb-1">Course Management</h1>
        <p className="font-bold text-gray-600">Review and approve submissions.</p>
      </div>

      <div className="bg-white border-4 border-border shadow-[8px_8px_0px_0px_#a8a6ff]">
        <Table>
          <TableHeader className="bg-gray-100 border-b-2 border-border">
            <TableRow>
              <TableHead className="w-[300px] font-bold text-black">COURSE</TableHead>
              <TableHead className="font-bold text-black">INSTRUCTOR</TableHead>
              <TableHead className="font-bold text-black">STATUS</TableHead>
              <TableHead className="font-bold text-black">PRICE</TableHead>
              <TableHead className="font-bold text-black">DATE</TableHead>
              <TableHead className="text-right font-bold text-black">ACTIONS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {courses.map((course) => (
              <TableRow key={course.id} className="border-b-2 border-border hover:bg-gray-50">
                <TableCell className="font-bold">{course.title}</TableCell>
                <TableCell className="font-medium">{course.instructor}</TableCell>
                <TableCell>
                  <Badge variant={course.status === 'published' ? 'default' : course.status === 'rejected' ? 'destructive' : 'secondary'} className="rounded-none border-2 border-border font-bold uppercase shadow-[2px_2px_0px_0px_#a8a6ff]">
                    {course.status}
                  </Badge>
                </TableCell>
                <TableCell className="font-bold">{course.price}</TableCell>
                <TableCell className="font-medium text-gray-500">{course.date}</TableCell>
                <TableCell className="text-right">
                   <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0 border-2 border-transparent hover:border-border rounded-none">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="border-2 border-border shadow-[4px_4px_0px_0px_#a8a6ff] rounded-none">
                        <DropdownMenuItem className="font-bold cursor-pointer"><Eye className="mr-2 h-4 w-4" /> View Details</DropdownMenuItem>
                        <DropdownMenuItem className="font-bold cursor-pointer text-green-600 focus:text-green-700"><Check className="mr-2 h-4 w-4" /> Approve</DropdownMenuItem>
                        <DropdownMenuItem className="font-bold cursor-pointer text-destructive focus:text-destructive"><X className="mr-2 h-4 w-4" /> Reject</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
