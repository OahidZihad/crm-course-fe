import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import coursesReducer from './features/courses/coursesSlice';
import blogReducer from './features/blog/blogSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    courses: coursesReducer,
    blog: blogReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
