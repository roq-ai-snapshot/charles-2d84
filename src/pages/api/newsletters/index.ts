import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { newsletterValidationSchema } from 'validationSchema/newsletters';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getNewsletters();
    case 'POST':
      return createNewsletter();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getNewsletters() {
    const data = await prisma.newsletter
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'newsletter'));
    return res.status(200).json(data);
  }

  async function createNewsletter() {
    await newsletterValidationSchema.validate(req.body);
    const body = { ...req.body };

    const data = await prisma.newsletter.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
