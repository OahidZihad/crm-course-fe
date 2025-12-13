"use client";

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Lesson = {
  id: string;
  title: string;
  type: 'video' | 'article' | 'quiz';
  videoUrl?: string;
  articleContent?: string;
  questions?: any[]; 
};

export type Module = {
  id: string;
  title: string;
  lessons: Lesson[];
};

export type Course = {
  id: string;
  title: string;
  category: string;
  level: string;
  template: string;
  description: string;
  videoUrl: string;
  benefits: string[];
  modules: Module[];
  price: string;
  salePrice?: string;
  status: 'draft' | 'published';
  thumbnail?: string; // For course card
  createdAt: string;
  authorId: string; // "teacher-1" for now
};

interface CoursesState {
  courses: Course[];
}

// Load initial state from localStorage if available
const loadState = (): CoursesState => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('omz_courses');
    if (saved) {
      return { courses: JSON.parse(saved) };
    }
  }
  return { courses: [] };
};

const initialState: CoursesState = loadState();

const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    addCourse: (state, action: PayloadAction<Course>) => {
      state.courses.push(action.payload);
      if (typeof window !== 'undefined') {
        localStorage.setItem('omz_courses', JSON.stringify(state.courses));
      }
    },
    updateCourse: (state, action: PayloadAction<Course>) => {
      const index = state.courses.findIndex(c => c.id === action.payload.id);
      if (index !== -1) {
        state.courses[index] = action.payload;
        if (typeof window !== 'undefined') {
          localStorage.setItem('omz_courses', JSON.stringify(state.courses));
        }
      }
    },
    publishCourse: (state, action: PayloadAction<string>) => {
      const course = state.courses.find(c => c.id === action.payload);
      if (course) {
        course.status = 'published';
        if (typeof window !== 'undefined') {
          localStorage.setItem('omz_courses', JSON.stringify(state.courses));
        }
      }
    },
    deleteCourse: (state, action: PayloadAction<string>) => {
        state.courses = state.courses.filter(c => c.id !== action.payload);
        if (typeof window !== 'undefined') {
            localStorage.setItem('omz_courses', JSON.stringify(state.courses));
        }
    }
  },
});

export const { addCourse, updateCourse, publishCourse, deleteCourse } = coursesSlice.actions;
export default coursesSlice.reducer;
