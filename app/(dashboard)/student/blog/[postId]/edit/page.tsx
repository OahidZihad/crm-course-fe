"use client";

import { use, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { RichTextEditor, CategorySelector, BlogPreview } from "@/components/blog";
import {
  selectAllPosts,
  selectCategories,
  updatePost,
  deletePost,
} from "@/lib/features/blog/blogSlice";
import { BlogPost } from "@/lib/features/blog/types";
import {
  ArrowLeft,
  Save,
  Send,
  Eye,
  EyeOff,
  Trash,
  Image as ImageIcon,
  Loader2,
} from "lucide-react";
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

  const post = allPosts.find((p) => p.id === postId);

  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [featuredImage, setFeaturedImage] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [subcategoryId, setSubcategoryId] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form with post data
  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setExcerpt(post.excerpt);
      setContent(post.content);
      setFeaturedImage(post.featuredImage || "");
      setCategoryId(post.category.id);
      setSubcategoryId(post.subcategory?.id || "");
    }
  }, [post]);

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

  const isOwner = post.author.id === currentUser.id;

  if (!isOwner) {
    return (
      <div className="text-center py-16">
        <h1 className="text-4xl font-bold mb-4">Access Denied</h1>
        <p className="text-gray-600 mb-6">You can only edit your own posts.</p>
        <Link href="/student/blog">
          <Button className="font-bold border-2 border-border shadow-[4px_4px_0px_0px_#a8a6ff]">
            Back to My Blog
          </Button>
        </Link>
      </div>
    );
  }

  const selectedCategory = categories.find((c) => c.id === categoryId);
  const selectedSubcategory = selectedCategory?.subcategories.find(
    (s) => s.id === subcategoryId
  );

  // Create a preview post object
  const previewPost: BlogPost = {
    ...post,
    title: title || "Untitled Post",
    excerpt: excerpt || "No excerpt provided",
    content: content || "<p>Start writing your content...</p>",
    featuredImage: featuredImage || undefined,
    category: selectedCategory || categories[0],
    subcategory: selectedSubcategory,
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

    setIsSubmitting(true);

    dispatch(
      updatePost({
        id: postId,
        title,
        excerpt: excerpt || title.substring(0, 150) + "...",
        content,
        featuredImage: featuredImage || undefined,
        categoryId,
        subcategoryId: subcategoryId || undefined,
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
              Save Changes
            </Button>
            {post.status === "draft" && (
              <Button
                onClick={() => handleSave(true)}
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
          <Link href="/student/blog">
            <Button
              variant="outline"
              size="icon"
              className="border-2 border-border shadow-[4px_4px_0px_0px_#a8a6ff]"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold uppercase">Edit Post</h1>
            <p className="text-gray-600 font-bold">
              Make changes to your blog post
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
          <Button
            variant="outline"
            onClick={handleDelete}
            className="font-bold border-2 border-border shadow-[4px_4px_0px_0px_#a8a6ff] text-destructive hover:bg-destructive hover:text-white"
          >
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>

      {/* Status Banner */}
      {post.status === "rejected" && post.rejectionReason && (
        <div className="p-4 bg-red-100 border-4 border-red-400 font-bold">
          <p className="text-red-700">
            ❌ This post was rejected. Please address the feedback and resubmit.
          </p>
          <p className="mt-2 text-sm">
            <strong>Reason:</strong> {post.rejectionReason}
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
            className="w-full border-4 border-border p-4 text-2xl font-bold focus:outline-none focus:ring-2 focus:ring-primary shadow-[4px_4px_0px_0px_#a8a6ff]"
          />
        </div>

        {/* Featured Image */}
        <div>
          <label className="block text-sm font-bold mb-2 uppercase">
            Featured Image URL
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={featuredImage}
              onChange={(e) => setFeaturedImage(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="flex-1 border-2 border-border p-3 font-bold focus:outline-none focus:ring-2 focus:ring-primary shadow-[4px_4px_0px_0px_#a8a6ff]"
            />
            <Button
              variant="outline"
              className="border-2 border-border shadow-[4px_4px_0px_0px_#a8a6ff]"
            >
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
                  (e.target as HTMLImageElement).src =
                    "https://via.placeholder.com/800x400?text=Invalid+Image+URL";
                }}
              />
            </div>
          )}
        </div>

        {/* Category Selector */}
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

        {/* Excerpt */}
        <div>
          <label className="block text-sm font-bold mb-2 uppercase">
            Excerpt (Short Description)
          </label>
          <textarea
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            placeholder="Write a brief summary of your post"
            rows={3}
            className="w-full border-2 border-border p-3 font-medium focus:outline-none focus:ring-2 focus:ring-primary shadow-[4px_4px_0px_0px_#a8a6ff] resize-none"
          />
        </div>

        {/* Content Editor */}
        <div>
          <label className="block text-sm font-bold mb-2 uppercase">
            Content *
          </label>
          <RichTextEditor
            content={content}
            onChange={setContent}
            placeholder="Start writing your blog post content here..."
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t-4 border-border">
          <Button
            variant="outline"
            onClick={() => handleSave(false)}
            disabled={isSubmitting}
            className="flex-1 h-14 text-lg font-bold border-2 border-border shadow-[4px_4px_0px_0px_#a8a6ff] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#a8a6ff] transition-all"
          >
            <Save className="mr-2 h-5 w-5" />
            Save Changes
          </Button>
          {(post.status === "draft" || post.status === "rejected") && (
            <Button
              onClick={() => handleSave(true)}
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
