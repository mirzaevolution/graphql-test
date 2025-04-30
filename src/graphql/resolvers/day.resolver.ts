import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const dayResolvers = {
  Query: {
    days: async () => prisma.day.findMany(),
  },
  Mutation: {
    createDay: async (_: any, { input, proposalId, stepId }: any) => {
      const count = await prisma.day.count({ where: { proposalId } });
      return prisma.day.create({
        data: {
          name: input.name,
          order: count + 1,
          proposalId,
          stepId,
        },
      });
    },
    updateDay: async (_: any, { input }: any) => {
      return prisma.day.update({ where: { id: input.id }, data: { name: input.name } });
    },
    deleteDay: async (_: any, { id }: any) => {
      const day = await prisma.day.findUnique({ where: { id } });
      await prisma.day.delete({ where: { id } });

      const days = await prisma.day.findMany({ where: { proposalId: day?.proposalId }, orderBy: { order: 'asc' } });
      for (let i = 0; i < days.length; i++) {
        await prisma.day.update({ where: { id: days[i].id }, data: { order: i + 1 } });
      }
      return true;
    },
  },
};
