"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { RichTextEditor } from "./RichTextEditor";
import { CategorySelector } from "./CategorySelector";
import { BlogPreview } from "./BlogPreview";
import { BlogPost, BlogCategory } from "@/lib/features/blog/types";
import { ArrowLeft, Save, Send, Eye, EyeOff, Trash, Image as ImageIcon } from "lucide-react";
import Link from "next/link";

interface BlogPostFormProps {
  initialData?: BlogPost;
  categories: BlogCategory[];
  currentUser: {
    id: string;
    name: string;
    email: string;
    role: "student" | "teacher" | "admin";
  };
  onSave: (data: {
    title: string;
    excerpt: string;
    content: string;
    featuredImage: string;
    categoryId: string;
    subcategoryId: string;
  }, submitForReview: boolean) => void;
  onDelete?: () => void;
  isSubmitting: boolean;
  backLink: string;
  pageTitle: string;
  pageSubtitle: string;
}

export function BlogPostForm({
  initialData,
  categories,
  currentUser,
  onSave,
  onDelete,
  isSubmitting,
  backLink,
  pageTitle,
  pageSubtitle,
}: BlogPostFormProps) {
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [featuredImage, setFeaturedImage] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [subcategoryId, setSubcategoryId] = useState("");
  
  const [showPreview, setShowPreview] = useState(false);

  // Initialize form with initialData if provided
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setExcerpt(initialData.excerpt);
      setContent(initialData.content);
      setFeaturedImage(initialData.featuredImage || "");
      setCategoryId(initialData.category.id);
      setSubcategoryId(initialData.subcategory?.id || "");
    } else if (categories.length > 0 && !categoryId) {
      // Set default category for new posts
      setCategoryId(categories[0].id);
    }
  }, [initialData, categories]); // Removed categoryId dependency to prevent reset

  const selectedCategory = categories.find((c) => c.id === categoryId);
  const selectedSubcategory = selectedCategory?.subcategories.find(
    (s) => s.id === subcategoryId
  );

  const previewPost: BlogPost = {
    id: initialData?.id || "preview",
    title: title || "Untitled Post",
    slug: initialData?.slug || "preview",
    excerpt: excerpt || "No excerpt provided",
    content: content || "<p>Start writing your content...</p>",
    featuredImage: featuredImage || undefined,
    author: initialData?.author || (currentUser as unknown as BlogPost['author']), // Use current user for new posts
    category: selectedCategory || categories[0],
    subcategory: selectedSubcategory,
    status: initialData?.status || "draft",
    createdAt: initialData?.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    viewCount: initialData?.viewCount || 0,
    rejectionReason: initialData?.rejectionReason,
  };

  const handleSaveClick = (submitForReview: boolean) => {
    // Basic validation
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

    onSave({
      title,
      excerpt: excerpt || title.substring(0, 150) + "...",
      content,
      featuredImage,
      categoryId,
      subcategoryId,
    }, submitForReview);
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
              onClick={() => handleSaveClick(false)}
              disabled={isSubmitting}
              className="font-bold border-2 border-border shadow-[4px_4px_0px_0px_#a8a6ff]"
            >
              <Save className="mr-2 h-4 w-4" />
              {initialData ? "Save Changes" : "Save Draft"}
            </Button>
            {(!initialData || initialData.status === "draft" || initialData.status === "rejected") && (
              <Button
                onClick={() => handleSaveClick(true)}
                disabled={isSubmitting}
                className="font-bold border-2 border-border bg-green-500 hover:bg-green-600 text-white shadow-[4px_4px_0px_0px_#a8a6ff]"
              >
                <Send className="mr-2 h-4 w-4" />
                Submit for Review
              </Button>
            )}
          </div>
        </div>
        <BlogPreview post={previewPost} />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href={backLink}>
            <Button
              variant="outline"
              size="icon"
              className="border-2 border-border shadow-[4px_4px_0px_0px_#a8a6ff]"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold uppercase">{pageTitle}</h1>
            <p className="text-gray-600 font-bold">
              {pageSubtitle}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setShowPreview(true)}
            className="font-bold border-2 border-border shadow-[4px_4px_0px_0px_#a8a6ff]"
          >
            <Eye className="mr-2 h-4 w-4" />
            Preview
          </Button>
          {onDelete && initialData && (
             <Button
             variant="outline"
             onClick={onDelete}
             className="font-bold border-2 border-border shadow-[4px_4px_0px_0px_#a8a6ff] text-destructive hover:bg-destructive hover:text-white"
           >
             <Trash className="mr-2 h-4 w-4" />
             Delete
           </Button>
          )}
        </div>
      </div>

      {initialData?.status === "rejected" && initialData.rejectionReason && (
        <div className="p-4 bg-red-100 border-4 border-red-400 font-bold">
          <p className="text-red-700">
            ❌ This post was rejected. Please address the feedback and resubmit.
          </p>
          <p className="mt-2 text-sm">
            <strong>Reason:</strong> {initialData.rejectionReason}
          </p>
        </div>
      )}

      {/* Form */}
      <div className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-bold mb-2 uppercase">
            Title *
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter an engaging title..."
            className="w-full border-4 border-border p-3 text-xl font-bold focus:outline-none focus:ring-2 focus:ring-primary shadow-[4px_4px_0px_0px_#a8a6ff]"
          />
        </div>

        {/* Meta Row: Image + Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Featured Image */}
          <div className="md:col-span-1">
            <label className="block text-sm font-bold mb-2 uppercase">
              Featured Image URL
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={featuredImage}
                onChange={(e) => setFeaturedImage(e.target.value)}
                placeholder="https://..."
                className="flex-1 border-2 border-border p-2 font-bold focus:outline-none focus:ring-2 focus:ring-primary shadow-[4px_4px_0px_0px_#a8a6ff] h-12"
              />
            </div>
          </div>

          {/* Category Selector (Takes 1 cols as per new layout preference) */}
          <div className="md:col-span-1">
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
          </div>
        </div>
        
        {featuredImage && (
            <div className="border-2 border-border overflow-hidden max-w-xs">
              <img
                src={featuredImage}
                alt="Featured preview"
                className="w-full h-32 object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://via.placeholder.com/800x400?text=Invalid+Image+URL";
                }}
              />
            </div>
        )}

        {/* Excerpt */}
        <div>
          <label className="block text-sm font-bold mb-2 uppercase">
            Excerpt (Short Description)
          </label>
          <textarea
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            placeholder="Write a brief summary..."
            rows={2}
            className="w-full border-2 border-border p-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary shadow-[4px_4px_0px_0px_#a8a6ff] resize-none"
          />
        </div>

        {/* Content Editor */}
        <div className="flex-1 flex flex-col min-h-0">
          <label className="block text-sm font-bold mb-2 uppercase">
            Content *
          </label>
          <div className="flex-1">
            <RichTextEditor
              content={content}
              onChange={setContent}
              placeholder="Start writing your blog post content here..."
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t-4 border-border">
          <Button
            variant="outline"
            onClick={() => handleSaveClick(false)}
            disabled={isSubmitting}
            className="flex-1 h-14 text-lg font-bold border-2 border-border shadow-[4px_4px_0px_0px_#a8a6ff] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#a8a6ff] transition-all"
          >
            <Save className="mr-2 h-5 w-5" />
            {initialData ? "Save Changes" : "Save as Draft"}
          </Button>
          {(!initialData || initialData.status === "draft" || initialData.status === "rejected") && (
            <Button
              onClick={() => handleSaveClick(true)}
              disabled={isSubmitting}
              className="flex-1 h-14 text-lg font-bold border-2 border-border bg-green-500 hover:bg-green-600 text-white shadow-[4px_4px_0px_0px_#a8a6ff] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#a8a6ff] transition-all"
            >
              <Send className="mr-2 h-5 w-5" />
              Submit for Review
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
