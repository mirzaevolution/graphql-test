import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const proposalResolvers = {
  Query: {
    proposals: async () => prisma.proposal.findMany({ include: { days: true, steps: true } }),
  },
  Mutation: {
    createProposal: async (_: any, { input }: any) => {
      const { name, days, steps } = input;
      return prisma.proposal.create({
        data: {
          name,
          days: {
            create: days.map((day: any, index: number) => ({
              name: day.name,
              order: index + 1,
            })),
          },
          steps: {
            create: steps.map((step: any, index: number) => ({
              name: step.name,
              order: index + 1,
            })),
          },
        },
        include: { days: true, steps: true },
      });
    },
    updateProposal: async (_: any, { input }: any) => {
      const { id, name } = input;
      return prisma.proposal.update({ where: { id }, data: { name } });
    },
    deleteProposal: async (_: any, { id }: any) => {
      await prisma.day.deleteMany({ where: { proposalId: id } });
      await prisma.step.deleteMany({ where: { proposalId: id } });
      return prisma.proposal.delete({ where: { id } });
    },
  },
};
