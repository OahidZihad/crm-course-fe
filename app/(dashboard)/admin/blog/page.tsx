"use client";

import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  selectAllPosts,
  selectCategories,
  setFilters,
  selectFilters,
  updatePostStatus,
} from "@/lib/features/blog/blogSlice";
import { BlogStatus } from "@/lib/features/blog/types";
import { useState } from "react";
import {
  Check,
  X,
  Eye,
  Filter,
  Search,
  User,
  Calendar,
  Tag,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const statusColors: Record<string, string> = {
  draft: "bg-gray-400",
  pending: "bg-yellow-400",
  approved: "bg-green-400",
  rejected: "bg-red-400",
};

const statusLabels: Record<string, string> = {
  draft: "Draft",
  pending: "Pending",
  approved: "Published",
  rejected: "Rejected",
};

export default function AdminBlogPage() {
  const dispatch = useDispatch();
  const allPosts = useSelector(selectAllPosts);
  const categories = useSelector(selectCategories);
  const filters = useSelector(selectFilters);

  const [statusFilter, setStatusFilter] = useState<BlogStatus | "all">("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [rejectionReason, setRejectionReason] = useState("");
  const [rejectingPostId, setRejectingPostId] = useState<string | null>(null);

  // Filter posts
  const filteredPosts = allPosts.filter((post) => {
    if (statusFilter !== "all" && post.status !== statusFilter) return false;
    if (categoryFilter !== "all" && post.category.id !== categoryFilter) return false;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        post.title.toLowerCase().includes(query) ||
        post.author.name.toLowerCase().includes(query)
      );
    }
    return true;
  });

  const handleApprove = (postId: string) => {
    dispatch(updatePostStatus({ id: postId, status: "approved" }));
  };

  const handleReject = (postId: string) => {
    if (!rejectionReason.trim()) {
      alert("Please provide a rejection reason");
      return;
    }
    dispatch(
      updatePostStatus({
        id: postId,
        status: "rejected",
        rejectionReason: rejectionReason,
      })
    );
    setRejectingPostId(null);
    setRejectionReason("");
  };

  const pendingCount = allPosts.filter((p) => p.status === "pending").length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold uppercase mb-1">Blog Moderation</h1>
        <p className="font-bold text-gray-600">
          Review and approve blog posts from students and teachers.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Posts", value: allPosts.length, color: "bg-primary" },
          { label: "Pending Review", value: pendingCount, color: "bg-yellow-400" },
          { label: "Published", value: allPosts.filter((p) => p.status === "approved").length, color: "bg-green-400" },
          { label: "Rejected", value: allPosts.filter((p) => p.status === "rejected").length, color: "bg-red-400" },
        ].map((stat) => (
          <div
            key={stat.label}
            className={`p-4 border-4 border-border ${stat.color} shadow-[4px_4px_0px_0px_#000]`}
          >
            <div className="text-3xl font-bold">{stat.value}</div>
            <div className="text-sm font-bold uppercase">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 p-4 bg-white border-4 border-border shadow-neo">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title or author..."
              className="w-full pl-10 pr-4 py-3 border-2 border-border font-bold focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
        <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as BlogStatus | "all")}>
          <SelectTrigger className="w-[180px] border-2 border-border shadow-[4px_4px_0px_0px_#a8a6ff] rounded-none h-12 font-bold">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent className="border-2 border-border shadow-[4px_4px_0px_0px_#a8a6ff] rounded-none">
            <SelectItem value="all" className="font-bold">All Status</SelectItem>
            <SelectItem value="pending" className="font-bold">Pending</SelectItem>
            <SelectItem value="approved" className="font-bold">Published</SelectItem>
            <SelectItem value="rejected" className="font-bold">Rejected</SelectItem>
            <SelectItem value="draft" className="font-bold">Draft</SelectItem>
          </SelectContent>
        </Select>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-[180px] border-2 border-border shadow-[4px_4px_0px_0px_#a8a6ff] rounded-none h-12 font-bold">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent className="border-2 border-border shadow-[4px_4px_0px_0px_#a8a6ff] rounded-none">
            <SelectItem value="all" className="font-bold">All Categories</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat.id} value={cat.id} className="font-bold">
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Rejection Modal */}
      {rejectingPostId && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white border-4 border-border shadow-neo-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Reject Post</h3>
            <p className="text-gray-600 mb-4">
              Please provide a reason for rejection. This will be shown to the author.
            </p>
            <textarea
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="Enter rejection reason..."
              rows={4}
              className="w-full border-2 border-border p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            />
            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                onClick={() => {
                  setRejectingPostId(null);
                  setRejectionReason("");
                }}
                className="border-2 border-border"
              >
                Cancel
              </Button>
              <Button
                onClick={() => handleReject(rejectingPostId)}
                className="border-2 border-border bg-red-500 hover:bg-red-600 text-white"
              >
                Reject Post
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Posts Table */}
      <div className="bg-white border-4 border-border shadow-neo overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-b-4 border-border bg-gray-50">
              <TableHead className="font-bold uppercase">Post</TableHead>
              <TableHead className="font-bold uppercase">Author</TableHead>
              <TableHead className="font-bold uppercase">Category</TableHead>
              <TableHead className="font-bold uppercase">Status</TableHead>
              <TableHead className="font-bold uppercase">Date</TableHead>
              <TableHead className="font-bold uppercase text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPosts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-12">
                  <p className="text-gray-500 font-bold">No posts found</p>
                </TableCell>
              </TableRow>
            ) : (
              filteredPosts.map((post) => (
                <TableRow key={post.id} className="border-b-2 border-gray-100 hover:bg-gray-50">
                  <TableCell>
                    <div className="max-w-xs">
                      <p className="font-bold truncate">{post.title}</p>
                      <p className="text-sm text-gray-500 truncate">{post.excerpt}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-primary/30 border-2 border-border flex items-center justify-center font-bold text-sm">
                        {post.author.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-sm">{post.author.name}</p>
                        <p className="text-xs text-gray-500 capitalize">{post.author.role}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="px-2 py-1 bg-primary/20 border border-primary text-xs font-bold">
                      {post.category.name}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 border-2 border-border font-bold text-xs uppercase ${statusColors[post.status]}`}>
                      {statusLabels[post.status]}
                    </span>
                  </TableCell>
                  <TableCell className="text-sm text-gray-500">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1 justify-end">
                      <Link href={`/admin/blog/${post.id}`}>
                        <Button size="sm" variant="outline" className="border-2 border-border h-8 w-8 p-0">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                      {post.status === "pending" && (
                        <>
                          <Button
                            size="sm"
                            onClick={() => handleApprove(post.id)}
                            className="border-2 border-border bg-green-500 hover:bg-green-600 text-white h-8 w-8 p-0"
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => setRejectingPostId(post.id)}
                            className="border-2 border-border bg-red-500 hover:bg-red-600 text-white h-8 w-8 p-0"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
