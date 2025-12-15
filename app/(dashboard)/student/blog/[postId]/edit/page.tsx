"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { BlogPostForm } from "@/components/blog";
import {
  selectAllPosts,
  selectCategories,
  updatePost,
  deletePost,
} from "@/lib/features/blog/blogSlice";
import Link from "next/link";

// Mock current user
const currentUser = {
  id: "student-1",
  name: "Sarah Lee",
  email: "sarah@example.com",
  role: "student" as const,
};

interface PageProps {
  params: Promise<{ postId: string }>;
}

export default function EditBlogPostPage({ params }: PageProps) {
  const { postId } = use(params);
  const router = useRouter();
  const dispatch = useDispatch();
  const allPosts = useSelector(selectAllPosts);
  const categories = useSelector(selectCategories);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const post = allPosts.find((p) => p.id === postId);

  if (!post) {
    return (
      <div className="text-center py-16">
        <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
        <p className="text-gray-600 mb-6">
          The blog post you're looking for doesn't exist.
        </p>
        <Link href="/student/blog">
          <Button className="font-bold border-2 border-border shadow-[4px_4px_0px_0px_#a8a6ff]">
            Back to My Blog
          </Button>
        </Link>
      </div>
    );
  }

  const handleSave = (data: any, submitForReview: boolean) => {
    setIsSubmitting(true);

    dispatch(
      updatePost({
        id: postId,
        ...data,
        status: submitForReview ? "pending" : post.status,
      })
    );

    setTimeout(() => {
      router.push("/student/blog");
    }, 500);
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this post? This action cannot be undone.")) {
      dispatch(deletePost(postId));
      router.push("/student/blog");
    }
  };

  return (
    <BlogPostForm
      initialData={post}
      categories={categories}
      currentUser={currentUser}
      onSave={handleSave}
      onDelete={handleDelete}
      isSubmitting={isSubmitting}
      backLink="/student/blog"
      pageTitle="Edit Post"
      pageSubtitle="Make changes to your blog post"
    />
  );
}
