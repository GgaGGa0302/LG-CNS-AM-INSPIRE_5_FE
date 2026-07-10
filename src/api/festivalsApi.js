import axiosInstance from './axiosInstance';

export const searchFestivals = (params) =>
  axiosInstance.get('/api/festivals', {
    params: { region: params.keyword }, 
  });

export const getFestivalDetail = (festivalId) =>
  axiosInstance.get('/api/festivals/detail', {
    params: { contentId: festivalId },
  });
