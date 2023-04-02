export const spreadParamsToURL: (
  searchParams: globalThis.URLSearchParams
) => string = (searchParams) => {
  if (!searchParams) return "";

  let paramsString: string = "?";

  searchParams.forEach(
    (value, key) => (paramsString = paramsString + `${key}=${value}&`)
  );

  return paramsString.slice(0, -1);
};
