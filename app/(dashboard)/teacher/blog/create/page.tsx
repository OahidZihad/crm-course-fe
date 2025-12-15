"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { RichTextEditor, CategorySelector, BlogPreview } from "@/components/blog";
import { createPost, selectCategories } from "@/lib/features/blog/blogSlice";
import { BlogPost } from "@/lib/features/blog/types";
import { ArrowLeft, Save, Send, Eye, EyeOff, Image as ImageIcon, Loader2 } from "lucide-react";
import Link from "next/link";

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

  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [featuredImage, setFeaturedImage] = useState("");
  const [categoryId, setCategoryId] = useState(categories[0]?.id || "");
  const [subcategoryId, setSubcategoryId] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedCategory = categories.find((c) => c.id === categoryId);
  const selectedSubcategory = selectedCategory?.subcategories.find(
    (s) => s.id === subcategoryId
  );

  const previewPost: BlogPost = {
    id: "preview",
    title: title || "Untitled Post",
    slug: "preview",
    excerpt: excerpt || "No excerpt provided",
    content: content || "<p>Start writing your content...</p>",
    featuredImage: featuredImage || undefined,
    author: currentUser,
    category: selectedCategory || categories[0],
    subcategory: selectedSubcategory,
    status: "draft",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    viewCount: 0,
  };

  const handleSave = (submitForReview: boolean) => {
    if (!title.trim()) {
      alert("Please enter a title for your post");
      return;
    }

    if (!content.trim() || content === "<p></p>") {
      alert("Please add some content to your post");
      return;
    }

    if (!categoryId) {
      alert("Please select a category");
      return;
    }

    setIsSubmitting(true);

    dispatch(
      createPost({
        title,
        excerpt: excerpt || title.substring(0, 150) + "...",
        content,
        featuredImage: featuredImage || undefined,
        categoryId,
        subcategoryId: subcategoryId || undefined,
        status: submitForReview ? "pending" : "draft",
        author: currentUser,
      })
    );

    setTimeout(() => {
      router.push("/teacher/blog");
    }, 500);
  };

  if (showPreview) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={() => setShowPreview(false)}
            className="font-bold border-2 border-border shadow-[4px_4px_0px_0px_#a8a6ff]"
          >
            <EyeOff className="mr-2 h-4 w-4" />
            Exit Preview
          </Button>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => handleSave(false)}
              disabled={isSubmitting}
              className="font-bold border-2 border-border shadow-[4px_4px_0px_0px_#a8a6ff]"
            >
              <Save className="mr-2 h-4 w-4" />
              Save Draft
            </Button>
            <Button
              onClick={() => handleSave(true)}
              disabled={isSubmitting}
              className="font-bold border-2 border-border bg-green-500 hover:bg-green-600 text-white shadow-[4px_4px_0px_0px_#a8a6ff]"
            >
              <Send className="mr-2 h-4 w-4" />
              Submit for Review
            </Button>
          </div>
        </div>
        <BlogPreview post={previewPost} />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/teacher/blog">
            <Button
              variant="outline"
              size="icon"
              className="border-2 border-border shadow-[4px_4px_0px_0px_#a8a6ff]"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold uppercase">Create New Post</h1>
            <p className="text-gray-600 font-bold">
              Share your expertise with students
            </p>
          </div>
        </div>
        <Button
          variant="outline"
          onClick={() => setShowPreview(true)}
          className="font-bold border-2 border-border shadow-[4px_4px_0px_0px_#a8a6ff]"
        >
          <Eye className="mr-2 h-4 w-4" />
          Preview
        </Button>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-bold mb-2 uppercase">Title *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter an engaging title..."
            className="w-full border-4 border-border p-4 text-2xl font-bold focus:outline-none focus:ring-2 focus:ring-primary shadow-[4px_4px_0px_0px_#a8a6ff]"
          />
        </div>

        <div>
          <label className="block text-sm font-bold mb-2 uppercase">Featured Image URL</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={featuredImage}
              onChange={(e) => setFeaturedImage(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="flex-1 border-2 border-border p-3 font-bold focus:outline-none focus:ring-2 focus:ring-primary shadow-[4px_4px_0px_0px_#a8a6ff]"
            />
            <Button variant="outline" className="border-2 border-border shadow-[4px_4px_0px_0px_#a8a6ff]">
              <ImageIcon className="h-5 w-5" />
            </Button>
          </div>
          {featuredImage && (
            <div className="mt-4 border-2 border-border overflow-hidden max-w-md">
              <img
                src={featuredImage}
                alt="Featured preview"
                className="w-full h-48 object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://via.placeholder.com/800x400?text=Invalid+Image+URL";
                }}
              />
            </div>
          )}
        </div>

        <CategorySelector
          categories={categories}
          selectedCategoryId={categoryId}
          selectedSubcategoryId={subcategoryId}
          onCategoryChange={(id) => {
            setCategoryId(id);
            setSubcategoryId("");
          }}
          onSubcategoryChange={setSubcategoryId}
        />

        <div>
          <label className="block text-sm font-bold mb-2 uppercase">Excerpt</label>
          <textarea
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            placeholder="Write a brief summary of your post"
            rows={3}
            className="w-full border-2 border-border p-3 font-medium focus:outline-none focus:ring-2 focus:ring-primary shadow-[4px_4px_0px_0px_#a8a6ff] resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-bold mb-2 uppercase">Content *</label>
          <RichTextEditor content={content} onChange={setContent} placeholder="Share your knowledge..." />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t-4 border-border">
          <Button
            variant="outline"
            onClick={() => handleSave(false)}
            disabled={isSubmitting}
            className="flex-1 h-14 text-lg font-bold border-2 border-border shadow-[4px_4px_0px_0px_#a8a6ff] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#a8a6ff] transition-all"
          >
            <Save className="mr-2 h-5 w-5" />
            Save as Draft
          </Button>
          <Button
            onClick={() => handleSave(true)}
            disabled={isSubmitting}
            className="flex-1 h-14 text-lg font-bold border-2 border-border bg-green-500 hover:bg-green-600 text-white shadow-[4px_4px_0px_0px_#a8a6ff] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#a8a6ff] transition-all"
          >
            <Send className="mr-2 h-5 w-5" />
            Submit for Review
          </Button>
        </div>
      </div>
    </div>
  );
}
