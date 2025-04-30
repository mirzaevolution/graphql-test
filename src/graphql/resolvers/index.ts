import { dayResolvers } from "./day.resolver";
import { proposalResolvers } from "./proposal.resolver";
import { stepResolvers } from "./step.resolver";

export const resolvers = {
  Query: {
    ...proposalResolvers.Query,
    ...dayResolvers.Query,
    ...stepResolvers.Query,
  },
  Mutation: {
    ...proposalResolvers.Mutation,
    ...dayResolvers.Mutation,
    ...stepResolvers.Mutation,
  },
};
