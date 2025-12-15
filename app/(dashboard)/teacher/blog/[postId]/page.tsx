"use client";

import { use } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BlogPreview } from "@/components/blog";
import { selectAllPosts } from "@/lib/features/blog/blogSlice";
import { ArrowLeft, Pencil } from "lucide-react";

const currentUser = {
  id: "teacher-1",
  name: "John Smith",
  email: "john@example.com",
  role: "teacher" as const,
};

interface PageProps {
  params: Promise<{ postId: string }>;
}

export default function TeacherBlogPostPage({ params }: PageProps) {
  const { postId } = use(params);
  const allPosts = useSelector(selectAllPosts);
  const post = allPosts.find((p) => p.id === postId);

  if (!post) {
    return (
      <div className="text-center py-16">
        <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
        <p className="text-gray-600 mb-6">The blog post you're looking for doesn't exist.</p>
        <Link href="/teacher/blog">
          <Button className="font-bold border-2 border-border shadow-[4px_4px_0px_0px_#a8a6ff]">
            Back to My Blog
          </Button>
        </Link>
      </div>
    );
  }

  const isOwner = post.author.id === currentUser.id;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Link href="/teacher/blog">
          <Button variant="outline" className="font-bold border-2 border-border shadow-[4px_4px_0px_0px_#a8a6ff]">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to My Blog
          </Button>
        </Link>
        {isOwner && (
          <Link href={`/teacher/blog/${postId}/edit`}>
            <Button variant="outline" className="font-bold border-2 border-border shadow-[4px_4px_0px_0px_#a8a6ff]">
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </Button>
          </Link>
        )}
      </div>

      {post.status !== "approved" && (
        <div className={`p-4 border-4 border-border font-bold ${
          post.status === "draft" ? "bg-gray-100" :
          post.status === "pending" ? "bg-yellow-100" : "bg-red-100"
        }`}>
          {post.status === "draft" && <p>📝 This is a draft. Submit it for review when ready.</p>}
          {post.status === "pending" && <p>⏳ This post is pending review.</p>}
          {post.status === "rejected" && (
            <div>
              <p className="text-red-700">❌ This post was rejected.</p>
              {post.rejectionReason && <p className="mt-2 text-sm"><strong>Reason:</strong> {post.rejectionReason}</p>}
            </div>
          )}
        </div>
      )}

      <BlogPreview post={post} />
    </div>
  );
}
