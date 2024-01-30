// ?search=Diego&Page=2

export function extractQueryParams(query) {
  return query
    .substr(1)
    .split('&')
    .reduce((queryParams, params) => {
      const [key, value] = params.split('=');

      queryParams[key] = value;
      return queryParams;
    }, {});
}
