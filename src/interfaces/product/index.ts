import { BrandInterface } from 'interfaces/brand';

export interface ProductInterface {
  id?: string;
  name: string;
  brand_id: string;

  brand?: BrandInterface;
  _count?: {};
}
