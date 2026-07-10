import axiosInstance from './axiosInstance';

export const getBookmarks = () =>
  axiosInstance.get('/api/bookmarks');

export const createBookmark = (data) =>
  axiosInstance.post('/api/bookmarks', data);

export const updateBookmark = (bookmarkId, data) =>
  axiosInstance.put(`/api/bookmarks/${bookmarkId}`, { userMemo: data.memo });

export const deleteBookmark = (bookmarkId) =>
  axiosInstance.delete(`/api/bookmarks/${bookmarkId}`);


export const getBookmarkDetail = (bookmarkId) =>
  axiosInstance.get(`/api/bookmarks/${bookmarkId}`);
