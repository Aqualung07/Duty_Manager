import { gql } from "@apollo/client";

const GET_DUTIES = gql`
  query Query {
    getDuties {
      id
      name
    }
  }
`;

const UPDATE_DUTY = gql`
  mutation UpdateDuty($duty: DutyInput!) {
    updateDuty(duty: $duty) {
      id
      name
    }
  }
`;

const REMOVE_DUTIES = gql`
  mutation RemoveDuties($duties: [DutyInput!]!) {
    removeDuties(duties: $duties) {
      id
      name
    }
  }
`;

const ADD_DUTY = gql`
  mutation AddDuty($duty: DutyInput!) {
    addDuty(duty: $duty) {
      id
      name
    }
  }
`;

export { GET_DUTIES, UPDATE_DUTY, REMOVE_DUTIES, ADD_DUTY };
