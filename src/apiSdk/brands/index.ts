import axios from 'axios';
import queryString from 'query-string';
import { BrandInterface } from 'interfaces/brand';
import { GetQueryInterface } from '../../interfaces';

export const getBrands = async (query?: GetQueryInterface) => {
  const response = await axios.get(`/api/brands${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createBrand = async (brand: BrandInterface) => {
  const response = await axios.post('/api/brands', brand);
  return response.data;
};

export const updateBrandById = async (id: string, brand: BrandInterface) => {
  const response = await axios.put(`/api/brands/${id}`, brand);
  return response.data;
};

export const getBrandById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/brands/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteBrandById = async (id: string) => {
  const response = await axios.delete(`/api/brands/${id}`);
  return response.data;
};
