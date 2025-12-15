"use client";

import { BlogPost } from "@/lib/features/blog/types";
import { Calendar, User, Eye, Tag } from "lucide-react";

interface BlogPreviewProps {
  post: BlogPost;
  showAuthor?: boolean;
}

export function BlogPreview({ post, showAuthor = true }: BlogPreviewProps) {
  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : new Date(post.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

  return (
    <article className="bg-white border-4 border-border shadow-neo-lg">
      {/* Featured Image */}
      {post.featuredImage && (
        <div className="aspect-video border-b-4 border-border overflow-hidden">
          <img
            src={post.featuredImage}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="p-6 md:p-10">
        {/* Category Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          <span className="px-3 py-1 bg-primary/20 border-2 border-primary text-sm font-bold flex items-center gap-1">
            <Tag className="w-3 h-3" />
            {post.category.name}
          </span>
          {post.subcategory && (
            <span className="px-3 py-1 bg-gray-100 border-2 border-gray-300 text-sm font-bold">
              {post.subcategory.name}
            </span>
          )}
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight border-b-4 border-primary pb-4">
          {post.title}
        </h1>

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-6 mb-8 text-gray-600 font-bold">
          {showAuthor && (
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary/30 border-2 border-border flex items-center justify-center font-bold text-lg">
                {post.author.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-sm text-black">{post.author.name}</p>
                <p className="text-xs capitalize text-gray-400">
                  {post.author.role}
                </p>
              </div>
            </div>
          )}
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span className="text-sm">{formattedDate}</span>
          </div>
          {post.status === "approved" && (
            <div className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              <span className="text-sm">{post.viewCount.toLocaleString()} views</span>
            </div>
          )}
        </div>

        {/* Excerpt */}
        <p className="text-lg text-gray-600 mb-8 border-l-4 border-primary pl-4 italic">
          {post.excerpt}
        </p>

        {/* Content */}
        {post.content && post.content !== "<p></p>" ? (
          <div
            className="blog-content prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        ) : (
          <div className="p-8 text-center border-2 border-dashed border-gray-300 rounded text-gray-500 italic">
            No content to preview yet. Start writing in the editor!
          </div>
        )}
      </div>

      <style jsx global>{`
        .blog-content h1 {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 1rem;
          margin-top: 2rem;
          border-bottom: 4px solid #a8a6ff;
          padding-bottom: 0.5rem;
        }
        .blog-content h2 {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 0.75rem;
          margin-top: 1.5rem;
        }
        .blog-content h3 {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          margin-top: 1.25rem;
        }
        .blog-content h4 {
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          margin-top: 1rem;
        }
        .blog-content p {
          margin-bottom: 1rem;
          line-height: 1.8;
        }
        .blog-content ul,
        .blog-content ol {
          padding-left: 1.5rem;
          margin-bottom: 1rem;
        }
        .blog-content li {
          margin-bottom: 0.5rem;
          line-height: 1.7;
        }
        .blog-content blockquote {
          border-left: 4px solid #a8a6ff;
          padding-left: 1rem;
          margin: 1.5rem 0;
          font-style: italic;
          background: rgba(168, 166, 255, 0.1);
          padding: 1rem;
        }
        .blog-content pre {
          background: #1e1e1e;
          color: #d4d4d4;
          padding: 1rem;
          border: 2px solid #000;
          overflow-x: auto;
          margin: 1.5rem 0;
          border-radius: 0;
        }
        .blog-content code {
          background: rgba(168, 166, 255, 0.2);
          padding: 0.2rem 0.4rem;
          border: 1px solid #a8a6ff;
          font-family: monospace;
        }
        .blog-content pre code {
          background: none;
          border: none;
          padding: 0;
        }
        .blog-content table {
          border-collapse: collapse;
          width: 100%;
          margin: 1.5rem 0;
          border: 2px solid #000;
        }
        .blog-content td,
        .blog-content th {
          border: 2px solid #000;
          padding: 0.75rem;
        }
        .blog-content th {
          background: rgba(168, 166, 255, 0.3);
          font-weight: 700;
        }
        .blog-content img {
          max-width: 100%;
          height: auto;
          border: 2px solid #000;
          margin: 1.5rem 0;
        }
        .blog-content iframe {
          width: 100%;
          aspect-ratio: 16/9;
          border: 2px solid #000;
          margin: 1.5rem 0;
        }
        .blog-content a {
          color: #a8a6ff;
          font-weight: 700;
          text-decoration: underline;
        }
        .blog-content a:hover {
          color: #8c8ae6;
        }
      `}</style>
    </article>
  );
}

export default BlogPreview;
