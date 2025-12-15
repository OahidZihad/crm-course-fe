"use client";

import Link from "next/link";
import { BlogPost } from "@/lib/features/blog/types";
import { Button } from "@/components/ui/button";
import { MoreVertical, Pencil, Trash, Eye, Calendar, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface BlogPostCardProps {
  post: BlogPost;
  basePath: string; // e.g., "/student/blog" or "/teacher/blog"
  onDelete?: (id: string) => void;
  showActions?: boolean;
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

export function BlogPostCard({
  post,
  basePath,
  onDelete,
  showActions = true,
}: BlogPostCardProps) {
  const formattedDate = new Date(post.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="group relative border-4 border-border bg-white shadow-[8px_8px_0px_0px_#a8a6ff] hover:translate-y-[-2px] transition-transform">
      {/* Status Badge */}
      <div className="absolute top-4 left-4 z-10">
        <span
          className={`px-2 py-1 border-2 border-border font-bold text-xs uppercase ${
            statusColors[post.status]
          }`}
        >
          {statusLabels[post.status]}
        </span>
      </div>

      {/* Featured Image */}
      <div className="aspect-video bg-gray-100 border-b-4 border-border relative overflow-hidden">
        {post.featuredImage ? (
          <img
            src={post.featuredImage}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-bold uppercase tracking-widest bg-gradient-to-br from-primary/20 to-primary/5">
            <span className="text-2xl">📝</span>
          </div>
        )}
      </div>

      <div className="p-6">
        {/* Header with title and actions */}
        <div className="flex justify-between items-start mb-3">
          <Link
            href={`${basePath}/${post.id}`}
            className="group-hover:text-primary transition-colors"
          >
            <h3 className="text-xl font-bold leading-tight line-clamp-2">
              {post.title}
            </h3>
          </Link>
          {showActions && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="h-8 w-8 p-0 border-2 border-transparent hover:border-border rounded-none flex-shrink-0"
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="border-2 border-border shadow-[4px_4px_0px_0px_#a8a6ff] rounded-none"
              >
                <DropdownMenuItem asChild>
                  <Link
                    href={`${basePath}/${post.id}`}
                    className="font-bold cursor-pointer focus:bg-primary focus:text-black"
                  >
                    <Eye className="mr-2 h-4 w-4" /> View
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    href={`${basePath}/${post.id}/edit`}
                    className="font-bold cursor-pointer focus:bg-primary focus:text-black"
                  >
                    <Pencil className="mr-2 h-4 w-4" /> Edit
                  </Link>
                </DropdownMenuItem>
                {onDelete && (
                  <DropdownMenuItem
                    onClick={() => onDelete(post.id)}
                    className="font-bold cursor-pointer focus:bg-destructive focus:text-white text-destructive"
                  >
                    <Trash className="mr-2 h-4 w-4" /> Delete
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        {/* Excerpt */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{post.excerpt}</p>

        {/* Category Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="px-2 py-1 bg-primary/20 border border-primary text-xs font-bold">
            {post.category.name}
          </span>
          {post.subcategory && (
            <span className="px-2 py-1 bg-gray-100 border border-gray-300 text-xs font-bold">
              {post.subcategory.name}
            </span>
          )}
        </div>

        {/* Meta Info */}
        <div className="flex justify-between items-center text-sm font-bold text-gray-500 pt-4 border-t-2 border-gray-100">
          <div className="flex items-center gap-1">
            <User className="w-4 h-4" />
            <span>{post.author.name}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{formattedDate}</span>
          </div>
        </div>

        {/* View Count (if published) */}
        {post.status === "approved" && post.viewCount > 0 && (
          <div className="mt-3 text-xs text-gray-400 font-bold">
            {post.viewCount.toLocaleString()} views
          </div>
        )}

        {/* Rejection Reason */}
        {post.status === "rejected" && post.rejectionReason && (
          <div className="mt-3 p-2 bg-red-50 border-2 border-red-200 text-sm text-red-700">
            <strong>Rejection reason:</strong> {post.rejectionReason}
          </div>
        )}
      </div>
    </div>
  );
}

export default BlogPostCard;
