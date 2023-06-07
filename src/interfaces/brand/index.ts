import { CampaignInterface } from 'interfaces/campaign';
import { NewsletterInterface } from 'interfaces/newsletter';
import { ProductInterface } from 'interfaces/product';
import { TeamMemberInterface } from 'interfaces/team-member';
import { UserInterface } from 'interfaces/user';

export interface BrandInterface {
  id?: string;
  name: string;
  user_id: string;
  campaign?: CampaignInterface[];
  newsletter?: NewsletterInterface[];
  product?: ProductInterface[];
  team_member?: TeamMemberInterface[];
  user?: UserInterface;
  _count?: {
    campaign?: number;
    newsletter?: number;
    product?: number;
    team_member?: number;
  };
}
