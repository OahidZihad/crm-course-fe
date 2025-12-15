import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { 
  BlogPost, 
  BlogCategory, 
  BlogFilterState, 
  BlogStatus,
  CreateBlogPostInput,
  UpdateBlogPostInput 
} from './types';

// Mock Categories
const mockCategories: BlogCategory[] = [
  {
    id: '1',
    name: 'Technology',
    slug: 'technology',
    subcategories: [
      { id: '1-1', name: 'Web Development', slug: 'web-development', parentId: '1' },
      { id: '1-2', name: 'Mobile Development', slug: 'mobile-development', parentId: '1' },
      { id: '1-3', name: 'AI & Machine Learning', slug: 'ai-ml', parentId: '1' },
    ]
  },
  {
    id: '2',
    name: 'Design',
    slug: 'design',
    subcategories: [
      { id: '2-1', name: 'UI/UX Design', slug: 'ui-ux', parentId: '2' },
      { id: '2-2', name: 'Graphic Design', slug: 'graphic-design', parentId: '2' },
    ]
  },
  {
    id: '3',
    name: 'Business',
    slug: 'business',
    subcategories: [
      { id: '3-1', name: 'Marketing', slug: 'marketing', parentId: '3' },
      { id: '3-2', name: 'Entrepreneurship', slug: 'entrepreneurship', parentId: '3' },
    ]
  },
  {
    id: '4',
    name: 'Education',
    slug: 'education',
    subcategories: [
      { id: '4-1', name: 'Teaching Tips', slug: 'teaching-tips', parentId: '4' },
      { id: '4-2', name: 'Learning Strategies', slug: 'learning-strategies', parentId: '4' },
    ]
  },
];

// Mock Blog Posts
const mockPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Getting Started with React 19: A Complete Guide',
    slug: 'getting-started-react-19',
    excerpt: 'Learn about the new features in React 19 and how to upgrade your projects.',
    content: '<h2>Introduction to React 19</h2><p>React 19 brings exciting new features...</p>',
    featuredImage: '/images/blog/react-19.jpg',
    author: {
      id: 'teacher-1',
      name: 'John Smith',
      email: 'john@example.com',
      role: 'teacher',
    },
    category: mockCategories[0],
    subcategory: mockCategories[0].subcategories[0],
    status: 'approved',
    createdAt: '2024-12-01T10:00:00Z',
    updatedAt: '2024-12-01T10:00:00Z',
    publishedAt: '2024-12-02T08:00:00Z',
    viewCount: 1250,
  },
  {
    id: '2',
    title: 'My Journey Learning TypeScript',
    slug: 'journey-learning-typescript',
    excerpt: 'How I went from zero to TypeScript proficiency in 3 months.',
    content: '<h2>Why TypeScript?</h2><p>As a student, I discovered TypeScript...</p>',
    author: {
      id: 'student-1',
      name: 'Sarah Lee',
      email: 'sarah@example.com',
      role: 'student',
    },
    category: mockCategories[0],
    subcategory: mockCategories[0].subcategories[0],
    status: 'pending',
    createdAt: '2024-12-10T14:30:00Z',
    updatedAt: '2024-12-10T14:30:00Z',
    viewCount: 0,
  },
  {
    id: '3',
    title: 'UI Design Principles for Developers',
    slug: 'ui-design-principles-developers',
    excerpt: 'Essential design principles every developer should know.',
    content: '<h2>Design Matters</h2><p>As a developer, understanding design...</p>',
    featuredImage: '/images/blog/ui-design.jpg',
    author: {
      id: 'teacher-2',
      name: 'Emily Chen',
      email: 'emily@example.com',
      role: 'teacher',
    },
    category: mockCategories[1],
    subcategory: mockCategories[1].subcategories[0],
    status: 'approved',
    createdAt: '2024-12-05T09:00:00Z',
    updatedAt: '2024-12-05T09:00:00Z',
    publishedAt: '2024-12-06T10:00:00Z',
    viewCount: 890,
  },
  {
    id: '4',
    title: 'Draft: Building a Blog System',
    slug: 'building-blog-system',
    excerpt: 'Step-by-step guide to building a modern blog system.',
    content: '<h2>Getting Started</h2><p>This is my draft...</p>',
    author: {
      id: 'student-1',
      name: 'Sarah Lee',
      email: 'sarah@example.com',
      role: 'student',
    },
    category: mockCategories[0],
    status: 'draft',
    createdAt: '2024-12-12T16:00:00Z',
    updatedAt: '2024-12-12T16:00:00Z',
    viewCount: 0,
  },
];

interface BlogState {
  posts: BlogPost[];
  categories: BlogCategory[];
  filters: BlogFilterState;
  currentPost: BlogPost | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: BlogState = {
  posts: mockPosts,
  categories: mockCategories,
  filters: {
    status: 'all',
    categoryId: 'all',
    subcategoryId: 'all',
    authorId: 'all',
    searchQuery: '',
  },
  currentPost: null,
  isLoading: false,
  error: null,
};

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    // Set filters
    setFilters: (state, action: PayloadAction<Partial<BlogFilterState>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },

    // Clear filters
    clearFilters: (state) => {
      state.filters = initialState.filters;
    },

    // Set current post
    setCurrentPost: (state, action: PayloadAction<BlogPost | null>) => {
      state.currentPost = action.payload;
    },

    // Create post
    createPost: (state, action: PayloadAction<CreateBlogPostInput & { author: BlogPost['author'] }>) => {
      const { categoryId, subcategoryId, author, ...rest } = action.payload;
      const category = state.categories.find(c => c.id === categoryId) || state.categories[0];
      const subcategory = subcategoryId 
        ? category.subcategories.find(s => s.id === subcategoryId) 
        : undefined;
      
      const newPost: BlogPost = {
        ...rest,
        id: `post-${Date.now()}`,
        slug: rest.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, ''),
        author,
        category,
        subcategory,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        viewCount: 0,
      };
      
      state.posts.unshift(newPost);
    },

    // Update post
    updatePost: (state, action: PayloadAction<UpdateBlogPostInput>) => {
      const { id, categoryId, subcategoryId, ...updates } = action.payload;
      const postIndex = state.posts.findIndex(p => p.id === id);
      
      if (postIndex !== -1) {
        const post = state.posts[postIndex];
        
        if (categoryId) {
          const category = state.categories.find(c => c.id === categoryId);
          if (category) post.category = category;
        }
        
        if (subcategoryId) {
          const subcategory = post.category.subcategories.find(s => s.id === subcategoryId);
          if (subcategory) post.subcategory = subcategory;
        }
        
        state.posts[postIndex] = {
          ...post,
          ...updates,
          updatedAt: new Date().toISOString(),
        };
      }
    },

    // Delete post
    deletePost: (state, action: PayloadAction<string>) => {
      state.posts = state.posts.filter(p => p.id !== action.payload);
    },

    // Update post status (for admin approval)
    updatePostStatus: (state, action: PayloadAction<{ id: string; status: BlogStatus; rejectionReason?: string }>) => {
      const post = state.posts.find(p => p.id === action.payload.id);
      if (post) {
        post.status = action.payload.status;
        post.updatedAt = new Date().toISOString();
        
        if (action.payload.status === 'approved') {
          post.publishedAt = new Date().toISOString();
        }
        
        if (action.payload.status === 'rejected' && action.payload.rejectionReason) {
          post.rejectionReason = action.payload.rejectionReason;
        }
      }
    },

    // Increment view count
    incrementViewCount: (state, action: PayloadAction<string>) => {
      const post = state.posts.find(p => p.id === action.payload);
      if (post) {
        post.viewCount += 1;
      }
    },
  },
});

export const {
  setFilters,
  clearFilters,
  setCurrentPost,
  createPost,
  updatePost,
  deletePost,
  updatePostStatus,
  incrementViewCount,
} = blogSlice.actions;

export default blogSlice.reducer;

// Selectors
export const selectAllPosts = (state: { blog: BlogState }) => state.blog.posts;
export const selectCategories = (state: { blog: BlogState }) => state.blog.categories;
export const selectFilters = (state: { blog: BlogState }) => state.blog.filters;
export const selectCurrentPost = (state: { blog: BlogState }) => state.blog.currentPost;

export const selectFilteredPosts = (state: { blog: BlogState }) => {
  const { posts, filters } = state.blog;
  
  return posts.filter(post => {
    if (filters.status !== 'all' && post.status !== filters.status) return false;
    if (filters.categoryId !== 'all' && post.category.id !== filters.categoryId) return false;
    if (filters.subcategoryId !== 'all' && post.subcategory?.id !== filters.subcategoryId) return false;
    if (filters.authorId !== 'all' && post.author.id !== filters.authorId) return false;
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      return (
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.author.name.toLowerCase().includes(query)
      );
    }
    return true;
  });
};

export const selectPostsByAuthor = (authorId: string) => (state: { blog: BlogState }) => {
  return state.blog.posts.filter(p => p.author.id === authorId);
};

export const selectApprovedPosts = (state: { blog: BlogState }) => {
  return state.blog.posts.filter(p => p.status === 'approved');
};

export const selectPendingPosts = (state: { blog: BlogState }) => {
  return state.blog.posts.filter(p => p.status === 'pending');
};
