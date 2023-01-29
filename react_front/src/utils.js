export function trimGQLDutiesTypeName(graphqlDutyArray) {
  returnList = [...graphqlDutyArray].map((item) => {
    return { id: item.id, name: item.name };
  });
  return returnList;
}
