"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { BlogPostForm } from "@/components/blog";
import { createPost, selectCategories } from "@/lib/features/blog/blogSlice";

// Mock current user
const currentUser = {
  id: "teacher-1",
  name: "John Smith",
  email: "john@example.com",
  role: "teacher" as const,
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

    setTimeout(() => {
      router.push("/teacher/blog");
    }, 500);
  };

  return (
    <BlogPostForm
      categories={categories}
      currentUser={currentUser}
      onSave={handleSave}
      isSubmitting={isSubmitting}
      backLink="/teacher/blog"
      pageTitle="Create New Post"
      pageSubtitle="Share your expertise with students"
    />
  );
}
