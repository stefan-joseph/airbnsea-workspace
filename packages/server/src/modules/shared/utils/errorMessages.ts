export const formatNotFoundWithGivenIdErrorMessage = (
  type: string,
  id: string
) => `No ${type} with ID: ${id}`;

export const formatBadUuidErrorMessage = (idName: string) =>
  `No such ${idName.split("Id")[0]} exists`;

export const unauthenticatedErrorMessage = "Please log in to use this service";
