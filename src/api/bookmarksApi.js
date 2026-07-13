import axiosInstance from './axiosInstance';

export const getBookmarks = () =>
  axiosInstance.get('/api/bookmarks');

export const createBookmark = (data) =>
  axiosInstance.post('/api/bookmarks', data);

export const updateBookmark = (bookmarkId, data) =>
  axiosInstance.put(`/api/bookmarks/${bookmarkId}`, data);

export const deleteBookmark = (bookmarkId) =>
  axiosInstance.delete(`/api/bookmarks/${bookmarkId}`);
