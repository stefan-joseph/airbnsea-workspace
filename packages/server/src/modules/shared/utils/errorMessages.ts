export const formatNoListingErrorMessage = (id: string) =>
  `No listing with ID: ${id}`;

export const formatBadUuidErrorMessage = (idName: string) =>
  `No such ${idName.split("Id")[0]} exists`;
