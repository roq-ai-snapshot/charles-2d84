import axios from 'axios';
import queryString from 'query-string';
import { NewsletterInterface } from 'interfaces/newsletter';
import { GetQueryInterface } from '../../interfaces';

export const getNewsletters = async (query?: GetQueryInterface) => {
  const response = await axios.get(`/api/newsletters${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createNewsletter = async (newsletter: NewsletterInterface) => {
  const response = await axios.post('/api/newsletters', newsletter);
  return response.data;
};

export const updateNewsletterById = async (id: string, newsletter: NewsletterInterface) => {
  const response = await axios.put(`/api/newsletters/${id}`, newsletter);
  return response.data;
};

export const getNewsletterById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/newsletters/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteNewsletterById = async (id: string) => {
  const response = await axios.delete(`/api/newsletters/${id}`);
  return response.data;
};
