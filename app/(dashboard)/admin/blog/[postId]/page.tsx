"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BlogPreview } from "@/components/blog";
import { selectAllPosts, updatePostStatus } from "@/lib/features/blog/blogSlice";
import { ArrowLeft, Check, X, User, Calendar, Tag } from "lucide-react";

interface PageProps {
  params: Promise<{ postId: string }>;
}

const statusColors: Record<string, string> = {
  draft: "bg-gray-400",
  pending: "bg-yellow-400",
  approved: "bg-green-400",
  rejected: "bg-red-400",
};

const statusLabels: Record<string, string> = {
  draft: "Draft",
  pending: "Pending Review",
  approved: "Published",
  rejected: "Rejected",
};

export default function AdminBlogPostPage({ params }: PageProps) {
  const { postId } = use(params);
  const router = useRouter();
  const dispatch = useDispatch();
  const allPosts = useSelector(selectAllPosts);
  
  const [rejectionReason, setRejectionReason] = useState("");
  const [showRejectForm, setShowRejectForm] = useState(false);

  const post = allPosts.find((p) => p.id === postId);

  if (!post) {
    return (
      <div className="text-center py-16">
        <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
        <Link href="/admin/blog">
          <Button className="font-bold border-2 border-border shadow-[4px_4px_0px_0px_#a8a6ff]">
            Back to Moderation
          </Button>
        </Link>
      </div>
    );
  }

  const handleApprove = () => {
    dispatch(updatePostStatus({ id: postId, status: "approved" }));
    router.push("/admin/blog");
  };

  const handleReject = () => {
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
    router.push("/admin/blog");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/admin/blog">
            <Button
              variant="outline"
              size="icon"
              className="border-2 border-border shadow-[4px_4px_0px_0px_#a8a6ff]"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold uppercase">Review Post</h1>
            <p className="text-gray-600 font-bold">
              Review and take action on this blog post
            </p>
          </div>
        </div>
        
        {post.status === "pending" && (
          <div className="flex gap-2">
            <Button
              onClick={handleApprove}
              className="font-bold border-2 border-border bg-green-500 hover:bg-green-600 text-white shadow-[4px_4px_0px_0px_#a8a6ff]"
            >
              <Check className="mr-2 h-4 w-4" />
              Approve
            </Button>
            <Button
              onClick={() => setShowRejectForm(true)}
              className="font-bold border-2 border-border bg-red-500 hover:bg-red-600 text-white shadow-[4px_4px_0px_0px_#a8a6ff]"
            >
              <X className="mr-2 h-4 w-4" />
              Reject
            </Button>
          </div>
        )}
      </div>

      {/* Status Card */}
      <div className="bg-white border-4 border-border shadow-neo p-6">
        <div className="flex flex-wrap items-center gap-6">
          <div>
            <span className="text-sm font-bold text-gray-500 uppercase">Status</span>
            <div className="mt-1">
              <span
                className={`px-3 py-1 border-2 border-border font-bold text-sm uppercase ${
                  statusColors[post.status]
                }`}
              >
                {statusLabels[post.status]}
              </span>
            </div>
          </div>
          <div>
            <span className="text-sm font-bold text-gray-500 uppercase">Author</span>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-8 h-8 bg-primary/30 border-2 border-border flex items-center justify-center font-bold text-sm">
                {post.author.name.charAt(0)}
              </div>
              <div>
                <p className="font-bold">{post.author.name}</p>
                <p className="text-xs text-gray-500 capitalize">{post.author.role}</p>
              </div>
            </div>
          </div>
          <div>
            <span className="text-sm font-bold text-gray-500 uppercase">Category</span>
            <div className="mt-1">
              <span className="px-2 py-1 bg-primary/20 border border-primary text-sm font-bold">
                {post.category.name}
              </span>
            </div>
          </div>
          <div>
            <span className="text-sm font-bold text-gray-500 uppercase">Submitted</span>
            <p className="font-bold mt-1">
              {new Date(post.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>
      </div>

      {/* Rejection Form */}
      {showRejectForm && (
        <div className="bg-red-50 border-4 border-red-400 p-6">
          <h3 className="text-lg font-bold mb-4 text-red-700">Reject Post</h3>
          <p className="text-gray-600 mb-4">
            Please provide a reason for rejection. This will be visible to the author.
          </p>
          <textarea
            value={rejectionReason}
            onChange={(e) => setRejectionReason(e.target.value)}
            placeholder="Enter rejection reason..."
            rows={4}
            className="w-full border-2 border-border p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
          />
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setShowRejectForm(false);
                setRejectionReason("");
              }}
              className="border-2 border-border"
            >
              Cancel
            </Button>
            <Button
              onClick={handleReject}
              className="border-2 border-border bg-red-500 hover:bg-red-600 text-white"
            >
              Confirm Rejection
            </Button>
          </div>
        </div>
      )}

      {/* Previous Rejection Reason */}
      {post.status === "rejected" && post.rejectionReason && (
        <div className="bg-red-50 border-4 border-red-400 p-6">
          <h3 className="text-lg font-bold mb-2 text-red-700">Rejection Reason</h3>
          <p className="text-gray-700">{post.rejectionReason}</p>
        </div>
      )}

      {/* Blog Preview */}
      <BlogPreview post={post} />
    </div>
  );
}
