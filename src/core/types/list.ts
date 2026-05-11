// types/list.ts
export type ListQueryParams = {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: Array<string>;
  filter?: Record<string, string[]>;
};
