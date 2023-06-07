import { UserInterface } from 'interfaces/user';
import { BrandInterface } from 'interfaces/brand';

export interface TeamMemberInterface {
  id?: string;
  user_id: string;
  brand_id: string;

  user?: UserInterface;
  brand?: BrandInterface;
  _count?: {};
}
