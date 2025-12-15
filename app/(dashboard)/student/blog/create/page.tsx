"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { BlogPostForm } from "@/components/blog";
import { createPost, selectCategories } from "@/lib/features/blog/blogSlice";

// Mock current user
const currentUser = {
  id: "student-1",
  name: "Sarah Lee",
  email: "sarah@example.com",
  role: "student" as const,
};

export default function CreateBlogPostPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSave = (data: any, submitForReview: boolean) => {
    setIsSubmitting(true);
    
    dispatch(
      createPost({
        ...data,
        status: submitForReview ? "pending" : "draft",
        author: currentUser,
      })
    );

    // Redirect to blog listing
    setTimeout(() => {
      router.push("/student/blog");
    }, 500);
  };

  return (
    <BlogPostForm
      categories={categories}
      currentUser={currentUser}
      onSave={handleSave}
      isSubmitting={isSubmitting}
      backLink="/student/blog"
      pageTitle="Create New Post"
      pageSubtitle="Share your thoughts with the community"
    />
  );
}
