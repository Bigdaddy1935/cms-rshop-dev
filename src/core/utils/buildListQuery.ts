type obj = Record<string, any>;

export const buildQueryString = (params: obj) => {
  const qs = new URLSearchParams();
  for (const k in params) {
    const v = params[k];
    if (v === undefined || v === null || v === "") continue;
    if (Array.isArray(v)) v.forEach((x) => qs.append(k, x));
    else qs.append(k, String(v));
  }
  return qs.toString();
};

export const buildListQuery = ({
  page,
  limit,
  sortBy,
  search,
  filter,
}: {
  page: number;
  limit: number;
  sortBy?: Array<string>;
  search?: string;
  filter?: Record<string, any[]>;
}) => {
  const params: obj = { page, limit };

  if (sortBy) params.sortBy = sortBy;
  if (search) params.search = search;

  if (filter) {
    for (const key in filter) {
      const values = filter[key];
      if (values?.length) {
        params[`filter.${key}`] = values;
      }
    }
  }

  return buildQueryString(params);
};
