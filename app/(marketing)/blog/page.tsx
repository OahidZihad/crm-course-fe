"use client";

import { useSelector } from "react-redux";
import Link from "next/link";
import { BlogPostCard } from "@/components/blog";
import { selectApprovedPosts, selectCategories } from "@/lib/features/blog/blogSlice";
import { useState } from "react";
import { Search, Filter, Tag, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function PublicBlogPage() {
  const approvedPosts = useSelector(selectApprovedPosts);
  const categories = useSelector(selectCategories);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSubcategory, setSelectedSubcategory] = useState("all");

  const currentCategory = categories.find((c) => c.id === selectedCategory);
  const subcategories = currentCategory?.subcategories || [];

  // Filter posts
  const filteredPosts = approvedPosts.filter((post) => {
    if (selectedCategory !== "all" && post.category.id !== selectedCategory) return false;
    if (selectedSubcategory !== "all" && post.subcategory?.id !== selectedSubcategory) return false;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.author.name.toLowerCase().includes(query)
      );
    }
    return true;
  });

  // Featured posts (latest 2)
  const featuredPosts = filteredPosts.slice(0, 2);
  const remainingPosts = filteredPosts.slice(2);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedSubcategory("all");
  };

  const hasFilters = searchQuery || selectedCategory !== "all" || selectedSubcategory !== "all";

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-16 px-4 md:px-8 bg-primary/10 border-b-4 border-border">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold uppercase mb-4">
            Community Blog
          </h1>
          <p className="text-xl text-gray-600 font-bold max-w-2xl mx-auto">
            Learn from the experiences and insights of our teachers and students.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 md:px-8 py-12">
        {/* Search and Filters */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row gap-4 p-6 bg-white border-4 border-border shadow-neo">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search articles..."
                  className="w-full pl-12 pr-4 py-4 border-2 border-border font-bold text-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            {/* Category Filter */}
            <Select value={selectedCategory} onValueChange={(v) => {
              setSelectedCategory(v);
              setSelectedSubcategory("all");
            }}>
              <SelectTrigger className="w-full lg:w-[200px] border-2 border-border shadow-[4px_4px_0px_0px_#a8a6ff] rounded-none h-14 font-bold">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent className="border-2 border-border shadow-[4px_4px_0px_0px_#a8a6ff] rounded-none">
                <SelectItem value="all" className="font-bold">All Categories</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id} className="font-bold">
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Subcategory Filter */}
            <Select 
              value={selectedSubcategory} 
              onValueChange={setSelectedSubcategory}
              disabled={subcategories.length === 0}
            >
              <SelectTrigger className="w-full lg:w-[200px] border-2 border-border shadow-[4px_4px_0px_0px_#a8a6ff] rounded-none h-14 font-bold disabled:opacity-50">
                <SelectValue placeholder="Subcategory" />
              </SelectTrigger>
              <SelectContent className="border-2 border-border shadow-[4px_4px_0px_0px_#a8a6ff] rounded-none">
                <SelectItem value="all" className="font-bold">All</SelectItem>
                {subcategories.map((sub) => (
                  <SelectItem key={sub.id} value={sub.id} className="font-bold">
                    {sub.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {hasFilters && (
              <Button
                variant="outline"
                onClick={clearFilters}
                className="border-2 border-border shadow-[4px_4px_0px_0px_#a8a6ff] h-14 font-bold"
              >
                <X className="mr-2 h-4 w-4" />
                Clear
              </Button>
            )}
          </div>
        </div>

        {/* No Results */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-16 bg-white border-4 border-border shadow-neo">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold mb-2">No articles found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search or filters.
            </p>
            <Button onClick={clearFilters} className="font-bold border-2 border-border shadow-[4px_4px_0px_0px_#a8a6ff]">
              Clear Filters
            </Button>
          </div>
        )}

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold uppercase mb-6 border-b-4 border-primary pb-2 inline-block">
              Featured Articles
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredPosts.map((post) => (
                <BlogPostCard
                  key={post.id}
                  post={post}
                  basePath="/blog"
                  showActions={false}
                />
              ))}
            </div>
          </section>
        )}

        {/* All Posts */}
        {remainingPosts.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold uppercase mb-6 border-b-4 border-primary pb-2 inline-block">
              More Articles
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {remainingPosts.map((post) => (
                <BlogPostCard
                  key={post.id}
                  post={post}
                  basePath="/blog"
                  showActions={false}
                />
              ))}
            </div>
          </section>
        )}

        {/* Category Cloud */}
        <section className="mt-16 p-8 bg-white border-4 border-border shadow-neo">
          <h3 className="text-xl font-bold uppercase mb-4">Browse by Category</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  setSelectedCategory(category.id);
                  setSelectedSubcategory("all");
                }}
                className={`px-4 py-2 font-bold border-2 border-border transition-all ${
                  selectedCategory === category.id
                    ? "bg-primary text-white"
                    : "bg-white hover:bg-primary/20 shadow-[3px_3px_0px_0px_#a8a6ff]"
                }`}
              >
                <Tag className="inline-block w-4 h-4 mr-1" />
                {category.name}
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
