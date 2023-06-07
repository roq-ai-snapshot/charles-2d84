import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { brandValidationSchema } from 'validationSchema/brands';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getBrands();
    case 'POST':
      return createBrand();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getBrands() {
    const data = await prisma.brand
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'brand'));
    return res.status(200).json(data);
  }

  async function createBrand() {
    await brandValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.campaign?.length > 0) {
      const create_campaign = body.campaign;
      body.campaign = {
        create: create_campaign,
      };
    } else {
      delete body.campaign;
    }
    if (body?.newsletter?.length > 0) {
      const create_newsletter = body.newsletter;
      body.newsletter = {
        create: create_newsletter,
      };
    } else {
      delete body.newsletter;
    }
    if (body?.product?.length > 0) {
      const create_product = body.product;
      body.product = {
        create: create_product,
      };
    } else {
      delete body.product;
    }
    if (body?.team_member?.length > 0) {
      const create_team_member = body.team_member;
      body.team_member = {
        create: create_team_member,
      };
    } else {
      delete body.team_member;
    }
    const data = await prisma.brand.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
