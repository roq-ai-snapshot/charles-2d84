import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { newsletterValidationSchema } from 'validationSchema/newsletters';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.newsletter
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getNewsletterById();
    case 'PUT':
      return updateNewsletterById();
    case 'DELETE':
      return deleteNewsletterById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getNewsletterById() {
    const data = await prisma.newsletter.findFirst(convertQueryToPrismaUtil(req.query, 'newsletter'));
    return res.status(200).json(data);
  }

  async function updateNewsletterById() {
    await newsletterValidationSchema.validate(req.body);
    const data = await prisma.newsletter.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });
    return res.status(200).json(data);
  }
  async function deleteNewsletterById() {
    const data = await prisma.newsletter.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
