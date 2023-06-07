import * as yup from 'yup';
import { campaignValidationSchema } from 'validationSchema/campaigns';
import { newsletterValidationSchema } from 'validationSchema/newsletters';
import { productValidationSchema } from 'validationSchema/products';
import { teamMemberValidationSchema } from 'validationSchema/team-members';

export const brandValidationSchema = yup.object().shape({
  name: yup.string().required(),
  user_id: yup.string().nullable().required(),
  campaign: yup.array().of(campaignValidationSchema),
  newsletter: yup.array().of(newsletterValidationSchema),
  product: yup.array().of(productValidationSchema),
  team_member: yup.array().of(teamMemberValidationSchema),
});
