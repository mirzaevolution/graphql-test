import { gql } from 'apollo-server';

export const typeDefs = gql`
  type Proposal {
    id: Int!
    name: String!
    days: [Day!]!
    steps: [Step!]!
    createdAt: String!
    updatedAt: String!
  }

  type Day {
    id: Int!
    order: Int!
    name: String!
    proposalId: Int!
    stepId: Int
    createdAt: String!
    updatedAt: String!
  }

  type Step {
    id: Int!
    order: Int!
    name: String!
    proposalId: Int!
    days: [Day!]!
    createdAt: String!
    updatedAt: String!
  }

  input ProposalInput {
    name: String!
    days: [DayInput!]!
    steps: [StepInput!]!
  }

  input DayInput {
    name: String!
  }

  input StepInput {
    name: String!
  }

  input UpdateInput {
    id: Int!
    name: String!
  }

  type Query {
    proposals: [Proposal!]!
    days: [Day!]!
    steps: [Step!]!
  }

  type Mutation {
    createProposal(input: ProposalInput!): Proposal!
    updateProposal(input: UpdateInput!): Proposal!
    deleteProposal(id: Int!): Proposal!

    createDay(input: DayInput! proposalId: Int! stepId: Int): Day!
    updateDay(input: UpdateInput!): Day!
    deleteDay(id: Int!): Boolean!

    createStep(input: StepInput! proposalId: Int!): Step!
    updateStep(input: UpdateInput!): Step!
    deleteStep(id: Int!): Boolean!
  }
`;
