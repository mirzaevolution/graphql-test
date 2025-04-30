import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const stepResolvers = {
  Query: {
    steps: async () => prisma.step.findMany({ include: { days: true } }),
  },
  Mutation: {
    createStep: async (_: any, { input, proposalId }: any) => {
      const count = await prisma.step.count({ where: { proposalId } });
      return prisma.step.create({
        data: {
          name: input.name,
          order: count + 1,
          proposalId,
        },
      });
    },
    updateStep: async (_: any, { input }: any) => {
      return prisma.step.update({ where: { id: input.id }, data: { name: input.name } });
    },
    deleteStep: async (_: any, { id }: any) => {
      const step = await prisma.step.findUnique({ where: { id } });
      await prisma.step.delete({ where: { id } });

      const steps = await prisma.step.findMany({ where: { proposalId: step?.proposalId }, orderBy: { order: 'asc' } });
      for (let i = 0; i < steps.length; i++) {
        await prisma.step.update({ where: { id: steps[i].id }, data: { order: i + 1 } });
      }
      return true;
    },
  },
};
