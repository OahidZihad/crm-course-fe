"use client";

import { use, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BlogPreview } from "@/components/blog";
import { selectAllPosts, incrementViewCount } from "@/lib/features/blog/blogSlice";
import { ArrowLeft, Share2, Copy, Twitter, Facebook, Linkedin } from "lucide-react";
import { useState } from "react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function PublicBlogPostPage({ params }: PageProps) {
  const { slug } = use(params);
  const dispatch = useDispatch();
  const allPosts = useSelector(selectAllPosts);

  // Find post by ID or slug
  const post = allPosts.find(
    (p) => (p.id === slug || p.slug === slug) && p.status === "approved"
  );

  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);

  // Increment view count on mount
  useEffect(() => {
    if (post) {
      dispatch(incrementViewCount(post.id));
    }
  }, [post?.id, dispatch]);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center py-16">
          <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
          <p className="text-gray-600 mb-6">
            The article you're looking for doesn't exist or hasn't been published yet.
          </p>
          <Link href="/blog">
            <Button className="font-bold border-2 border-border shadow-[4px_4px_0px_0px_#a8a6ff]">
              Browse All Articles
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const postUrl = typeof window !== "undefined" ? window.location.href : "";

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(postUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(postUrl)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`,
  };

  // Get related posts (same category, different post)
  const relatedPosts = allPosts
    .filter((p) => p.id !== post.id && p.category.id === post.category.id && p.status === "approved")
    .slice(0, 3);

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-8">
        {/* Navigation */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/blog">
            <Button
              variant="outline"
              className="font-bold border-2 border-border shadow-[4px_4px_0px_0px_#a8a6ff]"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Button>
          </Link>
          
          {/* Share Button */}
          <div className="relative">
            <Button
              variant="outline"
              onClick={() => setShowShareMenu(!showShareMenu)}
              className="font-bold border-2 border-border shadow-[4px_4px_0px_0px_#a8a6ff]"
            >
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
            {showShareMenu && (
              <div className="absolute right-0 top-full mt-2 bg-white border-4 border-border shadow-neo p-4 z-50 min-w-[200px]">
                <button
                  onClick={handleCopyLink}
                  className="w-full flex items-center gap-2 px-3 py-2 font-bold hover:bg-primary/20 transition-colors"
                >
                  <Copy className="w-4 h-4" />
                  {copied ? "Copied!" : "Copy Link"}
                </button>
                <a
                  href={shareLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center gap-2 px-3 py-2 font-bold hover:bg-primary/20 transition-colors"
                >
                  <Twitter className="w-4 h-4" />
                  Twitter
                </a>
                <a
                  href={shareLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center gap-2 px-3 py-2 font-bold hover:bg-primary/20 transition-colors"
                >
                  <Facebook className="w-4 h-4" />
                  Facebook
                </a>
                <a
                  href={shareLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center gap-2 px-3 py-2 font-bold hover:bg-primary/20 transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Blog Content */}
        <BlogPreview post={post} />

        {/* Author Card */}
        <div className="mt-12 p-8 bg-white border-4 border-border shadow-neo">
          <h3 className="text-sm font-bold uppercase text-gray-500 mb-4">About the Author</h3>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-primary/30 border-4 border-border flex items-center justify-center font-bold text-2xl">
              {post.author.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-xl font-bold">{post.author.name}</p>
              <p className="text-gray-500 capitalize font-bold">{post.author.role}</p>
            </div>
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="mt-12">
            <h3 className="text-2xl font-bold uppercase mb-6 border-b-4 border-primary pb-2 inline-block">
              Related Articles
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  href={`/blog/${relatedPost.id}`}
                  className="group block bg-white border-4 border-border p-4 shadow-[4px_4px_0px_0px_#a8a6ff] hover:translate-y-[-2px] transition-transform"
                >
                  <h4 className="font-bold line-clamp-2 group-hover:text-primary transition-colors">
                    {relatedPost.title}
                  </h4>
                  <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                    {relatedPost.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
