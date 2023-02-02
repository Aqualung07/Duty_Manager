import { gql } from "graphql-tag";

const typeDefs = gql`
  type Query {
    getDuties: [Duty]!
  }
  type Mutation {
    addDuty(duty: DutyInput!): [Duty]
    updateDuty(duty: DutyInput!): [Duty]
    removeDuties(duties: [DutyInput!]!): [Duty!]!
  }
  type Duty {
    id: String!
    name: String!
  }
  input DutyInput {
    id: String!
    name: String!
  }
`;

export { typeDefs };
