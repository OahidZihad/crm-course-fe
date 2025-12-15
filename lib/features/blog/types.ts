// Blog Post Types

export type BlogStatus = 'draft' | 'pending' | 'approved' | 'rejected';

export interface Author {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'student' | 'teacher';
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  subcategories: BlogSubcategory[];
}

export interface BlogSubcategory {
  id: string;
  name: string;
  slug: string;
  parentId: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string; // HTML content from Tiptap
  featuredImage?: string;
  author: Author;
  category: BlogCategory;
  subcategory?: BlogSubcategory;
  status: BlogStatus;
  rejectionReason?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  viewCount: number;
}

export interface BlogFilterState {
  status: BlogStatus | 'all';
  categoryId: string | 'all';
  subcategoryId: string | 'all';
  authorId: string | 'all';
  searchQuery: string;
}

export interface CreateBlogPostInput {
  title: string;
  content: string;
  excerpt: string;
  featuredImage?: string;
  categoryId: string;
  subcategoryId?: string;
  status: 'draft' | 'pending';
}

export interface UpdateBlogPostInput extends Omit<Partial<CreateBlogPostInput>, 'status'> {
  id: string;
  status?: BlogStatus;
}
