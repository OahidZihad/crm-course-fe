"use client";

import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BlogPostCard } from "@/components/blog";
import {
  selectAllPosts,
  deletePost,
} from "@/lib/features/blog/blogSlice";
import { BlogStatus } from "@/lib/features/blog/types";
import { Plus } from "lucide-react";
import { useState } from "react";

// Mock current user - in real app this would come from auth
const currentUser = {
  id: "teacher-1",
  name: "John Smith",
  email: "john@example.com",
  role: "teacher" as const,
};

export default function TeacherBlogPage() {
  const dispatch = useDispatch();
  const allPosts = useSelector(selectAllPosts);
  const [activeFilter, setActiveFilter] = useState<BlogStatus | "all">("all");

  // Filter posts by current user
  const userPosts = allPosts.filter(
    (post) => post.author.id === currentUser.id
  );

  // Apply status filter
  const filteredPosts =
    activeFilter === "all"
      ? userPosts
      : userPosts.filter((post) => post.status === activeFilter);

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this post?")) {
      dispatch(deletePost(id));
    }
  };

  const statusFilters: { value: BlogStatus | "all"; label: string }[] = [
    { value: "all", label: "All Posts" },
    { value: "draft", label: "Drafts" },
    { value: "pending", label: "Pending" },
    { value: "approved", label: "Published" },
    { value: "rejected", label: "Rejected" },
  ];

  const getStatusCount = (status: BlogStatus | "all") => {
    if (status === "all") return userPosts.length;
    return userPosts.filter((p) => p.status === status).length;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold uppercase mb-1">My Blog Posts</h1>
          <p className="font-bold text-gray-600">
            Share your expertise and knowledge with students.
          </p>
        </div>
        <Link href="/teacher/blog/create">
          <Button className="h-12 text-lg font-bold border-2 border-border bg-primary text-black hover:bg-primary/90 shadow-[4px_4px_0px_0px_#a8a6ff] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#a8a6ff] transition-all">
            <Plus className="mr-2 h-5 w-5" />
            NEW POST
          </Button>
        </Link>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 p-4 bg-white border-4 border-border shadow-neo">
        {statusFilters.map((filter) => (
          <button
            key={filter.value}
            onClick={() => setActiveFilter(filter.value)}
            className={`px-4 py-2 font-bold border-2 border-border transition-all ${
              activeFilter === filter.value
                ? "bg-primary text-white shadow-none translate-x-[2px] translate-y-[2px]"
                : "bg-white hover:bg-gray-50 shadow-[3px_3px_0px_0px_#a8a6ff]"
            }`}
          >
            {filter.label}
            <span className="ml-2 px-2 py-0.5 bg-black/10 text-xs rounded-full">
              {getStatusCount(filter.value)}
            </span>
          </button>
        ))}
      </div>

      {/* Posts Grid */}
      {filteredPosts.length === 0 ? (
        <div className="text-center py-16 bg-white border-4 border-border shadow-neo">
          <div className="text-6xl mb-4">📝</div>
          <h3 className="text-2xl font-bold mb-2">No posts yet</h3>
          <p className="text-gray-600 mb-6">
            {activeFilter === "all"
              ? "Start writing your first blog post!"
              : `You don't have any ${activeFilter} posts.`}
          </p>
          <Link href="/teacher/blog/create">
            <Button className="font-bold border-2 border-border shadow-[4px_4px_0px_0px_#a8a6ff]">
              Create Your First Post
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredPosts.map((post) => (
            <BlogPostCard
              key={post.id}
              post={post}
              basePath="/teacher/blog"
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
